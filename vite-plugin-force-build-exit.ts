import { existsSync } from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

const POLL_MS = 100;
const MAX_WAIT_MS = 180_000;

/**
 * Analog/Nitro may leave async handles open, so Node never exits after a successful `vite build`.
 * After Vite finishes all environments, wait until the Nitro server entry exists (same path as `npm start`), then exit.
 */
export function forceBuildExitPlugin(): Plugin {
  let root = process.cwd();
  let expectedBundles = 0;
  let closedBundles = 0;
  let exitScheduled = false;

  return {
    name: 'force-build-exit',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      root = config.root;
      exitScheduled = false;
      closedBundles = 0;
      if (config.command !== 'build' || config.build.watch) {
        expectedBundles = 0;
        return;
      }
      const n = Object.keys(config.environments ?? {}).length;
      expectedBundles = n > 0 ? n : 2;
    },
    buildEnd(error) {
      if (error) {
        process.exitCode = 1;
        exitScheduled = true;
        setTimeout(() => process.exit(1), 0);
      }
    },
    closeBundle() {
      if (!expectedBundles || exitScheduled) return;
      closedBundles += 1;
      if (closedBundles < expectedBundles) return;
      exitScheduled = true;

      const serverEntry = path.resolve(root, 'dist/analog/server/index.mjs');
      const maxWaitRaw = process.env['VITE_BUILD_EXIT_MAX_WAIT_MS'];
      const maxWait =
        maxWaitRaw !== undefined && Number.isFinite(Number(maxWaitRaw)) && Number(maxWaitRaw) > 0
          ? Number(maxWaitRaw)
          : MAX_WAIT_MS;
      const start = Date.now();

      const finish = (code: number) => {
        process.exit(code);
      };

      const interval = setInterval(() => {
        if (existsSync(serverEntry)) {
          clearInterval(interval);
          const code = process.exitCode && process.exitCode !== 0 ? process.exitCode : 0;
          finish(code);
          return;
        }
        if (Date.now() - start > maxWait) {
          clearInterval(interval);
          process.exitCode = 1;
          finish(1);
        }
      }, POLL_MS);
    },
  };
}
