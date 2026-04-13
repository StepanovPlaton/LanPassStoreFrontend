import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as v from 'valibot';
import { ApiService } from '@/shared/services/api.service';
import { softArrayOf } from '@/shared/schemas/soft-array';

/** Формат ответа API (PascalCase: ID, CreatedAt, UpdatedAt, DeletedAt) */
const apiProductSchema = v.object({
  ID: v.number(),
  CreatedAt: v.string(),
  UpdatedAt: v.string(),
  DeletedAt: v.nullable(v.unknown()),
  sku: v.string(),
  title: v.string(),
  description: v.string(),
  text: v.string(),
  brand: v.string(),
  photo_url: v.string(),
  price: v.number(),
  quantity: v.number(),
  weight: v.number(),
  is_active: v.boolean(),
  is_manual: v.boolean(),
  category_id: v.number(),
});

/** Схема с преобразованием в camelCase для приложения */
export const productSchema = v.pipe(
  apiProductSchema,
  v.transform((raw) => ({
    id: raw.ID,
    createdAt: raw.CreatedAt,
    updatedAt: raw.UpdatedAt,
    deletedAt: raw.DeletedAt,
    sku: raw.sku,
    title: raw.title,
    description: raw.description,
    text: raw.text,
    brand: raw.brand,
    photo_url: raw.photo_url,
    price: raw.price,
    quantity: raw.quantity,
    weight: raw.weight,
    is_active: raw.is_active,
    is_manual: raw.is_manual,
    category_id: raw.category_id,
  })),
);

export type Product = v.InferOutput<typeof productSchema>;

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ApiService<Product[], Product> {
  constructor() {
    super('products', softArrayOf(productSchema), productSchema);
  }

  /** GET /api/products?category_id={id} */
  getByCategoryId(categoryId: number | string): Observable<Product[]> {
    return this.httpService.get<Product[]>(
      `products?category_id=${categoryId}`,
      softArrayOf(productSchema),
    );
  }
}
