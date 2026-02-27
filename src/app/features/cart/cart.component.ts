import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { provideIcons } from '@ng-icons/core';
import { lucideShoppingCart, lucideTrash2 } from '@ng-icons/lucide';
import { HlmButton } from '@ui/button';
import { HlmIconImports } from '@ui/icon';
import { HlmDialogImports } from '@ui/dialog';
import { HlmInputImports } from '@ui/input';
import { CartStore, type CartItem } from '@/entities/cart';
import { NumberApostrophePipe } from '@/shared/pipes/number-apostrophe.pipe';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [HlmButton, HlmIconImports, HlmDialogImports, HlmInputImports, DecimalPipe, NumberApostrophePipe],
    providers: [provideIcons({ lucideShoppingCart, lucideTrash2 })],
    templateUrl: './cart.component.html',
})
export class CartComponent {
    constructor(private readonly _cart: CartStore) { }

    protected readonly items = this._cart.items;
    protected readonly count = this._cart.totalItemsCount;
    protected readonly total = this._cart.totalPrice;

    protected increment(item: CartItem) {
        this._cart.addProduct(item.product);
    }

    protected decrement(item: CartItem) {
        this._cart.decrementProduct(item.product.id);
    }

    protected remove(item: CartItem) {
        this._cart.removeProduct(item.product.id);
    }
}

