import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private URL = environment.url;
  constructor(private http: HttpClient) { }

  public getAllOrders() : Observable<any> {
    return this.http.get(`${this.URL}/orders/view`)
  }

  public deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.URL}/orders/delete/${orderId}`, {responseType: 'text'});
  }

 public addOrder(order) : Observable<Order>{
    console.log(order);
    return this.http.post<Order>(`${this.URL}/orders/add`, order);
  }

  public updateOrder(editOrder:Order, id:number): Observable<Order> {
    editOrder.id = id;
    console.log(editOrder);
    return this.http.put<Order>(`${this.URL}/orders/update`, editOrder)
  }













  // orderAdded = new Subject();
  // ordersChanged = new Subject<Order[]>();
  // order: Order[];

  // private URL = environment.url;

  // constructor(private http: HttpClient) { }

  // getAllOrders(): Observable<Order[]>{
  //   return this.http.get<Order[]>(`${this.URL}/view`);
  // }

  // public addOrder(order) : Observable<Order>{
  //   console.log(order);
  //   return this.http.post<Order>(`${this.URL}/add`, order);
  // }

  // public updateOrder(order): Observable<Order> {
  //   console.log(order);
  //   return this.http.put<Order>(`${this.URL}/update/${order.id}`, order)
  // }

  // public deleteOrder(orderId: number): Observable<any> {
  //   return this.http.delete(`${this.URL}/delete/${orderId}`, {responseType: 'text'});
  // }

  // public findOrder(orderId: number): Observable<any> {
  //   return this.http.put(`${this.URL}/find/${orderId}`, {responseType: 'text'});
  // }

  // informChild(){
  //   this.orderAdded.next();
  // }
}
