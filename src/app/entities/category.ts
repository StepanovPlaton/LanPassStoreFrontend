import { Injectable } from '@angular/core';
import * as v from 'valibot';
import { ApiService } from '@/shared/services/api.service';
import { softArrayOf } from '@/shared/schemas/soft-array';

export const categorySchema = v.object({
    id: v.number(),
    name: v.string(),
    createdAt: v.pipe(v.string(), v.isoDateTime()),
    updatedAt: v.pipe(v.string(), v.isoDateTime()),
    deletedAt: v.object({
        time: v.pipe(v.string(), v.isoDateTime()),
        valid: v.boolean(),
    }),
});

export type Category = v.InferInput<typeof categorySchema>;

@Injectable({
    providedIn: 'root',
})
export class CategoryService extends ApiService<Category[], Category> {
    constructor() {
        super('categories', softArrayOf(categorySchema), categorySchema);
    }
}
