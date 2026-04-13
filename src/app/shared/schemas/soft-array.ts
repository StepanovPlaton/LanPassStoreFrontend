import * as v from 'valibot';

export function softArrayOf<T>(
  schema: v.BaseSchema<unknown, T, v.BaseIssue<unknown>>,
): v.BaseSchema<unknown, T[], v.BaseIssue<unknown>> {
  return v.pipe(
    v.array(v.unknown()),
    v.transform((input) => {
      const array: T[] = [];
      input.forEach((element) => {
        const result = v.safeParse(schema, element);
        if (result.success) {
          array.push(result.output);
        } else {
          console.warn(
            'Invalid array element:',
            element,
            'Error:',
            result.issues?.map((issue) => issue.message).join(', ') ||
              'Unknown error',
          );
        }
      });
      return array;
    }),
  );
}
