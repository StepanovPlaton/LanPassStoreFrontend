import { DecimalPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { HlmButton } from '@ui/button';
import { HlmCarousel, HlmCarouselImports } from '@ui/carousel';
import type { Product } from '@/entities/product';
import { CartStore } from '@/entities/cart';
import { NumberApostrophePipe } from '@/shared/pipes/number-apostrophe.pipe';
import { ProductsGridComponent } from '@/widgets/products-grid/products-grid.component';

export interface ProductModalContext {
  product: Product;
  relatedProducts: Product[];
  /** Вызывается при клике по товару в «Смотрите также» — закрыть модалку и открыть выбранный товар. */
  onProductClick?: (productId: number) => void;
}

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [
    HlmButton,
    HlmCarousel,
    ...HlmCarouselImports,
    DecimalPipe,
    NumberApostrophePipe,
    ProductsGridComponent,
  ],
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent {
  private readonly dialogContext = injectBrnDialogContext({ optional: true }) as ProductModalContext | undefined;
  private readonly dialogRef = inject(BrnDialogRef);
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly cart = inject(CartStore);

  protected readonly product = this.dialogContext?.product ?? null;
  protected readonly relatedProducts = this.dialogContext?.relatedProducts ?? [];

  protected readonly countInCart = computed(() => {
    const p = this.product;
    if (!p) return 0;
    const items = this.cart.items();
    const found = items.find((i) => i.product.id === p.id);
    return found?.count ?? 0;
  });

  protected safeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html ?? '');
  }

  protected addToCart(): void {
    const p = this.product;
    if (p) this.cart.addProduct(p);
  }

  protected decrementCount(): void {
    const p = this.product;
    if (p && this.countInCart() > 0) this.cart.decrementProduct(p.id);
  }

  protected onRelatedProductClick(productId: number): void {
    this.dialogRef.close();
    this.dialogContext?.onProductClick?.(productId);
  }
}
