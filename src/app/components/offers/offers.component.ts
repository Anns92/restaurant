import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.sass'],
  animations: [
    trigger('scrollAnimation', [
      state(
        'show',
        style({
          opacity: 1,
          // transform: 'translateX(0)',
        })
      ),
      state(
        'hide',
        style({
          opacity: 0,
          // transform: 'translateX(-100%)',
        })
      ),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in')),
    ]),
  ],
})
export class OffersComponent implements OnInit {
  offers: any;
  state= "hide";
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    var body = document.body,
      html = document.documentElement;

    var height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
 
    // if (window.innerHeight/3 <= this.el.nativeElement.offsetTop-this.el.nativeElement.scrollTop+this.el.nativeElement.clientTop) {
    if (scrollPosition >=  componentPosition-500) {
      this.state = 'show';

      
    } else {
      this.state = 'hide';
    }
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      992: {
        items: 3
      }
      
    },
    nav: false
  }
  constructor(private ser: DataService,public el: ElementRef) { }

  ngOnInit(): void {
    this.getAllOffers();
  }
  getAllOffers() {
    this.ser.getOffers().subscribe(
      (resp) => {
        if (resp.status == 200) {
          this.offers = resp.body;
          console.log("offers",resp.bod
          );
          
         
        }
      },
      (err) => console.error('Error Occured When Get All Employes ' + err)
    );
  }
}
