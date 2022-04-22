import { Directive, ElementRef, Input } from '@angular/core';

export type HTMLTagWithDisabledAttr =
  | HTMLButtonElement
  | HTMLFieldSetElement
  | HTMLInputElement
  | HTMLOptGroupElement
  | HTMLOptionElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export enum HTMLTagTypeWithDisabledAttr {
  BUTTON = 'BUTTON',
  FIELDSET = 'FIELDSET',
  INPUT = 'INPUT',
  KEYGEN = 'KEYGEN',
  OPTGROUP = 'OPTGROUP',
  OPTION = 'OPTION',
  SELECT = 'SELECT',
  TEXTAREA = 'TEXTAREA',
}

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
      case HTMLTagTypeWithDisabledAttr.BUTTON:
      case HTMLTagTypeWithDisabledAttr.FIELDSET:
      case HTMLTagTypeWithDisabledAttr.INPUT:
      case HTMLTagTypeWithDisabledAttr.KEYGEN:
      case HTMLTagTypeWithDisabledAttr.OPTGROUP:
      case HTMLTagTypeWithDisabledAttr.OPTION:
      case HTMLTagTypeWithDisabledAttr.SELECT:
      case HTMLTagTypeWithDisabledAttr.TEXTAREA:
        // casting is necessary here
        (<HTMLTagWithDisabledAttr>element).disabled = isDisabled;
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
