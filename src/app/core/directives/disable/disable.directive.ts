import { Directive, ElementRef, Input } from '@angular/core';

export type DisableableHTMLElement =
  | HTMLButtonElement
  | HTMLFieldSetElement
  | HTMLInputElement
  | HTMLOptGroupElement
  | HTMLOptionElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

@Directive({
  selector: '[disable]',
  exportAs: 'disable',
})
export class DisableDirective {
  private get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  @Input('disable')
  public get disabled(): boolean {
    return this.disabled;
  }

  public set disabled(isDisabled: boolean) {
    const element: HTMLElement = this.element;
    switch (element.tagName) {
      case 'BUTTON':
      case 'FIELDSET':
      case 'INPUT':
      case 'KEYGEN':
      case 'OPTGROUP':
      case 'OPTION':
      case 'SELECT':
      case 'TEXTAREA':
        (element as DisableableHTMLElement).disabled = isDisabled;
        break;
      default:
        element.style.pointerEvents = isDisabled ? 'none' : 'auto';
        break;
    }
  }

  /**
   * @constructor
   * @param elementRef Contains a reference to the HTML element this directive
   * is being applied to.
   */
  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}
}
