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
  private onMouseEnterHandler(event: MouseEvent) {
    this.update(event);
  }

  @HostListener("mouseleave")
  private onMouseLeaveHandler() {
    this.renderer.setStyle(this.card.nativeElement, "transform", null);
    this.renderer.removeClass(this.card.nativeElement, 'hover');
  }

  @HostListener("mousemove")
  private onMouseMoveHandler(event: MouseEvent) {
    if (this.shouldUpdate()) {
      this.update(event);
    }
  }

  private update(event) {
    this.updatePosition(event);
    this.updateTransformStyle(
      Number((this.mouse.y / this.card.nativeElement.offsetHeight / 2).toFixed(2)),
      Number((this.mouse.x / this.card.nativeElement.offsetWidth / 2).toFixed(2))
    );
  }

  private updateTransformStyle(x: number, y: number) {
    const style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    this.renderer.setStyle(this.card.nativeElement, "transform", style);
    this.renderer.addClass(this.card.nativeElement, 'hover');
  }
  private shouldUpdate() {
    return this.counter++ % this.updateRate === 0;
  }

  private updatePosition(event: any) {
    const evt = event || window.event;
    this.mouse.x = evt.clientX - this.mouse._x;
    this.mouse.y = (evt.clientY - this.mouse._y) * -1;
  }

  private setOrigin(element: HTMLElement) {
    this.mouse._x = element.offsetLeft + Math.floor(element.offsetWidth / 2);
    this.mouse._y = element.offsetTop + Math.floor(element.offsetHeight / 2);
  }

}
