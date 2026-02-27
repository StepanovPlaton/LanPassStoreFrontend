import { Component, input } from '@angular/core';
import { ProductCardComponent } from '@/features/product-card/product-card.component';
import type { Product } from '@/entities/product';

@Component({
    selector: 'app-products-grid',
    standalone: true,
    imports: [ProductCardComponent],
    templateUrl: './products-grid.component.html',
    styleUrls: ['./products-grid.component.scss'],
})
export class ProductsGridComponent {
    public readonly products = input<Product[]>([]);
}

