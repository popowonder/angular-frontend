import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Order } from '../model/order.model';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  totalPrice : number = 0.0;
  discountedPrice: number = 0.0;
  orderList: any;

  editValue: Order;
  editMode: boolean = false;

  errorAlert: boolean = false;
  errorMsg = "";
  successAlert: boolean = false;
  successMsg = "";

  inputOrder= {
    id:"",
    orderName:"",
    price:"",
    isDiscounted:false
  }

  constructor(private orderService : OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getAllOrders().subscribe(
      response=> {
        console.log(response)
        this.orderList = response;
        this.calculateBill();
      },
      (error: HttpErrorResponse)=> {
        console.log(error.message)
        this.errorAlert=true;
        this.errorMsg="Cannot load details. Something went wrong."
      }
      )
  }

  calculateBill() {
    this.totalPrice = 0.0;
    this.discountedPrice = 0.0;
    this.orderList.forEach(element => {
      this.totalPrice += parseInt(element.price)
      if(element.isDiscounted === true ) {
        this.discountedPrice += parseInt(element.price)-(parseInt(element.price)*.05);
      } else {
        this.discountedPrice+=parseInt(element.price);
      }
    })
  }

  deleteOrder(id) {
    this.orderService.deleteOrder(id).subscribe(
      response=> {
        this.getOrders()
        console.log(response)
      }
    )
    this.successAlert=true;
    this.successMsg="Order is successfully deleted."
    setTimeout (() => {
      this.successAlert=false;
    }, 1500);
  }

  addOrder(placeOrderForm) {
    if (placeOrderForm.value.orderName == "" || placeOrderForm.value.price == "" || placeOrderForm.value.price <= 0) {
      this.errorAlert=true;
      this.errorMsg="Unable to add order. Something went wrong."
      setTimeout (() => {
        this.errorAlert=false;
     }, 1500);
    } else {
      let orderValue = placeOrderForm.value;
      orderValue.id = null;
      this.orderService.addOrder(orderValue).subscribe(
        response=> {
          this.getOrders()
          console.log(response)
        }
      )
      this.successMsg="Order is successfully added.";
      this.successAlert=true;
      setTimeout (() => {
        this.successAlert=false;
      }, 1500);
      placeOrderForm.form.reset();
    }

  }

  editOrder(editOrder) {
    this.editMode=true;
    this.editValue = editOrder;
    console.log(this.editValue);
    console.log(this.editValue.orderName);
  }

  update(orderForm,id) {
    this.orderService.updateOrder(orderForm.value, id).subscribe(
      response => {
        this.getOrders()
      }
      )
    this.editMode=false;
    orderForm.form.reset();
    this.successAlert=true;
    this.successMsg="Order is successfully updated."
    setTimeout (() => {
      this.successAlert=false;
    }, 1500);
  }

  cancelEdit() {
    this.editMode=false;
  }










  // placeOrder(orderForm: NgForm) {
  //   document.getElementById('add-item-form').click();
  //   this.orderService.addOrder(orderForm.value).subscribe((response : Order) => {
  //     console.log(response);
  //     orderForm.reset();
  //     this.orderService.informChild();
  //   },
  //   (error : HttpErrorResponse) => {
  //     alert(error.message);
  //     orderForm.reset;
  //   }
  //   );

  // }
}
