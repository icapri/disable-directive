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
    if (isDisabled) {
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
          // workaround, cos cases do not enable type security
          (element as DisableableHTMLElement).disabled = true;
          break;
        default:
          element.style.pointerEvents = 'none';
          break;
      }
    }
  }

  /**
   * @constructor
   * @param elementRef Contains a reference to the HTML element this directive
   * is being applied to.
   */
  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}
}
