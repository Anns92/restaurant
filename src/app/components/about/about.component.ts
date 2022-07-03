import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass'],
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
export class AboutComponent implements OnInit {
  state = 'hide';
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
  constructor(public el: ElementRef, private ser: DataService) {}

  ngOnInit(): void {}

}
