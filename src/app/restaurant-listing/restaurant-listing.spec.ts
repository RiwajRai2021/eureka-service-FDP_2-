import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantListingComponent } from './restaurant-listing.component';

describe('RestaurantListingComponent', () => {
  let component: RestaurantListingComponent;
  let fixture: ComponentFixture<RestaurantListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantListingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantListingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
