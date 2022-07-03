import { Component, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  subscription!: Subscription;
  back: any = false;

  title = 'restaurant';
  backClass: any;
  color: any;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.pageYOffset;

    if (scrollPosition > 50) {
      console.log("this.back",this.back);
      
      if (this.back==false) {
        this.backClass = 'bg-nav';
        this.color = 'black';
      }
    } else {
      if (this.back==false) {
        this.backClass = '';
        this.color = 'white';
      }
    }
  }
  constructor(private ser: DataService) {
    this.subscription = this.ser.getBack().subscribe((type) => {
      this.back = type;
      // if (this.back) {
      //   this.backClass = '';
      //   this.color = 'white';
      // }
    });
  }

  ngOnInit() {
    console.log("......app......",this.back);

    this.ser.setBack(false);

  }
  ngOnDestroy() {
    this.ser.setBack(true);
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
