
import {
    Component, NgModule, Input, Output, OnInit, EventEmitter, ViewChild, OnChanges,
    SimpleChanges
} from '@angular/core';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { ModalDirective } from "ngx-bootstrap";
//import { NgbModal , ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'


declare let jQuery: any;
declare let $: any;
declare let Materialize: any;
const URL = '../img/';
@Component({
    selector: 'image-upload',
    templateUrl: 'complib-image-crop.component.html'
})
export class ComplibImageCropComponent {
    @ViewChild('imageUploadModal') public imageUploadModal: ModalDirective;

    data1: any;
    cropperSettings1: CropperSettings;
    croppedWidth: number;
    croppedHeight: number;
    @Output()
    sendImage: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    showPopup: boolean = false;

    @Input()
    onClose: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

    constructor() {

        this.cropperSettings1 = new CropperSettings();
        this.cropperSettings1.width = 200;
        this.cropperSettings1.height = 200;

        this.cropperSettings1.croppedWidth = 200;
        this.cropperSettings1.croppedHeight = 200;

        this.cropperSettings1.canvasWidth = 500;
        this.cropperSettings1.canvasHeight = 300;

        this.cropperSettings1.minWidth = 10;
        this.cropperSettings1.minHeight = 10;

        this.cropperSettings1.rounded = true;
        this.cropperSettings1.keepAspect = true;

        this.cropperSettings1.cropperDrawSettings.strokeColor = '#333';
        this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;

        this.data1 = {};
    }

    ngOnChanges(changes: {[propName: string]: SimpleChanges}){
        if(changes['showPopup'] != undefined){
            if(this.showPopup == true){
                this.show();
            }
        }
    }

    show() {
        this.imageUploadModal.show();
    }


    cropped(bounds: Bounds) {
        this.croppedHeight = bounds.bottom - bounds.top;
        this.croppedWidth = bounds.right - bounds.left;
    }

    fileChangeListener($event: any) {
        let image: any = new Image();
        let file: File = $event.target.files[0];
        let myReader: FileReader = new FileReader();
        let that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };

        myReader.onerror = function () {
            // // // // console.log('sds')
        }

        myReader.readAsDataURL(file);
    }
    getImg() {
        if (this.data1.image) {
            let message = this.data1.image.toString().split(',')[1];
            this.sendImage.emit(message);
            this.hideModal();
        }
        else {
            jQuery.errorMessage('upload image first');

        }

    }

    hideModal(){
        this.imageUploadModal.hide();
        this.onClose.emit(true);
    }
    triggerInput() {
        jQuery('input[type=file]').trigger('click');
    }
}

