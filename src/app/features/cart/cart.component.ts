import { Component, signal, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucideShoppingCart, lucideTrash2, lucideCheckCircle } from '@ng-icons/lucide';
import { HlmButton } from '@ui/button';
import { HlmIconImports } from '@ui/icon';
import { HlmDialogImports } from '@ui/dialog';
import { HlmInputImports } from '@ui/input';
import { CartStore, type CartItem } from '@/entities/cart';
import { NumberApostrophePipe } from '@/shared/pipes/number-apostrophe.pipe';
import { HttpService } from '@/shared/services/http.service';
import * as v from 'valibot';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [
        HlmButton,
        HlmIconImports,
        HlmDialogImports,
        HlmInputImports,
        DecimalPipe,
        NumberApostrophePipe,
        FormsModule,
    ],
    providers: [provideIcons({ lucideShoppingCart, lucideTrash2, lucideCheckCircle })],
    templateUrl: './cart.component.html',
})
export class CartComponent {
    private readonly _cart = inject(CartStore);
    private readonly _http = inject(HttpService);

    protected readonly orderSuccess = signal(false);
    protected readonly orderError = signal<string | null>(null);
    protected readonly submitting = signal(false);

    protected customerName = '';
    protected customerEmail = '';
    protected customerPhone = '';
    protected comment = '';

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

    protected submitOrder(): void {
        this.orderError.set(null);
        const name = this.customerName.trim();
        const email = this.customerEmail.trim();
        const phone = this.customerPhone.trim();
        if (!name || !email || !phone) {
            this.orderError.set('Заполните имя, email и телефон.');
            return;
        }
        const itemList = this._cart.items().map((item) => ({
            product_id: item.product.id,
            quantity: item.count,
        }));
        if (itemList.length === 0) {
            this.orderError.set('Корзина пуста.');
            return;
        }
        const body = {
            comment: this.comment.trim() || undefined,
            customer_email: email,
            customer_name: name,
            customer_phone: phone,
            items: itemList,
        };
        this.submitting.set(true);
        this._http
            .post('orders', body, v.unknown())
            .subscribe({
                next: () => {
                    this.submitting.set(false);
                    this._cart.clear();
                    this.orderSuccess.set(true);
                },
                error: (err) => {
                    this.submitting.set(false);
                    this.orderError.set(err?.message ?? 'Не удалось оформить заказ. Попробуйте позже.');
                },
            });
    }
}

