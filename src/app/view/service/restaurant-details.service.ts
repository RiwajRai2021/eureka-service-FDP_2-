import { Injectable } from '@angular/core';
import { API_URL_RL } from '../../constants/url';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantDetailsService {

  private apiUrl = API_URL_RL;

  constructor(private http: HttpClient) { }

  getAllRestaurants(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}` + '/restaurant/fetchAllRestaurants')
      .pipe(
        catchError(this.handleError)
      );

  }

  addNewResturant(resturant: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}` + '/restaurant/addRestaurant', resturant)
      .pipe(
        catchError(this.handleError)
      );

  }

  updateNewResturant(resturant: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}` + '/restaurant/addRestaurant', resturant)
      .pipe(
        catchError(this.handleError)
      );

  }

  private handleError(error: any) {
    console.error('An error occured:', error);
    return throwError(error.message || error);
  }
}