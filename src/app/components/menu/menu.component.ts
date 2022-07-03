import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { share } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass'], animations: [
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
export class MenuComponent implements OnInit {
  state = 'hide';
  meals: any;
  burgers: any;
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
  activeFragment = this.route.fragment.pipe(share());

  constructor(public el: ElementRef,private ser:DataService,public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllBurger()
    this.getAllMeals()
  }
  getAllMeals() {
    this.ser.getMeals().subscribe(
      (resp) => {
        if (resp.status == 200) {
          this.meals = resp.body;
          
          
         
        }
      },
      (err) => console.error('Error Occured When Get All Employes ' + err)
    );
  }
  getAllBurger() {
    this.ser.getBurgers().subscribe(
      (resp) => {
        if (resp.status == 200) {
          this.burgers = resp.body;
         
          
         
        }
      },
      (err) => console.error('Error Occured When Get All Employes ' + err)
    );
  }
}
