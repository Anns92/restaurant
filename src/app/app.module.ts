import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormsModule } from '@angular/forms';
import { MapComponent } from './components/map/map.component';
import { fakeBackendProvider } from './util/fake-bakend.interceptor';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, SingleProductComponent],

  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgxStarRatingModule,
    FormsModule,

    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [fakeBackendProvider,DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
