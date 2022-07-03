import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  sliders: any;

 
  constructor(public el: ElementRef, private ser: DataService) {}

  ngOnInit(): void {
    this.getAllSliders();
  }

  getAllSliders() {
    this.ser.getSliders().subscribe(
      (resp) => {
        if (resp.status == 200) {
          this.sliders = resp.body;
         
        }
      },
      (err) => console.error('Error Occured When Get All Employes ' + err)
    );
  }
}
