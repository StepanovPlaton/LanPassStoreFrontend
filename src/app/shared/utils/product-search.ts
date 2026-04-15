import type { Product } from '@/entities/product';

const LOCALE = 'ru';

export function normalizeSearchQuery(raw: string): string {
  return raw.trim().toLocaleLowerCase(LOCALE);
}

/** Все поля товара, по которым ищем подстроку (нормализовано в lower case). */
export function productSearchHaystack(p: Product): string {
  const parts: string[] = [
    p.title,
    p.description,
    p.text,
    p.brand,
    p.sku,
    p.photo_url,
    String(p.id),
    String(p.price),
    String(p.quantity),
    String(p.weight),
    String(p.category_id),
    p.is_active ? 'true' : 'false',
    p.is_manual ? 'true' : 'false',
    String(p.createdAt),
    String(p.updatedAt),
    p.deletedAt == null ? '' : String(p.deletedAt),
  ];
  return parts.join(' ').toLocaleLowerCase(LOCALE);
}

export function productMatchesSearch(p: Product, normalizedQuery: string): boolean {
  if (!normalizedQuery) return true;
  return productSearchHaystack(p).includes(normalizedQuery);
}
