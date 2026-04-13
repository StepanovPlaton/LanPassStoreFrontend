import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { HeaderComponent } from '@/widgets/header/header.component';
import { ProductsGridComponent } from '@/widgets/products-grid/products-grid.component';
import { FooterComponent } from '@/widgets/footer/footer.component';
import { CategoryService, type Category } from '@/entities/category';
import { ProductService, type Product } from '@/entities/product';
import { HlmDialogService } from '@ui/dialog';
import { ProductModalComponent } from '@/features/product-modal/product-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ProductsGridComponent, FooterComponent],
  templateUrl: './index.page.html',
})
export default class Home {
  private readonly categoryService = inject(CategoryService);
  private readonly productService = inject(ProductService);
  private readonly dialogService = inject(HlmDialogService);

  protected readonly categories = toSignal(
    this.categoryService.getAll().pipe(catchError(() => of([]))),
    { initialValue: [] as Category[] },
  );

  protected readonly products = toSignal(
    this.productService.getAll().pipe(catchError(() => of([]))),
    { initialValue: [] as Product[] },
  );

  protected onProductClick(productId: number): void {
    const list = this.products() ?? [];
    const product = list.find((p) => p.id === productId);
    if (!product) return;
    const relatedProducts = list.filter(
      (p) => p.category_id === product.category_id && p.id !== product.id,
    );
    this.dialogService.open(ProductModalComponent, {
      context: {
        product,
        relatedProducts,
        onProductClick: (id: number) => this.onProductClick(id),
      },
      contentClass:
        'sm:max-w-6xl w-full max-w-[95vw] max-h-[90vh] overflow-hidden',
    });
  }
}
