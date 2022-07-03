import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.sass'],
})
export class SingleProductComponent implements OnInit {
  rating = 4;
  sdata: any;
  subscription: Subscription;
  back: boolean = true;

  constructor(
    private el: ElementRef,
    private ser: DataService,
    private meta: Meta,
    private title: Title,
    private route: ActivatedRoute
  ) {
    // this.title.getTitle();
    this.subscription = this.ser.getBack().subscribe((type) => {
      this.back = type;
    });

    this.route.paramMap.subscribe((params) => {
      this.getSingle(params.get('id'));

      // this.title.setTitle("this.sdata.title")
    });
  }

  ngOnInit(): void {
    console.log("............",this.back);
    this.ser.setBack(true)
   
  
  }
  ngOnDestroy() {
    this.ser.setBack(false)
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  getSingle(id: any) {
    this.ser.getProductById(id).subscribe(
      (resp) => {
        if (resp.status == 200) {
          this.sdata = resp.body[0];

          this.meta.updateTag({
            name: 'description',
            content: this.sdata.mdescription,
          });
          this.meta.updateTag({
            name: 'keywords',
            content: this.sdata.mkeywords,
          });
          this.title.setTitle(this.sdata.mtitle);
        }
      },
      (err) => console.error('Error Occured When Get All Employes ' + err)
    );
  }
}
