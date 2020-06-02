import { Directive, OnInit, Renderer2, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[animate3d]'
})
export class Animate3dDirective implements OnInit {

  private counter = 0;
  private updateRate = 10;
  private mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
  };

  constructor(private card: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.setOrigin(this.card.nativeElement.parentElement);
  }

  @HostListener("mouseenter")
  private onMouseEnterHandler(event) {
    this.update(event);
  }

  @HostListener("mouseleave")
  private onMouseLeaveHandler() {
    this.renderer.setStyle(this.card.nativeElement, "transform", null);
  }

  @HostListener("mousemove")
  private onMouseMoveHandler(event) {
    if (this.isTimeToUpdate()) {
      this.update(event);
    }
  }

  private update(event) {
    this.updatePosition(event);
    this.updateTransformStyle(
      (this.mouse.y / this.card.nativeElement.offsetHeight / 2).toFixed(2),
      (this.mouse.x / this.card.nativeElement.offsetWidth / 2).toFixed(2)
    );
  }

  private updateTransformStyle(x, y) {
    const style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    this.renderer.setStyle(this.card.nativeElement, "transform", style);
  }
  private isTimeToUpdate() {
    return this.counter++ % this.updateRate === 0;
  }

  private updatePosition(event) {
    const evt = event || window.event;
    this.mouse.x = evt.clientX - this.mouse._x;
    this.mouse.y = (evt.clientY - this.mouse._y) * -1;
  }

  private setOrigin(element) {
    this.mouse._x = element.offsetLeft + Math.floor(element.offsetWidth / 2);
    this.mouse._y = element.offsetTop + Math.floor(element.offsetHeight / 2);
  }

}
