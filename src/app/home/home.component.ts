import { Component } from '@angular/core';
import { CarrouselComponent } from '../carrousel/carrousel.component';
import { ProductCarouselComponent } from '../components/product-carousel/product-carousel.component';

@Component({
  selector: 'app-home',
  imports: [CarrouselComponent,ProductCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


}
