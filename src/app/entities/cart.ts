import { Injectable, computed, signal } from '@angular/core';
import type { Product } from '@/entities/product';

export type CartItem = {
  product: Product;
  count: number;
};

@Injectable({
  providedIn: 'root',
})
export class CartStore {
  private readonly _items = signal<CartItem[]>([]);

  public readonly items = this._items.asReadonly();

  public readonly distinctCount = computed(() => this._items().length);

  public readonly totalItemsCount = computed(() =>
    this._items().reduce((sum, item) => sum + item.count, 0),
  );

  public readonly totalPrice = computed(() =>
    this._items().reduce(
      (sum, item) => sum + item.product.price * item.count,
      0,
    ),
  );

  public addProduct(product: Product) {
    this._items.update((items) => {
      const index = items.findIndex((i) => i.product.id === product.id);
      if (index === -1) {
        return [...items, { product, count: 1 }];
      }

      const next = [...items];
      const current = next[index];
      next[index] = { ...current, count: current.count + 1 };
      return next;
    });
  }

  public decrementProduct(productId: number) {
    this._items.update((items) => {
      const index = items.findIndex((i) => i.product.id === productId);
      if (index === -1) {
        return items;
      }

      const next = [...items];
      const current = next[index];

      if (current.count <= 1) {
        next.splice(index, 1);
        return next;
      }

      next[index] = { ...current, count: current.count - 1 };
      return next;
    });
  }

  public removeProduct(productId: number) {
    this._items.update((items) =>
      items.filter((i) => i.product.id !== productId),
    );
  }

  public clear(): void {
    this._items.set([]);
  }
}
