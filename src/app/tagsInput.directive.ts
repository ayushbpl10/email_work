import { Directive, ElementRef, Renderer, AfterViewInit, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';

declare let jQuery: any;
@Directive({
    selector: '[tagsInput]'
})


export class TagsInputDirective implements AfterViewInit, OnChanges {
    @Output() updateTag = new EventEmitter();
    @Input() tagsData: any;
    constructor(private el: ElementRef) {
    }

    ngAfterViewInit() {
        this.initialize();
    }
    ngOnChanges(changes: SimpleChanges) {
        // if (!changes.tagsData.firstChange) {
        //     jQuery(this.el.nativeElement).tagsinput('destroy');
        //     jQuery(this.el.nativeElement).unbind();
        //     setTimeout(()=>{this.initialize();},10);
        // }
    }

    initialize() {
        let $that = this;
        jQuery(this.el.nativeElement).tagsinput();

        jQuery(this.el.nativeElement).on('itemAdded', function (event: any) {
            updated(this);
        });

        jQuery('input').on('itemRemoved', function (event: any) {
            updated(this);
        });

        function updated(items: any) {
            $that.updateTag.emit(jQuery(items).tagsinput('items'));
        }

    }


}