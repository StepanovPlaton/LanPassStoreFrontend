import { Component, computed, inject, input, output, signal } from '@angular/core';
import { BrnPopoverImports } from '@spartan-ng/brain/popover';
import { ProductCardComponent } from '@/features/product-card/product-card.component';
import type { Product } from '@/entities/product';
import { CatalogSearchService } from '@/shared/catalog-search/catalog-search.service';
import {
  normalizeSearchQuery,
  productMatchesSearch,
} from '@/shared/utils/product-search';
import { HlmButtonImports } from '@ui/button';
import { HlmInputImports } from '@ui/input';
import { HlmEmptyImports } from '@ui/empty';
import { HlmInputGroupImports } from '@ui/input-group';
import { HlmPopoverImports } from '@ui/popover';
import { HlmSelectImports } from '@ui/select';
import { HlmSliderImports } from '@ui/slider';
import { HlmTypographyImports } from '@ui/typography';

type SortOption =
  | 'default'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'
  | 'newest'
  | 'oldest';

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [
    ProductCardComponent,
    HlmSelectImports,
    BrnPopoverImports,
    HlmPopoverImports,
    HlmButtonImports,
    HlmInputImports,
    HlmEmptyImports,
    HlmInputGroupImports,
    HlmSliderImports,
    HlmTypographyImports,
  ],
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss'],
})
export class ProductsGridComponent {
  protected readonly catalogSearch = inject(CatalogSearchService);

  public readonly products = input<Product[]>([]);
  /** Компактный режим: без фильтров/сортировки, сетка по ширине контейнера (для модалки). */
  public readonly compact = input<boolean>(false);
  /** Эмитится при клике по карточке товара (id товара). */
  public readonly productClick = output<number>();
  public readonly sortOption = signal<SortOption>('newest');
  public readonly minPrice = signal<number | null>(null);
  public readonly maxPrice = signal<number | null>(null);

  public readonly priceBounds = computed(() => {
    const products = this.products();
    if (!products || products.length === 0) {
      return { min: 0, max: 1000 };
    }
    const prices = products.map((p) => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  });

  public readonly priceRange = computed(() => {
    const min = this.minPrice();
    const max = this.maxPrice();
    const bounds = this.priceBounds();
    return [
      min !== null ? min : bounds.min,
      max !== null ? max : bounds.max,
    ] as [number, number];
  });

  public readonly sortOptionLabels: Record<SortOption, string> = {
    default: 'Порядок: по умолчанию',
    'price-asc': 'Цена: по возрастанию',
    'price-desc': 'Цена: по убыванию',
    'name-asc': 'Название: А-Я',
    'name-desc': 'Название: Я-А',
    newest: 'Порядок: сперва новые',
    oldest: 'Порядок: сперва старые',
  };

  /** Подпись в триггере селекта (hlm-select / BrnSelectValue). */
  public readonly sortOptionItemToString = (item: unknown) => {
    if (item == null) return '';
    const key = item as SortOption;
    return this.sortOptionLabels[key] ?? String(item);
  };

  public readonly filteredAndSortedProducts = computed(() => {
    const products = this.products();
    if (this.compact() || !products.length) {
      return products ?? [];
    }
    const sort = this.sortOption();
    const minPrice = this.minPrice();
    const maxPrice = this.maxPrice();

    // Фильтрация по цене
    let filtered = products.filter((product) => {
      if (minPrice !== null && product.price < minPrice) {
        return false;
      }
      if (maxPrice !== null && product.price > maxPrice) {
        return false;
      }
      return true;
    });

    const q = normalizeSearchQuery(this.catalogSearch.searchQuery());
    if (q) {
      filtered = filtered.filter((product) => productMatchesSearch(product, q));
    }

    // Сортировка
    const sorted = [...filtered];

    switch (sort) {
      case 'default':
        return sorted;
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
      case 'name-desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title, 'ru'));
      case 'newest':
        return sorted.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });
      case 'oldest':
        return sorted.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateA - dateB;
        });
      default:
        return sorted;
    }
  });

  public hasActivePriceFilter(): boolean {
    return this.minPrice() !== null || this.maxPrice() !== null;
  }

  public clearPriceFilter(): void {
    this.minPrice.set(null);
    this.maxPrice.set(null);
  }

  public clearCatalogSearch(): void {
    this.catalogSearch.clearSearch();
  }

  protected hasFilterEmptyResults(): boolean {
    if (this.compact()) return false;
    const list = this.products() ?? [];
    return list.length > 0 && this.filteredAndSortedProducts().length === 0;
  }

  public onMinPriceChange(value: string): void {
    const numValue = value === '' ? null : Number(value);
    const bounds = this.priceBounds();
    if (numValue !== null && !isNaN(numValue)) {
      const clampedValue = Math.max(bounds.min, Math.min(bounds.max, numValue));
      this.minPrice.set(clampedValue);
    } else {
      this.minPrice.set(null);
    }
  }

  public onMaxPriceChange(value: string): void {
    const numValue = value === '' ? null : Number(value);
    const bounds = this.priceBounds();
    if (numValue !== null && !isNaN(numValue)) {
      const clampedValue = Math.max(bounds.min, Math.min(bounds.max, numValue));
      this.maxPrice.set(clampedValue);
    } else {
      this.maxPrice.set(null);
    }
  }

  public onPriceRangeChange(value: number[]): void {
    const bounds = this.priceBounds();
    const [min, max] = value;

    if (min === bounds.min) {
      this.minPrice.set(null);
    } else {
      this.minPrice.set(min);
    }

    if (max === bounds.max) {
      this.maxPrice.set(null);
    } else {
      this.maxPrice.set(max);
    }
  }

  public onSortOptionChange(value: unknown): void {
    if (value === null || value === undefined) return;
    this.sortOption.set(value as SortOption);
  }

  public onSearchInput(event: Event): void {
    this.catalogSearch.setQuery((event.target as HTMLInputElement).value);
  }
}
