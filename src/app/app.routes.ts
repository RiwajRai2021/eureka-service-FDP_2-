import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.Login)
  },
  {
  path: 'register',
  loadComponent: () =>
    import('./register/register.component').then(m => m.Register)
}
,
  {
    path: 'restaurant-listing',
    loadComponent: () =>
      import('./restaurant-listing/restaurant-listing.component')
        .then(m => m.RestaurantListingComponent)
  },
  {
    path: 'food-catalogue/:id',
    loadComponent: () =>
      import('./food-catalogue/components/food-catalogue')
        .then(m => m.FoodCatalogueComponent)
  },
  {
    path: 'orderSummary',
    loadComponent: () =>
      import('./order-summary/components/order-summary')
        .then(m => m.OrderSummary)
  }
];
