import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../Shared/models/Restaurant';
import { RestaurantService } from './service/restaurant.service';
import { ViewEncapsulation } from '@angular/core';
import './restaurant-listing.component.css';



@Component({
  selector: 'app-restaurant-listing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './restaurant-listing.component.html',
  styleUrls: ['./restaurant-listing.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class RestaurantListingComponent implements OnInit {

  restaurantList: Restaurant[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private router: Router
    
  ) {
     console.log("THIS IS MY RESTAURANT LISTING COMPONENT");
  }

  ngOnInit(): void {
    this.getAllRestaurants();
    console.log("RESTAURANT LISTING INIT");
  }

  getAllRestaurants() {
  this.restaurantService.getAllRestaurants().subscribe((data: Restaurant[]) => {
    this.restaurantList = data.map((r: any) => {
      console.log("RAW RESTAURANT FROM BACKEND:", r);  // <-- ADD THIS
      const img = this.getRandomImage();
      return {
        ...r,
        assignedImage: img
      };
    });

    console.log("Final restaurant list:", this.restaurantList);
  });
}



  getRandomImage(): string {
    const images = [
      '1.jpg',
      '2.jpg',
      '3.jpg',
      '4.jpg',
      '5.jpg',
      '6.jpg',
      '7.jpg',
      '8.jpg'
    ];

    const randomIndex = Math.floor(Math.random() * images.length);
    return `assets/restaurant-pics/${images[randomIndex]}`;
  }

  onButtonClick(id: number) {
    console.log("Restaurant object:" , this.restaurantList);
    console.log("ID RECEIVED:", id); 
    this.router.navigate(['/food-catalogue', id]);
  }

  orderNow(restaurant:Restaurant){
    this.router.navigate(['/food-catalogue', restaurant.id]);
  }


}
