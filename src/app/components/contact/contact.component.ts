import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass'], animations: [
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
export class ContactComponent implements OnInit {
  state = 'hide';
  contact!:FormGroup
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
  constructor(public el: ElementRef,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.contact=this.fb.group({
      email:["",Validators.required,Validators.email],
      subject:['',Validators.required],
      comment:["",Validators.required]
    })
  }
  public validate(): void {
    console.log(this.contact);

    if (this.contact.invalid) {
      for (const control of Object.keys(this.contact.controls)) {
        this.contact.controls[control].markAsTouched();
      }
      return;
    }}

    save(){
      this.validate()
    }
    get email() {
      return this.contact.get("email")!;
    }
    get subject() {
      return this.contact.get("subject")!;
    }
    get comment() {
      return this.contact.get("comment")!;
    }
}
