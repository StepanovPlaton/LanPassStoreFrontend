import { Injectable } from '@angular/core';
import * as v from 'valibot';
import { ApiService } from '@/shared/services/api.service';
import { softArrayOf } from '@/shared/schemas/soft-array';

export const productSchema = v.object({
  brand: v.string(),
  category_id: v.number(),
  createdAt: v.pipe(v.string(), v.isoDateTime()),
  deletedAt: v.object({
    time: v.pipe(v.string(), v.isoDateTime()),
    valid: v.boolean(),
  }),
  description: v.string(),
  id: v.number(),
  is_active: v.boolean(),
  is_manual: v.boolean(),
  photo_url: v.string(),
  price: v.number(),
  quantity: v.number(),
  sku: v.string(),
  text: v.string(),
  title: v.string(),
  updatedAt: v.pipe(v.string(), v.isoDateTime()),
  weight: v.number(),
});

export type Product = v.InferInput<typeof productSchema>;

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ApiService<Product[], Product> {
  constructor() {
    super('products', softArrayOf(productSchema), productSchema);
  }
}