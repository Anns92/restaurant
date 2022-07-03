import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.sass']
})
export class TestimonialComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    center: true,
    // autoplay:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      992: {
        items: 3
      },
      
    },
    nav: false
  }
  testimonial: any;
  constructor(private ser: DataService) { }

  ngOnInit(): void {
    this.getAllTestimonials()
  }
  getAllTestimonials() {
    this.ser.getTestimonials().subscribe(
      (resp) => {
        if (resp.status == 200) {
          this.testimonial = resp.body;
          console.log("offers",resp.bod
          );
          
         
        }
      },
      (err) => console.error('Error Occured When Get All Employes ' + err)
    );
  }
}
