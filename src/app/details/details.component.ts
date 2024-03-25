import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo"
      alt="Фоторафия дома {{housingLocation?.name}}"/>
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
        </section>
        <section class="listing-features">
        <h2 class="section-heading">О локации этого дома</h2>
        <ul>
            <li>Доступные слоты: {{housingLocation?.availableUnits}}</li>
            <li>Есть ли Wi-Fi в доме: {{housingLocation?.wifi ? 'Да' : 'Нет'}}</li>
            <li>Есть ли лаундж-зона в доме: {{housingLocation?.laundry ? 'Да' : 'Нет'}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
            <label for="first-name">Имя</label>
            <input id="first-name" type="text" formControlName="firstName">

            <label for="last-name">Фамилия</label>
            <input id="last-name" type="text" formControlName="lastName">

            <label for="email">Email</label>
            <input id="email" type="email" formControlName="email">
            <button type="submit" class="primary">Принять</button>
        </form>
    </section>
    </article>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  housingService: HousingService = inject(HousingService);
  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocation: HousingLocation | undefined;
  housingLocationId = -1;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  })

  constructor() {
      this.housingLocationId = Number(
          this.route.snapshot.params['id']
      );
      this.housingLocation = this.housingService.getHousingLocationById(
        this.housingLocationId
    );
  }

  submitApplication() {
    this.housingService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.email ?? ''
    );
    this.applyForm.reset();
  }
}
