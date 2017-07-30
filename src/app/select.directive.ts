import { AfterViewInit, Directive, ElementRef, Input, OnChanges } from '@angular/core';

declare let jQuery: any;

@Directive({
    selector: '[select]'
})


export class SelectDirective implements AfterViewInit, OnChanges {
    event: any;
    value: any;
    length: any;
    _oldValue: any;
    @Input() select: any;
    @Input() ngModel: any;
    @Input() ngModelChangeDetect = true;
    @Input('disabled') disabled: boolean = false;

    constructor(private el: ElementRef) {}

    ngAfterViewInit() {
        this.initialize();
    }

    ngOnChanges(changes: any) {
        if (changes.select || changes.disabled) {
            setTimeout(() => {
                jQuery(this.el.nativeElement).material_select('destroy');
                this.initialize();
            }, 100);
        }

        if (this.ngModelChangeDetect && changes.ngModel) {
            setTimeout(() => {
                jQuery(this.el.nativeElement).material_select('destroy');
                this.initialize();
            }, 100);
        }

    }

    initialize() {
        jQuery(this.el.nativeElement).material_select();
        this.el.nativeElement.onchange = () => {
            if (this.el.nativeElement.multiple) {
                if (this.length !== this.el.nativeElement.selectedOptions.length) {
                    this.length = this.el.nativeElement.selectedOptions.length;
                    this.event = new Event('change');
                    this.el.nativeElement.dispatchEvent(this.event);
                } else {
                    this.event.stopPropagation();
                }
            } else {
                if (this.value !== this.el.nativeElement.value) {
                    this.value = this.el.nativeElement.value;
                    this.event = new Event('change');
                    this.el.nativeElement.dispatchEvent(this.event);
                } else {
                    this.event.stopPropagation();
                }
            }
        };
    }
}
