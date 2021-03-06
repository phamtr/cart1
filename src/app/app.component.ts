import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';

import { Product, CartItem } from './models';
import { CatalogState, LoadCatalog } from './state/catalog';
import { CartState, AddToCart, RemoveFromCart, EmptyCart } from './state/cart';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Select(CatalogState.catalog) products: Observable<Product[]>;
  @Select(CartState.cartItems) cartItems: Observable<CartItem[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(
      new LoadCatalog({
        products: [
          {
            name: 'pineapple',
            price: 3,
            sku: 'FRT-001',
            image:
              'https://images.unsplash.com/photo-1490885578174-acda8905c2c6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4e3643d1891d919b27498b2d6f55f787&dpr=1&auto=format&fit=crop&w=400&h=250&q=80&cs=tinysrgb',
          },
          {
            name: 'peach',
            price: 1,
            sku: 'FRT-002',
            image:
              'https://images.unsplash.com/photo-1517355352485-3c18847c2f7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b9bc38869e5e02c78a5caf380366ddb1&dpr=1&auto=format&fit=crop&w=400&h=250&q=80&cs=tinysrgb',
          },
          {
            name: 'cherry',
            price: 0.2,
            sku: 'FRT-003',
            image:
              'https://images.unsplash.com/photo-1515069841361-fbfbf773f547?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5c58bbb7a842d53fbdb9bdb51da7d225&dpr=1&auto=format&fit=crop&w=400&h=250&q=80&cs=tinysrgb',
          },
        ],
      }),
    );
  }

  addProduct(sku: string) {
    this.store.dispatch(new AddToCart({ sku }));
  }

  removeProduct(sku: string) {
    this.store.dispatch(new RemoveFromCart({ sku }));
  }

  emptyCart() {
    this.store.dispatch(new EmptyCart());
  }
}

