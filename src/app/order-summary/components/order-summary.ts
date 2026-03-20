import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { OrderService } from '../service/order.service';
import { OrderDTO } from '../models/OrderDTO';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-summary',
  standalone:true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './order-summary.html',
  styleUrls: ['./order-summary.css'],
})
export class OrderSummary {

  orderSummary?: OrderDTO; 
  obj:any;
  total?:any;
  showDialog: boolean = false;

  constructor(private route:ActivatedRoute, private orderService: OrderService, private router:Router){ }

  ngOnInit(){
      const data = this.route.snapshot.queryParams['data'];
      this.obj = JSON.parse(data);
      this.obj.userId = 1; 
      this.orderSummary = this.obj;

      this.total = this.orderSummary?.foodItemsList?.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.quantity * currentValue.price);
       }, 0);
        
      
     }
saveOrder() {

  if (!this.orderSummary?.foodItemsList) {
    console.error("Order summary or food items list is missing");
    return;
  }

  // 🔥 FIX: Ensure isVeg is never null or undefined
  this.orderSummary.foodItemsList = this.orderSummary.foodItemsList.map(item => ({
    ...item,
    isVeg: item.isVeg ?? false
  }));

  // 🔍 Log final payload
  console.log("Final payload:", JSON.stringify(this.orderSummary, null, 2));

  // 🚀 Send to backend
  this.orderService.saveOrder(this.orderSummary)
    .subscribe(
      response => {
        this.showDialog = true; 
      },
      error => {
        console.error('Failed to save data:', error);
      }
    );
}




  closeDialog() {
    this.showDialog = false;
    this.router.navigate(['/']); // Replace '/home' with the actual route for your home page
  }
}



