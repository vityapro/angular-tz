import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]',
  standalone: true
})
export class OnlyNumbersDirective {

  regexStr = '^[0-9]*$';

  constructor(private el: ElementRef) {
  }


  @HostListener('keydown', ['$event']) onKeyDown(event: any): void {
    const e = event as KeyboardEvent;
    let keyCode = 0;
    if (event.keyCode !== undefined) {
      keyCode = event.keyCode;
    } else if (event.keyIdentifier !== undefined) {
      keyCode = event.keyIdentifier;
    } else if (event.key !== undefined) {
      keyCode = event.key;
    }

    if ([46, 8, 9, 27, 13, 110, 190].indexOf(keyCode) !== -1 ||
      // Allow: Ctrl+A
      (keyCode === 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (keyCode === 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+V
      (keyCode === 86 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (keyCode === 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (keyCode >= 35 && keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    const regEx = new RegExp(this.regexStr);
    if (regEx.test(e.key)) {
      return;
    } else {
      e.preventDefault();
    }
  }

}
