import {Component, OnInit, OnDestroy, Input, HostBinding,Output,EventEmitter } from '@angular/core';

import {Carousel, Direction} from  './carousel.component';

@Component({
  selector: 'slide',
  template: `
    <div [class.active]="SliderState()" class="item text-center">
      <ng-content></ng-content>
    </div>
  `
})
export class Slide implements OnInit {
  @Input() public index:number;
  @Input() public direction:Direction;
  @Output() slideactive = new EventEmitter();
  @HostBinding('class.active')
  @Input() public active:boolean;

  @HostBinding('class.item')
  @HostBinding('class.carousel-item')
  private addClass:boolean = true;

  constructor(private carousel:Carousel) {
  }

  SliderState(){
    if(this.active == true){
      this.slideactive.emit();
    }
    return this.active
  }

  public ngOnInit() {
    this.carousel.addSlide(this);
  }

  // public ngOnDestroy() {
  //   this.carousel.removeSlide(this);
  // }
}
