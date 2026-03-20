
import { Component } from '@angular/core';
import { RestaurantDetailsService } from '../../service/restaurant-details.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resturant-details',
  standalone: true,
  imports:[FormsModule, CommonModule],
  
  templateUrl: './restaurant-details.html',
  styleUrl: './restaurant-details.css'
})
export class ResturantDetailsComponent {

  resturants:any = [];
  selectedResturant: any = null;
  /*selectedResturant: {
    id?: number,
    name: string,
    address: string,
    restaurantDescription: string,
    city: string
  } | null = null;
   */

  selectedItem: number | null = null;
  isEdited: boolean = false;
  isNewItem: boolean = false;

  constructor(private restaurantService: RestaurantDetailsService, private toastr: ToastrService, private route: Router) {
  this.fetchResturants();
}


  fetchResturants() {
    this.resturants = [];
    this.restaurantService.getAllRestaurants().subscribe((res) => {
      this.resturants = res;
    })
  }

  onDropdownChange() {
    this.isNewItem = false;
    this.isEdited = false;
    this.selectedResturant = this.resturants.find(
      (item: { id: number; }) => item.id === +this.selectedItem!);
  }

  addNew() {
    this.isNewItem = true;
    this.selectedItem = null;
    this.isEdited = true;
    this.selectedResturant = {name: '', address: '', restaurantDescription: '', city: ''}
  }

  onInputChange() {
    this.isEdited = true
  }

  saveDetails() {
    if(this.selectedResturant) {
      if(this.isNewItem) {
        this.restaurantService.addNewResturant(this.selectedResturant).subscribe((res) => {console.log("Save : {}",res)});
        this.toastr.success("Saved Successfully", "Restaurant", {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        })
      } else {
        this.restaurantService.updateNewResturant(this.selectedResturant).subscribe((res) => {console.log("Save : {}",res)});
        this.toastr.info("Updated Successfully", "Restaurant", {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        })
      }
      this.fetchResturants();
      this.isNewItem = false;
      this.isEdited = false;
    }
  }

  navigate() {
    this.route.navigate(['/restaurant-listing']);
  }

}