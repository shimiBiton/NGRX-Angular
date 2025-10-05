import { Injectable } from '@angular/core';
import { Order } from '../orders/order.model';
import {delay, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private mockOrders: Order[] = [
    { id: 1, userId: 1, total: 200 },
    { id: 2, userId: 1, total: 150 },
    { id: 3, userId: 2, total: 500 },
  ];

  constructor() { }

  getOrdersByUser(userId: number): Observable<Order[]> {
    return of(this.mockOrders.filter((o) => o.userId === userId)).pipe(delay(500));
  }
}
