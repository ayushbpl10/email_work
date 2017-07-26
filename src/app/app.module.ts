import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import {Slide} from './slide.component';
import {Carousel} from './carousel.component';
import { HttpModule }    from '@angular/http';
import { AppComponent }  from './app.component';
import {EmailTemplateComponent} from './email-template.component';
import { NgUploaderModule } from 'ngx-uploader';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {PageSliderModule}    from 'ng2-page-slider';
// import { DndModule } from 'ng2-dnd';
import { CKEditorModule } from 'ng2-ckeditor';
import {ColorPickerModule} from 'angular2-color-picker';
import { TrumbowygModule} from 'ng2-lazy-trumbowyg';
import {EmailTemplateService} from './emailTemplate.service';
@NgModule({
  imports:      [ FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),BrowserModule,CKEditorModule, TrumbowygModule, FormsModule, ColorPickerModule, NgUploaderModule,HttpModule,PageSliderModule],
  declarations: [ AppComponent,EmailTemplateComponent,Carousel,Slide],
  providers: [EmailTemplateService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
