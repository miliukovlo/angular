import { Component, Input } from '@angular/core';
import { HousingLocation } from '../housinglocation';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [
    RouterModule
  ],
  template: `
    <section class="listing">
        <img class="listing-photo" [src]="housingLocation.photo" alt="Это фото дома {{housingLocation.name}}">
        <h2 class="listing-heading">{{ housingLocation.name }}</h2>
        <p class="listing-location">{{ housingLocation.city}}, {{housingLocation.state }}</p>
        <a [routerLink]="['/details', housingLocation.id]">Подробнее</a>
    </section>
  `,
  styleUrl: './housing-location.component.css'
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation
}
