import { DecimalPipe } from '@angular/common';
import { Component, OnDestroy, computed, input, viewChild } from '@angular/core';
import { HlmButton } from '@ui/button';
import { HlmCardImports } from '@ui/card';
import { HlmCarousel, HlmCarouselImports } from '@ui/carousel';
import type { Product } from '@/entities/product';
import { CartStore } from '@/entities/cart';
import { NumberApostrophePipe } from '@/shared/pipes/number-apostrophe.pipe';

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [...HlmCardImports, ...HlmCarouselImports, HlmButton, DecimalPipe, NumberApostrophePipe],
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnDestroy {
    public readonly product = input<Product | null>(null);

    constructor(private readonly _cart: CartStore) { }

    public readonly title = computed(() => this.product()?.title ?? 'Название товара');
    public readonly description = computed(() => this.product()?.description ?? '');
    public readonly price = computed(() => this.product()?.price ?? 0);
    public readonly images = computed<string[]>(() => {
        const p = this.product();
        if (!p?.photo_url) {
            return [];
        }
        return [p.photo_url, p.photo_url, p.photo_url];
    });

    private readonly _carouselRef = viewChild(HlmCarousel);
    private autoplayTimer: number | null = null;

    public startAutoplay() {
        if (this.autoplayTimer !== null) {
            return;
        }

        if (!this.images().length) {
            return;
        }

        const carouselInstance = this._carouselRef();
        if (!carouselInstance) {
            return;
        }

        this.autoplayTimer = window.setInterval(() => {
            const inst = this._carouselRef();
            if (!inst) {
                return;
            }
            inst.scrollNext();
        }, 3000);
    }

    public stopAutoplay() {
        if (this.autoplayTimer !== null) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    }

    public ngOnDestroy() {
        this.stopAutoplay();
    }

    public addToCart() {
        const current = this.product();
        if (!current) {
            return;
        }
        this._cart.addProduct(current);
    }

    public get countInCart(): number {
        const current = this.product();
        if (!current) {
            return 0;
        }
        const items = this._cart.items();
        const found = items.find((i) => i.product.id === current.id);
        return found?.count ?? 0;
    }

    public incrementCount() {
        this.addToCart();
    }

    public decrementCount() {
        const current = this.product();
        if (!current || this.countInCart <= 0) {
            return;
        }
        this._cart.decrementProduct(current.id);
    }
}

