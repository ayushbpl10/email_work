import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';

import { HttpModule }    from '@angular/http';
import { AppComponent }  from './app.component';
import { SelectDirective }  from './select.directive';
import {DesignEmailTemplateComponent} from './app-design-email-template.component';
import {DiscountCouponListComponent} from './discountCouponList.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ModalModule } from 'ngx-bootstrap';
import {GetDiscountCouponService} from './discountCoupon.service'
import {ColorPickerModule} from 'angular2-color-picker';
import {EmailTemplateService} from './emailTemplate.service';
import {TagsInputDirective} from './tagsInput.directive';

// import {Slide} from './slide.component';
// import {Carousel} from './carousel.component';
// import { NgUploaderModule } from 'ngx-uploader';
// import {PageSliderModule}    from 'ng2-page-slider';
// import {ComplibImageCropComponent} from './complib-image-crop.component';
// import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
// import { DndModule } from 'ng2-dnd';
// import { CKEditorModule } from 'ng2-ckeditor';
// import { TrumbowygModule} from 'ng2-lazy-trumbowyg';


@NgModule({
  imports: [ FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(), BrowserModule, FormsModule, ColorPickerModule, HttpModule, ModalModule.forRoot()],
  declarations: [ AppComponent, DesignEmailTemplateComponent, SelectDirective, DiscountCouponListComponent, TagsInputDirective],
  providers: [EmailTemplateService, GetDiscountCouponService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
