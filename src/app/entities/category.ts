import { Injectable } from '@angular/core';
import * as v from 'valibot';
import { ApiService } from '@/shared/services/api.service';
import { softArrayOf } from '@/shared/schemas/soft-array';

/** Schema for API response: { ID, CreatedAt, UpdatedAt, DeletedAt, name } */
export const categorySchema = v.object({
    ID: v.number(),
    CreatedAt: v.string(), // RFC3339 от бэкенда (микросекунды, +04:00) — без строгой ISO-валидации
    UpdatedAt: v.string(),
    DeletedAt: v.nullable(v.unknown()),
    name: v.string(),
});

export type Category = v.InferOutput<typeof categorySchema>;

@Injectable({
    providedIn: 'root',
})
export class CategoryService extends ApiService<Category[], Category> {
    constructor() {
        super('categories', softArrayOf(categorySchema), categorySchema);
    }
}
