import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ServicesComponent } from 'src/app/components/services/services.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OffersComponent } from 'src/app/components/offers/offers.component';
import { AboutComponent } from 'src/app/components/about/about.component';
import { ContactComponent } from 'src/app/components/contact/contact.component';
import { TestimonialComponent } from 'src/app/components/testimonial/testimonial.component';
import { MapComponent } from 'src/app/components/map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    ServicesComponent,
    MenuComponent,
    OffersComponent,
    AboutComponent,
    ContactComponent,
    TestimonialComponent,
    MapComponent

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarouselModule ,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
