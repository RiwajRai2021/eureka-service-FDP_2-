import { Component, ChangeDetectorRef, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FoodItemService } from '../service/fooditem.service';
import { FoodCataloguePage } from '../../Shared/models/FoodCataloguePage';
import { FoodItem } from '../../Shared/models/FoodItem';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-food-catalogue',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './food-catalogue.html',
  styleUrls: ['./food-catalogue.css']
})
export class FoodCatalogueComponent implements OnInit {

  restaurantId: number;

  foodItemResponse: FoodCataloguePage = {
    restaurant: null,
    foodItemsList: []
  };

  foodItemCart: FoodItem[] = [];
  orderSummary: FoodCataloguePage;

  isLoading = true;

  constructor(
  private route: ActivatedRoute,
  private foodItemService: FoodItemService,
  private router: Router,
  
) {}

ngOnInit() {
  this.route.paramMap
    .pipe(take(1))
    .subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.restaurantId = Number(id);
        this.getFoodItemsByRestaurant(this.restaurantId);
      }
    });
}



getFoodItemsByRestaurant(id: number) {
  this.foodItemService.getFoodItemsByRestaurantId(id)
    .pipe(take(1))
    .subscribe(data => {
      console.log("FOOD ITEMS RESPONSE:", data);

      // FIX: initialize quantity
      data.foodItemsList = data.foodItemsList.map((item: FoodItem) => ({
  ...item,
  quantity: 0
}));


      this.foodItemResponse = data;
      this.isLoading = false;
    });
}



  increment(food: any) {
    food.quantity++;
    const index = this.foodItemCart.findIndex(item => item.id === food.id);
    if (index === -1) {
      this.foodItemCart.push(food);
    } else {
      this.foodItemCart[index] = food;
    }
  }

  decrement(food: any) {
    if (food.quantity > 0) {
      food.quantity--;
      const index = this.foodItemCart.findIndex(item => item.id === food.id);
      if (this.foodItemCart[index].quantity == 0) {
        this.foodItemCart.splice(index, 1);
      } else {
        this.foodItemCart[index] = food;
      }
    }
  }

  onCheckOut() {
    this.orderSummary = {
      foodItemsList: [...this.foodItemCart],
      restaurant: this.foodItemResponse.restaurant
    };

    this.router.navigate(['/orderSummary'], {
      queryParams: { data: JSON.stringify(this.orderSummary) }
    });
  }
}
