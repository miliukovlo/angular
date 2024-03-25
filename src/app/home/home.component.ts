import { Component, inject } from '@angular/core';
import { HousingService } from '../housing.service';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent
  ],
  template: `
    <section class="home-block">
      <h1>Форма поиска по городу</h1>
      <form action="">
        <input (input)="filterResults(filter.value)" #filter type="text" placeholder="Введите название города">
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let house of filteredLocationList"
        [housingLocation]="house">
      </app-housing-location>
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
      filteredLocationList: HousingLocation[] = []
      housingLocationList: HousingLocation[] = [];
      housingService: HousingService = inject(HousingService);
      constructor() {
        this.housingLocationList = this.housingService.getAllHousingLocations();
        this.filteredLocationList = this.housingLocationList;
    }
    filterResults(text: string) {
      if (!text) {
          this.filteredLocationList = this.housingLocationList;
      }
  
      this.filteredLocationList = this.housingLocationList.filter(
          housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
      );
  }
}