import {
  Component, AfterViewInit, ChangeDetectorRef, EventEmitter, OnInit, SimpleChange,
  OnChanges, OnDestroy, Output, Input
} from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import 'rxjs/Rx';
declare var $ :any;
declare const jQuery: any;
declare const bootbox: any;
declare const dragula: any;
@Component({
  selector: 'email-template',
  templateUrl: `./email-template.component.html`
})
export class EmailTemplateComponent implements AfterViewInit,OnInit,OnChanges,OnDestroy {


  @Input() DiscountArray: Array<any>;
  @Input() set NewCouponCreated(NewCouponCreated: any) {
    this.CouponCreated(NewCouponCreated);
  };
  @Input() DiscountSelectedId : any;
  @Input() TemplateEmail: any = "";
  @Output() TemplateSave = new EventEmitter();
  @Output() TemplateWithEmail = new EventEmitter();
  @Output() DiscountCouponCreate = new EventEmitter();

  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','Smarty Tags','html','insertLink'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','Smarty Tags','html','insertLink'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','Smarty Tags','html','insertLink'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','Smarty Tags','html','insertLink'],
    heightMin: 100,
    heightMax: 150
  };



  initialtext : boolean = true;
  showtext:boolean = false;
  showimage:boolean = false;
  showbutton:boolean = false;
  showimagetext:boolean = false;
  showimageimage : boolean = false;
  showdiscountcoupon : boolean = false;
  discountEdit: boolean = false;
  discountCoupon : any;
  carousel: any ;


  content: string;
  buttontext:string;
  element : HTMLElement;
  backgroundcolor : string;
  btnbackgroundcolor : string;
  btntextcolor: string;
  textcolor : string;
  linkcolor : string;
  bordercolor : string;
  borderstyle: string;
  borderwidth: string;
  filesToUpload: Array<File>;
  linkTo:string;
  webAdd:string;
  emailAdd:string;
  emailSub:string;
  emailBody:string;
  EmailArray:Array<any>;
  select : any;

  merged: any;
  returnvalue:any;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  selimgpos:string;
  selimgsize:string;
  selimgboxsize:string;
  selimgposleft:string;
  selimgsizeleft:string;
  selimgposright:string;
  selimgsizeright:string;
  selimgboxsizeleft:string;
  selimgboxsizeright:string;
  imgFrom : string;
  sizeleft:string;
  sizeright:string;
  customDiscountImgURL: string = "http://";
  category: any = "1";
  Anchorimg: string;

  anniversary_category = true;
  birthday_category = false;
  christmas_category = false;

  constructor(private  changeDetectorRef: ChangeDetectorRef) {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;

  }




  EmailPreview(){

    console.log("preview");
    let template = jQuery("#email").parent().html();
    //jQuery(templateClone).find(".hoverable").removeClass("hoverable");
    //jQuery(templateClone).find('.hover-btn').remove();

    //let template = jQuery(templateClone).html();

    // jQuery("#EmailPreviewModal").find("#desktopPreview").html(template);
    // jQuery('#EmailPreviewModal').find("#email").removeAttr("id");
    // jQuery('#EmailPreviewModal').find(".hoverable").removeClass("hoverable");
    // jQuery('#EmailPreviewModal').find('.hover-btn').remove();
    let desktop = jQuery("#desktopPreview");

    desktop.attr("srcdoc",template);

    desktop.on( "load", function(){
      desktop.contents().find("#email").removeAttr("id");
      desktop.contents().find(".hoverable").removeClass("hoverable");
      desktop.contents().find('.hover-btn').remove();
    });

    let phone = jQuery("#frame_1");
    phone.attr("srcdoc",template);

    phone.on( "load", function(){
      phone.contents().find("#email").removeAttr("id");
      phone.contents().find(".hoverable").removeClass("hoverable");
      phone.contents().find('.hover-btn').remove();
    });




  }


  Save(){

    jQuery('#destination').find('.hover-btn').remove();
    let template = jQuery("#email").parent().html();
    this.TemplateSave.emit(template);

    let editoptions = jQuery('.hover-btn').first().clone(false);
    jQuery('#destination').find("[data-initial='false']").append(editoptions);

  }

  onMove(event:any){
    console.log(event+"move called");
  }

  onUploadOutput(output: UploadOutput): void {
    console.log(output); // lets output to see what's going on in the console
    let self = this;
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      const event: UploadInput = {
        type: 'uploadAll',
        url: 'http://localhost:10050/upload',
        method: 'POST',
        data: { foo: 'bar' },
        concurrency: 0
      };
      this.uploadInput.emit(event);

    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file); // add file to array when added

      console.log(this.files)
    } else if (output.type === 'uploading') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'done') {

      if(self.imgFrom=='left'){
        jQuery(self.element).find("img[data-from='left']").attr('src','backend/uploads/'+output.file.response[0].filename);
        jQuery(self.element).find("img[data-from='left']").css('width','100%');

        jQuery(self.element).find("img[data-from='left']").siblings().remove();
        jQuery('#preview_image_left').find('img').attr('src','backend/uploads/'+output.file.response[0].filename);


      }
      else if(self.imgFrom=='right'){
        jQuery(self.element).find("img[data-from='right']").attr('src','backend/uploads/'+output.file.response[0].filename);
        jQuery(self.element).find("img[data-from='right']").css('width','100%');

        jQuery(self.element).find("img[data-from='right']").siblings().remove();
        jQuery('#preview_image_right').find('img').attr('src','backend/uploads/'+output.file.response[0].filename);



      }
      else{

        jQuery(self.element).find('img').attr('src','backend/uploads/'+output.file.response[0].filename);
        jQuery(self.element).find('img').css('width','100%');

        jQuery(self.element).find('img').siblings().remove();
        jQuery('#preview_image').find('img').attr('src','backend/uploads/'+output.file.response[0].filename);

      }
    } else if (output.type === 'dragOver') { // drag over event
      this.dragOver = true;
    } else if (output.type === 'dragOut') { // drag out event
      this.dragOver = false;
    } else if (output.type === 'drop') { // on drop event
      this.dragOver = false;
    }
  }



  // startUpload(): void {  // manually start uploading
  //   const event: UploadInput = {
  //     type: 'uploadAll',
  //     url: 'http://ngx-uploader.com/upload',
  //     method: 'POST',
  //     data: { foo: 'bar' },
  //     concurrency: 1 // set sequential uploading of files with concurrency 1
  //   }

  //   this.uploadInput.emit(event);
  // }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
    console.log("cancel upload")
  }

  ImageModalTrigger(imageFrom:string,event:any){
    let self =this;
    console.log(imageFrom);
    self.imgFrom = imageFrom;
    let el = jQuery(event.target);
    el.attr("data-toggle","modal");
    el.attr("data-target","#imageModal");
    //image


  }
  BrowseImage(){
    jQuery('#imageModal').modal('toggle');
  }

  onAddClick(){
    let self = this;
    let src = jQuery("#add_input").val();
    if(self.imgFrom=='left'){
      let el  = jQuery(self.element).find("img[data-from='left']");
      el.attr('src',src);
      el.css('width','100%');
      el.siblings().remove();
      jQuery('#preview_image_left').find('img').attr('src',src);
      console.log("Left called")

    }
    else if(self.imgFrom=='right'){
      let el = jQuery(self.element).find("img[data-from='right']");
      el.attr('src',src);
      el.css('width','100%');
      el.siblings().remove();
      jQuery('#preview_image_right').find('img').attr('src',src);
      console.log("Right called")
    }
    else if(self.imgFrom=='withtext'){
      let el = jQuery(self.element).find("img[data-from='one']");
      el.attr('src',src);
      el.css('width','100%');
      el.siblings().remove();
      jQuery('#preview_image_text').find('img').attr('src',src);
      console.log("One with text called")
    }
    else{
      let el = jQuery(self.element).find("img[data-from='one']");
      el.attr('src',src);
      el.css('width','100%');
      el.siblings().remove();
      jQuery('#preview_image').find('img').attr('src',src);

      console.log("One called")
    }

  }

  onImageClick(event:any){
    let self = this;


    if(self.imgFrom == 'left'){
      let src = jQuery(event.target).attr('src');
      let el = jQuery(self.element).find("img[data-from='left']");
      el.attr('src',src);
      el.css('width','100%');

      el.siblings().remove();
      console.log();
      let id = el.closest('.item').attr('id');

      jQuery('#preview_image_left').find("img").attr('src',src);

    }
    else if(self.imgFrom == 'right'){
      let src = jQuery(event.target).attr('src');
      let el = jQuery(self.element).find("img[data-from='right']");
      el.attr('src',src);
      el.css('width','100%');

      el.siblings().remove();
      console.log();
      let id = el.closest('.item').attr('id');

      jQuery('#preview_image_right').find("img").attr('src',src);

    }
    else{

      let src = jQuery(event.target).attr('src');
      let el = jQuery(self.element).find("img[data-from='one']");
      el.attr('src',src);
      el.css('width','100%');

      el.siblings().remove();
      console.log();
      let id = el.closest('.item').attr('id');
      if(id =='image_text_item' || id=='text_image_item'){
        jQuery('#preview_image_text').find('img').attr('src',src);
      }
      else if(id=='image_item'){
        jQuery('#preview_image').find('img').attr('src',src);
      }

    }


  }

  onImgAnchorChange(imgfrom:any,event:any){
    let self=this;
    self.imgFrom = imgfrom;

    self.Anchorimg = event;

    let el = jQuery(self.element).find('img').closest("a");

    el.attr("href",event);





  }
  onImgPosChange(imgfrom:any,event:any){
    let self=this;
    console.log(event);
    self.imgFrom = imgfrom;

    if(self.imgFrom=='left'){
      let el = jQuery(self.element).find("img[data-from='left']").parent();

      switch(event){
        case 'left':
          el.css('text-align','left');
          el.attr('data-align','left');
          break;
        case 'center':
          el.css('text-align','center');
          el.attr('data-align','center');
          break;
        case 'right':
          el.css('text-align','right');
          el.attr('data-align','right');
          break;
      }

    }
    else if(self.imgFrom=='right'){
      let el = jQuery(self.element).find("img[data-from='right']").parent();

      switch(event){
        case 'left':
          el.css('text-align','left');
          el.attr('data-align','left');
          break;
        case 'center':
          el.css('text-align','center');
          el.attr('data-align','center');
          break;
        case 'right':
          el.css('text-align','right');
          el.attr('data-align','right');
          break;
      }

    }
    else{

      let el = jQuery(self.element).find('img').closest("[data-align]");

      switch(event){
        case 'left':
          el.css('text-align','left');
          el.attr('data-align','left');
          break;
        case 'center':
          el.css('text-align','center');
          el.attr('data-align','center');
          break;
        case 'right':
          el.css('text-align','right');
          el.attr('data-align','right');
          break;
      }

    }


  }

  onImgSizeChange(imgfrom:string,event:any){
    let self=this;
    console.log(event);
    self.imgFrom=imgfrom;

    if(self.imgFrom=='left'){
      self.sizeleft=event;
      let el = jQuery(self.element).find("img[data-from='left']");

      switch(event){
        case 'fit':
          el.css('width','100%');
          el.parent().attr('data-size','fit');

          break;
        default:
          el.css('width',event);
          el.parent().attr('data-size',event);
          break;
        // case 'actualwithimage':
        //   let parentwidth= el.parent().width();
        //
        //   var image = new Image();
        //   image.src = el.attr("src");
        //
        //   let width =  image.naturalWidth;
        //
        //   if(width<parentwidth){
        //     el.css('max-width',el.parent().width());
        //     el.css('width','auto');
        //   }else{
        //     el.css('width','100%');
        //   }
        //   el.parent().attr('data-size','actualwithimage');
        //
        //   break;
      }

    }
    else if(self.imgFrom=='right'){
      self.sizeright=event;
      let el = jQuery(self.element).find("img[data-from='right']");
      switch(event){

        case 'fit':
          el.css('width','100%');
          el.parent().attr('data-size','fit');

          break;
        default:
          el.css('width',event);
          el.parent().attr('data-size',event);
          break;
        // case 'actualwithimage':
        //
        //   let parentwidth= el.parent().width();
        //
        //   var image = new Image();
        //   image.src = el.attr("src");
        //
        //   let width =  image.naturalWidth;
        //
        //   if(width<parentwidth){
        //     el.css('max-width',el.parent().width());
        //     el.css('width','auto');
        //   }else{
        //     el.css('width','100%');
        //   }
        //   el.parent().attr('data-size','actualwithimage');
        //
        //   break;
      }

    }
    else{

      let el = jQuery(self.element).find('img');
      switch(event){
        // case 'actual':
        //   let parentwidthalone =  el.closest("[data-align]").width();
        //
        //   var image = new Image();
        //   image.src = el.attr("src");
        //
        //   let widthalone =  image.naturalWidth;
        //
        //   if(widthalone<parentwidthalone){
        //     el.css('width',widthalone);
        //   }else{
        //     el.css('width','100%');
        //   }
        //
        //   el.closest("[data-align]").attr('data-size','actual');
        //   break;

        case 'fit':
          el.css('width','100%');
          el.closest("[data-align]").attr('data-size','fit');
          break;
        // case 'actualwithtext':
        //
        //   let parentwidth=  el.closest("[data-align]").width();
        //
        //   var image = new Image();
        //   image.src = el.attr("src");
        //
        //   let width =  image.naturalWidth;
        //   console.log(parentwidth+" : parent "+width+" : Width img")
        //   if(width<parentwidth){
        //
        //     el.css('width',width);
        //
        //   }else{
        //     el.css('width','100%');
        //
        //   }
        //   el.closest("[data-align]").attr('data-size','actualwithtext');
        //   break;
        default:
          el.css('width',event);
          el.closest("[data-align]").attr('data-size',event);
          break;
      }


    }


  }

  onImgBoxSizeChange(imgfrom:string,event:any){
    let self=this;
    self.imgFrom = imgfrom;
    console.log(event,self.imgFrom);
    if(self.imgFrom=='left'){
      let el=jQuery(self.element).find("img[data-from='left']").parent();
      // switch(event){
      //   case '25':
      //     el.css('width','25%');
      //     el.siblings().css('width','75%');
      //     break;
      //   case '50':
      //     el.css('width','50%');
      //     el.siblings().css('width','50%');
      //     break;
      //   case '75':
      //     el.css('width','75%');
      //     el.siblings().css('width','25%');
      //     break;
      // }
      let width = event+"%";
      let siblingwidth = (100 - parseInt(event)).toString()+"%";
      el.css('width',width);
      el.siblings().css('width',siblingwidth);
      self.onImgSizeChange('left',self.selimgsizeleft);


    }
    else if(self.imgFrom=='right'){
      let el = jQuery(self.element).find("img[data-from='right']").parent();
      // switch(event){
      //   case '25':
      //     el.css('width','25%');
      //     el.siblings().css('width','75%');
      //     break;
      //   case '50':
      //     el.css('width','50%');
      //     el.siblings().css('width','50%');
      //     break;
      //   case '75':
      //     el.css('width','75%');
      //     el.siblings().css('width','25%');
      //     break;
      // }
      let width = event+"%";
      let siblingwidth = (100 - parseInt(event)).toString()+"%";
      el.css('width',width);
      el.siblings().css('width',siblingwidth);
       self.onImgSizeChange('right',self.selimgsizeright);

    }
    else{
      let el =jQuery(self.element).find('img').parent();
      // switch(event){
      //   case '25':
      //     el.css('width','25%');
      //     el.siblings().css('width','75%');
      //
      //     break;
      //   case '50':
      //     el.css('width','50%');
      //     el.siblings().css('width','50%');
      //
      //     break;
      //   case '75':
      //     el.css('width','75%');
      //     el.siblings().css('width','25%');
      //
      //     break;
      // }
      let width = event+"%";
      let siblingwidth = (100 - parseInt(event)).toString()+"%";
      el.css('width',width);
      el.siblings().css('width',siblingwidth);
      self.onImgSizeChange('null','fit');

    }

  }

  onBorderStyleChange(event:any){
      console.log(event);
    this.borderstyle = event;
    jQuery(this.element).find('table').css('border-style',event);
  }

  onBorderColorChange(event:any){
    console.log(event);
    this.bordercolor = event;
    jQuery(this.element).find('table').css('border-color',event);
  }

  onBorderWidthChange(event:any){
    console.log(event);
    this.borderwidth = event;
    let width = event+"px";
    jQuery(this.element).find('table').css('border-width',width);
  }

  onLinkChange(event:any){
    console.log(event)
    jQuery(this.element.children).find('a').attr('data-link',event);
    let href = jQuery(this.element.children).find('a').attr('href');
    // if(this.linkTo =='web' && (href.search("subject") > -1)){
    //   jQuery(this.element.children).find('a').attr('href',this.webAdd);
    // }
    if(this.linkTo =='email' && (href.search("subject") == -1)){
      jQuery(this.element.children).find('a').attr('href','mailto:?subject=&body=');
    }
  }


  ngOnInit(){

    $(function() {
      $.FroalaEditor.DefineIcon('Smarty Tags', {NAME: 'tag'});
      $.FroalaEditor.RegisterCommand('Smarty Tags', {
        title: 'Smarty Tags',
        type: 'dropdown',
        focus: false,
        undo: false,
        refreshAfterCallback: true,
        options: {
          '*|_BUSINESS_USERNAME_|': '*|_BUSINESS_USERNAME_|',
          '*|_BUSINESS_ADDRESS_|*': '*|_BUSINESS_ADDRESS_|*',
          '*|_BUSINESS_NAME_|*': '*|_BUSINESS_NAME_|*'
        },
        callback: function (cmd: any, val: any) {
          console.log (val,cmd);
          this.html.insert(val);



        },
        // Callback on refresh.
        refresh: function ($btn: any) {
          console.log ('do refresh');
        },
        // Callback on dropdown show.
        refreshOnShow: function ($btn: any, $dropdown: any) {
          console.log ('do refresh when show');
        }
      });


    });
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    console.log(changes);

    for (let propName in changes) {
      let changedProp = changes[propName];
      if(propName == "TemplateEmail"){
        console.log(changedProp,changedProp.currentValue)
        if(changedProp.currentValue == ""){
              console.log("no input in template");
        }
        else{
          jQuery("#email").html(changedProp.currentValue);
          let editoptions = jQuery('.hover-btn').first().clone(false);
          jQuery("[data-initial='false']").append(editoptions);
        }
      }

    }
    // if(change.TemplateEmail){
    //
    //   if(change.TemplateEmail.currentValue == ""){
    //
    //   } else {
    //     jQuery("#email").html(this.TemplateEmail);
    //     let editoptions = jQuery('.hover-btn').first().clone(false);
    //     jQuery("[data-initial='false']").append(editoptions);
    //   }
    //
    // }
  }

  BackgroundColorChange(event:any){
    console.log(event)

    this.backgroundcolor = event;

    if(jQuery(this.element).attr('data-module')=='discount_item'){
      jQuery(this.element).find("table[data-coupon='true']").css("background-color",event);
    }else {
      jQuery(this.element).children().css("background-color",event);
    }

  }

  TextColorChange(event:any){

    this.textcolor = event;
    if(jQuery(this.element).attr('data-module')=='discount_item'){
      jQuery(this.element).find("table[data-coupon='true']").css("color",event);
    }else {

      jQuery(this.element).find("[data-type='text']").css("color", event);
    }
  }

  LinkColorChange(event:any){

    this.linkcolor = event;
    if(jQuery(this.element).find("[data-type='text']").find('a')=='undefined'){

    }
    else{
      jQuery(this.element).find("[data-type='text']").find('a').css("color",event);
    }

  }

  BtnBgColorChange(event:any){
    console.log(event)

    this.btnbackgroundcolor = event;
    if(jQuery(this.element).attr('data-module')=='discount_item'){
      jQuery(this.element).find("#discountCouponBtn").css("background-color",event);
    }else {
      jQuery(this.element).find('a button').css("background-color", event);
    }
  }

  BtnTextColorChange(event:any){
    console.log(event + "color applied text")

    console.log(this.element)
    if(jQuery(this.element).attr('data-module')=='discount_item'){
      jQuery(this.element).find("#discountCouponBtn").css("color",event);
    }else {
      this.textcolor = event;
      jQuery(this.element).find('a button').css("color", event);
    }
  }

  onBtnTextChange(event:any){
    console.log(event)
    jQuery(this.element).find('a button').html(event);
  }

  ModelChange(event : any){
    var str = event;
    var res = str.replace("<p>", "").replace("</p>", "");
    let el = jQuery(this.element).find("[data-type='text']");
    el.html(res);
    el.find('a').css("color",this.linkcolor);
    el.css("color",this.textcolor);
    el.css("background-color",this.backgroundcolor);
  }

  // onReadyEditor(event:any){
  //
  // }

  onImageUpload(){

    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader

  }

  onWebAddChange(event:any){
    console.log(event+"     web address");
    jQuery(this.element.children).find('a').attr('href',event);
  }

  onEmailAddChange(event:any){

    var href =  jQuery(this.element.children).find('a').attr('href');
    var newhref = href.replace(/mailto:.+subject/,"mailto:"+event+"?subject");
    jQuery(this.element.children).find('a').attr('href',newhref);
    console.log(newhref,"      : add change email    "+event)
  }

  onMsgSubChange(event:any){
    let href =  jQuery(this.element.children).find('a').attr('href');
    var newhref =href.replace(/subject=.+body/,"subject="+event+"&body");
    jQuery(this.element.children).find('a').attr('href',newhref);
    console.log(newhref,"      : Msg Sub change email    "+event)

  }

  onMsgBodyChange(event:any){

    let href =  jQuery(this.element.children).find('a').attr('href');
    var newhref = href.split("body=");

    jQuery(this.element.children).find('a').attr('href',newhref[0]+"body="+event);
    console.log(newhref,"      : Msg Sub change email    "+event)

  }


  TestEmails(){
    console.log(jQuery("#select-to").val());
    this.EmailArray = jQuery("#select-to").val();
    jQuery('#email').find('.hover-btn').remove();
    let template = jQuery("#email").parent().html();
    this.TemplateWithEmail.emit({ email : this.EmailArray, Html : template});
    // initialize the Selectize control

    var selectize = this.select[0].selectize;
    selectize.clear();

    let editoptions = jQuery('.hover-btn').first().clone(false);
    jQuery('#destination').find("[data-initial='false']").append(editoptions);



  }



  ngOnDestroy(){
    console.log("destroy called");
  }

  ColorPickerDisplay(event: any){
    console.log(event);
    setTimeout(()=>{
      console.log(jQuery(event.target).parent().children('color-picker').find('.color-picker'));
      let el = jQuery(event.target).parent().children('color-picker').find('.color-picker');
      el.css('position', 'absolute');
      el.css('top', '10px');
      el.css('left', '-230px');
      el.css('z-index', '9999');
    },0);

  }
  // anniversary(){
  //
  //   this.anniversary_category = true;
  //   this.birthday_category = false;
  //   this.christmas_category = false;
  //
  //
  // }
  //
  // birthday(){
  //   this.anniversary_category = false;
  //   this.birthday_category = true;
  //   this.christmas_category = false;
  //
  // }
  //
  // christmas(){
  //
  //   this.anniversary_category = false;
  //   this.birthday_category = false;
  //   this.christmas_category = true;
  //
  // }




  SelectCategory(event: any){
    console.log(event);
    switch(this.category){
      case "1": this.anniversary_category = true;
        this.birthday_category = false;
        this.christmas_category = false;
        break;
      case "2": this.anniversary_category = false;
        this.birthday_category = true;
        this.christmas_category = false;
        break;
      case "3": this.anniversary_category = false;
        this.birthday_category = false;
        this.christmas_category = true;
    }
  }




  onAttachCoupon(discountCoupon: any){
    let self = this;
    this.discountCoupon = discountCoupon;
    console.log(discountCoupon);
    jQuery(this.element).find("[data-coupon='false']").remove();
    jQuery(this.element).find("[data-coupon='true']").show();
    this.discountEdit = true;
    this.changeDetectorRef.detectChanges();


    console.log(" in Attach")
    this.DiscountSelectedId = discountCoupon.id;

    if(self.carousel != undefined){
      self.carousel.trigger('destroy.owl.carousel');
    }

    let owl = jQuery('.owl-carousel');
    console.log(owl);
    self.carousel = owl;

    owl.owlCarousel({
      loop:true,
      margin:10,
      nav:true,
      items:1,
      dots: false,
      onInitialized: carouselInitialized
    });

    function carouselInitialized(event: any) {

      let imgset = true;
      console.log(jQuery("table[data-coupon='true']").find('img'))
      let DiscountImgSrc = jQuery("table[data-coupon='true']").find('img').attr("src");
      let imgarray = jQuery('.owl-item').find('img');
      jQuery.each(imgarray, function( index: any, value: any ) {
        if(DiscountImgSrc == jQuery(value).attr("src")){
          self.carousel.trigger('refresh.owl.carousel', ['initialized.owl.carousel',100]);
          self.carousel.on('refreshed.owl.carousel', function(event: any) {
            self.carousel.trigger('to.owl.carousel', [index,0]);
          })
          imgset = false;
          return;
        }
      });
      if(imgset && !jQuery("table[data-coupon='true']").find('img').hasClass("none")){
        let data = jQuery("#itemforclone").clone();
        self.carousel.trigger('refresh.owl.carousel', ['initialized.owl.carousel',100]);
        self.carousel.on('refreshed.owl.carousel', function(event: any) {
          jQuery(data).find('img').attr('src',DiscountImgSrc);
          self.carousel.trigger('add.owl.carousel', [data,0]);
          self.carousel.trigger('to.owl.carousel', [0,0]);
        })

      }
      if(jQuery("table[data-coupon='true']").find('img').hasClass("none")){
        jQuery("table[data-coupon='true']").find('img').removeClass("none");
        var src= jQuery('.owl-item.active').find('img').attr('src');
        jQuery("table[data-coupon='true']").find('img').attr('src',src);
      }
    }


    owl.on('translated.owl.carousel', function(event: any) {
      var src= jQuery('.owl-item.active').find('img').attr('src');
      jQuery("table[data-coupon='true']").find('img').attr('src',src);
      console.log(jQuery("table[data-coupon='true']").find('img'))
    });


  }

  onPreviewClick(){
    console.log("preview clicked");
  }

  createDiscountCoupon(){
    this.DiscountCouponCreate.emit();
  }

  CouponCreated(Coupon: any){
    console.log(Coupon);
    jQuery(this.element).find("[data-coupon='false']").remove();
    jQuery(this.element).find("[data-coupon='true']").show();
    this.discountEdit = true;
  }

  OnCustomDiscountImgAdd(){
    let self = this;
    let btn = jQuery('#customImageUrlAddBtn');
    let url = this.customDiscountImgURL ;
    function IsValidImageUrl(url: any) {
      var img = new Image();
      img.onerror = function() {
        alert(url + ' : ' + 'Image does not exist');
        btn.prop('disabled', false);
        btn.text('Add');
      }
      img.onload =  function() {
        let data = jQuery("#itemforclone").clone();
        jQuery(data).find('img').attr('src',url);
        self.carousel.trigger('add.owl.carousel', [data,0]);
        self.carousel.trigger('to.owl.carousel', [0,100]);
        btn.prop('disabled', false);
        btn.text('Add');
        var src= jQuery('.owl-item.active').find('img').attr('src');
        jQuery("table[data-coupon='true']").find('img').attr('src',src);
      }
      img.src = url;

      btn.prop('disabled', true);
      btn.text('Loading');
    }

    IsValidImageUrl(url);

  }

  ngAfterViewInit(){

    let self = this;

    function Bootbox(el: any){
      bootbox.confirm({
        message: "Do you want to remove?",
        buttons: {
          confirm: {
            label: 'Yes',
            className: 'btn-success'
          },
          cancel: {
            label: 'No',
            className: 'btn-danger'
          }
        },
        callback: function (result:any) {
          console.log('This was logged in the callback: ' + result);
          if(result == true){
            jQuery(el).remove();
          }
        }
      });
    }

    function TextItem(el: any,event: any){


      console.log("The textarea was clicked.",event);

      if(event.target.id=='removeitem'){
        console.log("remove");
        Bootbox(el);
      }
      else{
        jQuery('#rightModal').modal('toggle');

        self.initialtext = false;
        self.showtext = true;
        self.showimage = false;
        self.showbutton = false;
        self.showimagetext = false;
        self.showimageimage = false;
        self.showdiscountcoupon = false;




        self.content = jQuery(el).find("[data-type='text']").html();
        console.log(self.content)

        self.element = el;
        self.backgroundcolor = jQuery(el).find('.item_element').css("background-color");


        self.textcolor = jQuery(el).find('.textitem').css("color");
        if(jQuery(el).find('a').css("color")== 'undefined'){
          self.linkcolor = '#0000EE';
        }
        else{
          if(jQuery(el).find('a').css("color") == undefined){
          }
          else{
            self.linkcolor = jQuery(el).find('a').css("color");
          }
        }


        // self.changeDetectorRef.detectChanges();
        // jQuery(".fr-wrapper").css("max-height","200px");
        // jQuery(".fr-wrapper").css("overflow-y","scroll");


      }


    }

    function ImageItem(el: any,event: any){

      console.log("The image was clicked.",event,el);


      if(event.target.id=='removeitem'){
        console.log("remove");
        Bootbox(el);
      }
      else{

        jQuery('#rightModal').modal('toggle');

        self.initialtext = false;
        self.showtext = false;
        self.showimage = true;
        self.showbutton = false;
        self.showimagetext = false;
        self.showimageimage = false;
        self.showdiscountcoupon = false;


        self.element = el;
        self.backgroundcolor = jQuery(el).children().css('background-color');

        self.changeDetectorRef.detectChanges();
        let src  = jQuery(el).find("img[data-from='one']").attr('src');
        jQuery('#preview_image').find('img').attr('src',src);
        let imgPos = jQuery(el).find("img[data-from='one']").closest("div[data-align]").attr('data-align');
        let imgSize = jQuery(el).find("img[data-from='one']").closest("div[data-align]").attr('data-size');
        let imgHref = jQuery(el).find("img[data-from='one']").closest("a[href]").attr('href');
        console.log(imgPos,imgSize,imgHref);

        self.Anchorimg = imgHref;
        self.selimgpos  = imgPos;
        self.imgFrom = 'null';
        self.selimgsize = imgSize;


      }

    }

    function ButtonItem(el: any,event: any){

      console.log("The button was clicked.",event);


      if(event.target.id=='removeitem'){
        console.log("remove");
        Bootbox(el);

      }
      else{
        jQuery('#rightModal').modal('toggle');

        self.initialtext = false;
        self.showtext = false;
        self.showimage = false;
        self.showbutton = true;
        self.showimagetext = false;
        self.showimageimage = false;
        self.showdiscountcoupon = false;


        self.element = el;
        let ele = jQuery(el).children();
        self.backgroundcolor = ele.css("background-color");
        self.btnbackgroundcolor = ele.find('a button').css("background-color");

        self.textcolor = ele.find('a button').css("color");
        self.buttontext = ele.find('a button').html();
        self.linkTo = ele.find('a').attr('data-link');
        let href = ele.find('a').attr('href');

        if(self.linkTo =='web' && href=='#'){
          self.webAdd = 'http://';
          self.emailAdd = '';
          self.emailSub = '';
          self.emailBody = '';
        }
        else if(self.linkTo =='web' && href !='#' && (href.search("subject") == -1)){
          self.webAdd = href;
          self.emailAdd = '';
          self.emailSub = '';
          self.emailBody = '';
        }
        else if(self.linkTo =='email' && href =='#'){
          self.webAdd = 'http://';
          self.emailAdd = '';
          self.emailSub = '';
          self.emailBody = '';
        }
        else{
          self.webAdd = 'http://';
          self.emailAdd = href.substring(href.indexOf(":") + 1, href.indexOf("?"));
          self.emailSub = href.substring(href.indexOf("subject=") + 8, href.indexOf("&"));
          self.emailBody = href.substring(href.indexOf("body=") + 5);
        }

      }

    }

    function ImageTextItem(el: any,event: any){

      console.log("The image & textarea was clicked.",event,el);


      if(event.target.id=='removeitem'){
        console.log("remove");
        Bootbox(el);

      }
      else{
        jQuery('#rightModal').modal('toggle');
        self.initialtext = false;
        self.showtext = false;
        self.showimage = false;
        self.showbutton = false;
        self.showimagetext = true;
        self.showimageimage = false;
        self.showdiscountcoupon = false;


        let elem = jQuery(el).find("[data-type='text']");
        self.content = elem.html();

        self.element = jQuery(el);
        self.backgroundcolor = jQuery(el).children().css("background-color");


        self.textcolor = elem.css("color");

        if(elem.find('a').css("color")== 'undefined'){
          self.linkcolor = '#0000EE';
        }
        else{
          self.linkcolor = elem.find('a').css("color");
        }

        //image
        self.changeDetectorRef.detectChanges();
        let src  = jQuery(el).find("img[data-from='one']").attr('src');
        jQuery('#preview_image_text').find('img').attr('src',src);
        let imgPos = jQuery(el).find('img').parent().attr('data-align');
        let imgSize =  jQuery(el).find('img').parent().attr('data-size');
        console.log(imgPos)
        self.selimgpos  = imgPos;

        self.selimgsize = imgSize;
        let widthper =  jQuery(el).find("img[data-from='one']").parent().width() / jQuery(el).children().find("img[data-from='one']").parent().parent().width() * 100;
        self.selimgboxsize = Math.round(widthper).toString();
        console.log(self.selimgboxsize)

        self.imgFrom = 'withtext';

        // self.changeDetectorRef.detectChanges();
        // jQuery(".fr-wrapper").css("max-height","200px");
        // jQuery(".fr-wrapper").css("overflow-y","scroll");

      }

    }

    function ImageImageItem(el: any,event: any){

      console.log("The image & textarea was clicked.",event);

      if(event.target.id=='removeitem'){
        console.log("remove");
        Bootbox(el);
      }
      else{
        jQuery('#rightModal').modal('toggle');
        self.initialtext = false;
        self.showtext = false;
        self.showimage = false;
        self.showbutton = false;
        self.showimagetext = false;
        self.showimageimage = true;
        self.showdiscountcoupon = false;


        self.element = jQuery(el);
        self.backgroundcolor = jQuery(el).children().css("background-color");

        self.changeDetectorRef.detectChanges();
        let eleleft =  jQuery(el).find("img[data-from='left']");
        let srcleft  = eleleft.attr('src');
        jQuery('#preview_image_left').find('img').attr('src',srcleft);
        let imgPosleft = eleleft.parent().attr('data-align');
        let imgSizeleft = eleleft.parent().attr('data-size');
        console.log(imgPosleft,"left");
        self.selimgposleft  = imgPosleft;
        self.selimgsizeleft = imgSizeleft;
        let widthperleft =  eleleft.parent().width() / jQuery(el).find("img[data-from='left']").parent().parent().width() * 100;
        self.selimgboxsizeleft = Math.round(widthperleft).toString();
        console.log(self.selimgboxsizeleft,"left")
        let eleright = jQuery(el).find("img[data-from='right']");
        let srcright  = eleright.attr('src');
        jQuery('#preview_image_right').find('img').attr('src',srcright);
        let imgPosright = eleright.parent().attr('data-align');
        let imgSizeright = eleright.parent().attr('data-size');
        self.selimgposright  = imgPosright;
        console.log(imgPosright,"right")
        self.selimgsizeright = imgSizeright;
        let widthperright =  eleright.parent().width() / jQuery(el).find("img[data-from='right']").parent().parent().width() * 100;
        self.selimgboxsizeright = Math.round(widthperright).toString();

        console.log(self.selimgboxsizeright,"right")
      }

    }

    function DiscountItem(el: any,event: any) {

      console.log("The discount coupon was clicked.",event);

      if(event.target.id=='removeitem'){
        console.log("remove");
        bootbox.confirm({
          message: "Do you want to remove?",
          buttons: {
            confirm: {
              label: 'Yes',
              className: 'btn-success'
            },
            cancel: {
              label: 'No',
              className: 'btn-danger'
            }
          },
          callback: function (result:any) {
            console.log('This was logged in the callback: ' + result);
            if(result == true){
              jQuery(el).remove();
              jQuery("[data-module='discount_item']").find("[data-initial='true']").show();
              self.discountEdit = false;
            }
          }
        });

      }
      else{
        jQuery('#rightModal').modal('toggle');
        self.initialtext = false;
        self.showtext = false;
        self.showimage = false;
        self.showbutton = false;
        self.showimagetext = false;
        self.showimageimage = false;
        self.showdiscountcoupon = true;

        self.element = jQuery(el);
        if(jQuery(el).find("[data-coupon='true']").is(':hidden')){
          self.discountEdit = false;
          self.changeDetectorRef.detectChanges();
        }
        else{
          self.onAttachCoupon(self.discountCoupon);
          console.log("from click discount");
        }

        let table =  jQuery(el).find('table');
        self.backgroundcolor = table.css('background-color');
        self.bordercolor = table.css('border-color');
        self.borderstyle = table.css('border-style');
        let border_width = table.css('border-width');
        self.borderwidth = border_width.replace("px", "");
        self.textcolor = table.css('color');
        self.btnbackgroundcolor = table.find('#discountCouponBtn').css('background-color');
        self.btntextcolor = table.find('#discountCouponBtn').css('color');
        console.log(self.btnbackgroundcolor,self.backgroundcolor,self.textcolor);



      }

    }

    jQuery("#destination").find("[data-module]").addClass("indestination");

    jQuery("[data-module='text_item']").on("click", function(event:any){

          TextItem(this,event);

    });

    jQuery("[data-module='image_item']").on("click", function(event:any){

          ImageItem(this,event);

    });

    jQuery("[data-module='button_item']").on("click", function(event:any){

          ButtonItem(this,event);

    });

    jQuery("[data-module='image_text_item']").on("click", function(event:any){

          ImageTextItem(this,event);

    });

    jQuery("[data-module='text_image_item']").on("click", function(event:any){

          ImageTextItem(this,event);

    });

    jQuery("[data-module='image_image_item']").on("click", function(event:any){

          ImageImageItem(this,event);

    });

    console.log(jQuery("#destination").find("[data-module='discount_item']").length);

    // if(jQuery("#destination").find("[data-module='discount_item']").length == 1){
    //
    //   for(let discount of  self.DiscountArray){
    //
    //     if(discount.id == self.DiscountSelectedId){
    //       console.log(self.DiscountSelectedId)
    //
    //       self.showdiscountcoupon = true;
    //
    //       self.changeDetectorRef.detectChanges();
    //
    //       self.onAttachCoupon(discount);
    //
    //
    //
    //     }
    //   }
    //
    // }

    jQuery("#destination").find("[data-module='discount_item']").on("click", function(event:any){

          DiscountItem(this,event);

    });

    let editoptions = jQuery('.hover-btn').first().clone(false);
    console.log(editoptions);
    jQuery("[data-initial='false']").append(editoptions);

    jQuery(".anchorbtn").click(function(e: any) {
      e.preventDefault();
    });
    jQuery(".anchorimg").click(function(e: any) {
      e.preventDefault();
    });

    jQuery("#origin").find("[data-initial='false']").hide()
    dragula([document.getElementById("origin"), document.getElementById("destination")], {
      copy: function (el:any, source:any) {
        return source === document.getElementById("origin")
      },
      accepts: function (el:any, target:any) {
        return target !== document.getElementById("origin")
      }
    }).on('drag', function (el:any) {
      el.className = el.className.replace('ex-moved', '');
      console.log("drag")


    }).on('drop', function (el:any) {
      el.className += ' ex-moved';
      console.log()
      jQuery(el).find("[data-initial='false']").show();


      // if(jQuery(el).find("[data-initial='true']").length==0){
      //
      // }
      // else{
      //   jQuery(el.children).hover(function(){
      //     jQuery(this).toggleClass("item_hover")
      //   });
      // }
      if(jQuery(el).find("[data-coupon='false']").length>0){
        jQuery(el).find("[data-coupon='true']").hide();
      }

      jQuery(el).find("[data-initial='true']").remove();
      jQuery(el).removeClass("col-sm-6 justify-content-center");

      //let editoptions = jQuery('.hover-btn').first().clone();
      //jQuery(el).find("[data-initial='false']").append(editoptions);
      if(jQuery(el).hasClass("indestination")){
        console.log("returned");
        return;
      }
      else{
        console.log("allowed");
        jQuery(el).addClass("indestination");
      }


      var id = jQuery(el).attr('data-module');
      console.log("drop",el,id);
      switch(id){
        case 'text_item':
          jQuery(el).on("click", function(event:any){
              TextItem(el,event);
          });
          break;
        case 'image_item':

          jQuery(el).on("click", function(event:any){
                  ImageItem(el,event);
          });
          break;
        case 'button_item':

          jQuery(el).on("click", function(event:any){
                  ButtonItem(el,event);
          });
          break;
        case 'image_text_item':
        case 'text_image_item':

          jQuery(el).on("click", function(event:any){
                  ImageTextItem(el,event);
          });
          break;
        case 'image_image_item':
          jQuery(el).on("click", function(event:any){
                  ImageImageItem(el,event);
          });

          break;
        case 'discount_item':
          console.log(jQuery('#destination').find("[data-module='discount_item']").length);
          let dropped = jQuery('#destination').find("[data-module='discount_item']").length;
          if(dropped>0){
            jQuery("[data-module='discount_item']").find("[data-initial='true']").hide();
          }

          jQuery(el).on("click", function(event:any){
              DiscountItem(el,event);
          });

          break;
        default:
          break;
      }

    }).on('over', function (el:any, container:any) {
      container.className += ' ex-over';
      console.log("over",el)
    }).on('out', function (el:any, container:any) {
      container.className = container.className.replace('ex-over', '');
      console.log("out")
    });

    var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
      '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

    self.select = jQuery('#select-to').selectize({
      persist: false,
      maxItems: null,
      valueField: 'email',
      labelField: 'name',
      searchField: ['name', 'email'],
      options: [
        {email: 'ayushbpl10@gmail.com', name: 'Ayush Gupta'},
        {email: 'nikola@tesla.com', name: 'Nikola Tesla'},
        {email: 'someone@gmail.com'}
      ],
      render: {
        item: function(item : any, escape: any) {
          return '<div>' +
            (item.name ? '<span class="name"> ' + escape(item.name) + ' </span>' : '') +
            (item.email ? '<span class="email"> ' + escape(item.email) + ' </span>' : '') +
            '</div>';
        },
        option: function(item: any, escape: any) {
          var label = item.name || item.email;
          var caption = item.name ? item.email : null;
          return '<div>' +
            '<span class="label"> ' + escape(label) + ' </span>' +
            (caption ? '<span class="caption"> ' + escape(caption) + ' </span>' : '') +
            '</div>';
        }
      },
      createFilter: function(input: any) {
        var match, regex;

        // email@address.com
        regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
        match = input.match(regex);
        if (match) return !this.options.hasOwnProperty(match[0]);

        // name <email@address.com>
        regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
        match = input.match(regex);
        if (match) return !this.options.hasOwnProperty(match[2]);

        return false;
      },
      create: function(input: any) {
        if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
          return {email: input};
        }
        var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
        if (match) {
          return {
            email : match[2],
            name  : $.trim(match[1])
          };
        }
        alert('Invalid email address.');
        return false;
      }
    });


    /*Only needed for the controls*/
    let phone = jQuery("#phone_1");
    let iframe = jQuery("#frame_1");


    /*View*/
    function updateView(view: any) {
      if (view) {
        phone.className = "phone view_" + view;
      }
    }

    /*Controls*/
    function updateIframe() {

      // preload iphone width and height
      jQuery(phone).css("width","375px");
      jQuery(phone).css("height","667px");

      /*Idea by /u/aerosole*/
      jQuery("#wrapper").css("perspective",jQuery("#iframePerspective").checked ? "1300px" : "none");
        //= (
        //
      //);

    }

    updateIframe();

    /*Events*/

    jQuery( "#controls" ).on( "change", function() {
      updateIframe();
    });
    // jQuery("#controls").addEventListener("change", function() {
    //   updateIframe();
    // });
    jQuery( "#views" ).on( "click", function(evt: any) {
      updateView(evt.target.value);
    });

    // jQuery("#views").addEventListener("click", function(evt: any) {
    //   updateView(evt.target.value);
    // });


    jQuery( "#phones" ).on( "click", function(evt: any) {
      let width;
      let height;

      if(evt.target.value == 1){
        // iphone 6
        width = 375;
        height = 667;
      }

      if(evt.target.value == 2){
        // samsung
        width = 400;
        height = 640;
      }

      if(evt.target.value == 3){
        // microsoft
        width = 320;
        height = 480;
      }

      if(evt.target.value == 4){
        // htc
        width = 360;
        height = 640;
      }

      if(evt.target.value == 5){
        // ipad mini
        width = 768;
        height = 1024;
      }

      jQuery(phone).css("width",width + "px");
      jQuery(phone).css("height",height + "px");

    });
    // jQuery("#phones").addEventListener("click", function(evt: any) {
    //
    //   let width;
    //   let height;
    //
    //   if(evt.target.value == 1){
    //     // iphone 6
    //     width = 375;
    //     height = 667;
    //   }
    //
    //   if(evt.target.value == 2){
    //     // samsung
    //     width = 400;
    //     height = 640;
    //   }
    //
    //   if(evt.target.value == 3){
    //     // microsoft
    //     width = 320;
    //     height = 480;
    //   }
    //
    //   if(evt.target.value == 4){
    //     // htc
    //     width = 360;
    //     height = 640;
    //   }
    //
    //   if(evt.target.value == 5){
    //     // ipad mini
    //     width = 768;
    //     height = 1024;
    //   }
    //
    //   phone.style.width = width + "px";
    //   phone.style.height = height + "px";
    //
    // });


    if (iframe.attachEvent){
      // iframe.attachEvent("onload", function(){
      //   afterLoading();
      // });
      jQuery(iframe).on("onload",function () {
        afterLoading();
      })
    } else {
      jQuery(iframe).on("onload",function () {
        afterLoading();
      })
      // iframe.onload = function(){
      //   afterLoading();
      // };
    }

    function afterLoading(){

      setTimeout(function() {
        //phone.className = "phone view_1";
        jQuery(phone).addClass("phone view_1");
        // setTimeout(function() {
        //   // do second thing
        //   phone.className = "phone view_1 rotate";
        // }, 1000);
      }, 1000);

    }


  }




}
