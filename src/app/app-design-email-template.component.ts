import {
  Component, AfterViewInit, ChangeDetectorRef, EventEmitter, OnInit, SimpleChanges, OnChanges, Output, Input} from '@angular/core';
import 'rxjs/Rx';
declare var jQuery: any;
declare var bootbox: any;
@Component({
  selector: 'app-design-email-template',
  templateUrl: `./app-design-email-template.component.html`
})
export class DesignEmailTemplateComponent implements AfterViewInit, OnInit, OnChanges {

  @Input() set NewCouponCreated(NewCouponCreated: any) {
    this.CouponCreated(NewCouponCreated);
  };
  @Input() DiscountSelectedId: any;
  @Input() TemplateEmail: any = '';
  @Input() TemplateID: any;
  @Output() TemplateSave = new EventEmitter();
  @Output() TemplateWithEmail = new EventEmitter();
  @Output() DiscountCouponCreate = new EventEmitter();

  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'Smarty Tags', 'html', 'insertLink'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'Smarty Tags', 'html', 'insertLink'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'Smarty Tags', 'html', 'insertLink'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'Smarty Tags', 'html', 'insertLink'],
    linkEditButtons: [],
    heightMin: 100,
    heightMax: 150
  };
  initialtext: boolean = true;
  showtext: boolean = false;
  showimage: boolean = false;
  showbutton: boolean = false;
  showimagetext: boolean = false;
  showimageimage: boolean = false;
  showdiscountcoupon: boolean = false;
  discountEdit: boolean = false;
  discountCoupon: any;
  carousel: any ;
  content: string;
  buttontext: string;
  element: HTMLElement;
  backgroundcolor: string;
  btnbackgroundcolor: string;
  btntextcolor: string;
  textcolor: string;
  linkcolor: string;
  bordercolor: string;
  borderstyle: string;
  borderwidth: string;
  filesToUpload: Array<File>;
  linkTo: string;
  webAdd: string;
  emailAdd: string;
  emailSub: string;
  emailBody: string;
  EmailArray: Array<any>;
  select: any;
  merged: any;
  returnvalue: any;
  formData: FormData;
  dragOver: boolean;
  selimgpos: string;
  selimgsize: string;
  selimgboxsize: string;
  selimgposleft: string;
  selimgsizeleft: string;
  selimgposright: string;
  selimgsizeright: string;
  selimgboxsizeleft: string;
  selimgboxsizeright: string;
  imgFrom: string;
  sizeleft: string;
  sizeright: string;
  customDiscountImgURL: string = 'http://';
  category: any = '1';
  Anchorimg: string;
  Titleimg: string;
  dataEmailArray: any = '';
  anniversary_category = true;
  birthday_category = false;
  christmas_category = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  EmailPreview() {
    let template = jQuery('#email').parent().html();
    let desktop = jQuery('#desktopPreview');
    desktop.attr('srcdoc', template);
    desktop.on( 'load', function(){
      desktop.contents().find('#email').removeAttr('id');
      desktop.contents().find('.hoverable').removeClass('hoverable');
      desktop.contents().find('.hover-btn').remove();
      desktop.contents().find('a').attr('target', '_blank');
    });
    let phone = jQuery('#frame_1');
    phone.attr('srcdoc', template);
    phone.on( 'load', function(){
      phone.contents().find('#email').removeAttr('id');
      phone.contents().find('.hoverable').removeClass('hoverable');
      phone.contents().find('.hover-btn').remove();
      phone.contents().find('a').attr('target', '_blank');
    });
  }
  Save() {
    jQuery('#destination').find('a').removeAttr('disabled');
    jQuery('#destination').find('.hover-btn').remove();
    let template = jQuery('#email').parent().html();
    this.TemplateSave.emit(template);
    let editoptions = jQuery('.hover-btn').first().clone(false);
    jQuery('#destination').find('[data-initial="false"]').append(editoptions);
  }
  ImageModalTrigger(imageFrom: string, event: any) {
    this.imgFrom = imageFrom;
    jQuery(event.target).attr('data-toggle', 'modal').attr('data-target', '#imageModal');
  }
  BrowseImage() {
    jQuery('#imageModal').modal('toggle');
  }
  onAddClick() {
    let self = this;
    let src = jQuery('#add_input').val();
    if (self.imgFrom === 'left') {
      jQuery(self.element).find('img[data-from="left"]').attr('src', src).css('width', '100%').siblings().remove();
      jQuery('#preview_image_left').find('img').attr('src', src);
    }else if (self.imgFrom === 'right') {
      jQuery(self.element).find('img[data-from="right"]').attr('src', src).css('width', '100%').siblings().remove();
      jQuery('#preview_image_right').find('img').attr('src', src);
    }else if (self.imgFrom === 'withtext') {
      jQuery(self.element).find('img[data-from="one"]').attr('src', src).css('width', '100%').siblings().remove();
      jQuery('#preview_image_text').find('img').attr('src', src);
    }else {
      jQuery(self.element).find('img[data-from="one"]').attr('src', src).css('width', '100%').siblings().remove();
      jQuery('#preview_image').find('img').attr('src', src);
    }
  }
  onImageClick(event: any) {
    let self = this;
    let src = jQuery(event.target).attr('src');
    if (self.imgFrom === 'left') {
      jQuery(self.element).find('img[data-from="left"]').attr('src', src).css('width', '100%').siblings().remove();
      jQuery('#preview_image_left').find('img').attr('src', src);
    }else if (self.imgFrom === 'right') {
      jQuery(self.element).find('img[data-from="right"]').attr('src', src).css('width', '100%').siblings().remove();
      jQuery('#preview_image_right').find('img').attr('src', src);
    }else {
      let el = jQuery(self.element).find('img[data-from="one"]').attr('src', src).css('width', '100%').siblings().remove();
      let id = el.closest('.item').attr('data-module');
      if (id === 'image_text_item' || id === 'text_image_item') {
        jQuery('#preview_image_text').find('img').attr('src', src);
      }else if (id === 'image_item') {
        jQuery('#preview_image').find('img').attr('src', src);
      }
    }
  }
  onImgTitleChange(imgfrom: any, event: any) {
    jQuery(this.element).find('img').attr('title', event);
  }
  onImgAnchorChange(imgfrom: any, event: any) {
    this.imgFrom = imgfrom;
    this.Anchorimg = event;
    jQuery(this.element).find('img').closest('a').attr('href', event);
  }
  onImgPosChange(imgfrom: any, event: any) {
    this.imgFrom = imgfrom;
    if (this.imgFrom === 'left') {
      jQuery(this.element).find('img[data-from="left"]').parent().css('text-align', event).attr('data-align', event);
    }else if (this.imgFrom === 'right') {
      jQuery(this.element).find('img[data-from="right"]').parent().css('text-align', event).attr('data-align', event);
    }else {
      jQuery(this.element).find('img').closest('[data-align]').css('text-align', event).attr('data-align', event);
    }
  }
  onImgSizeChange(imgfrom: string, event: any) {
    this.imgFrom = imgfrom;
    let el;
    if (this.imgFrom === 'left') {
      this.sizeleft = event;
      el = jQuery(this.element).find('img[data-from="left"]');
    }else if (this.imgFrom === 'right') {
      this.sizeright = event;
      el = jQuery(this.element).find('img[data-from="right"]');
    }else {
      el = jQuery(this.element).find('img');
    }
    switch (event) {
        case 'fit':
          el.css('width', '100%');
          el.closest('[data-align]').attr('data-size', 'fit');
          break;
        default:
          el.css('width', event);
          el.closest('[data-align]').attr('data-size', event);
          break;
      }
  }
  onImgBoxSizeChange(imgfrom: string, event: any) {
    this.imgFrom = imgfrom;
    let width = event + '%';
    let siblingwidth = (100 - parseInt(event, 10)).toString() + '%';
    if (this.imgFrom === 'left') {
      let el = jQuery(this.element).find('img[data-from="left"]').parent();
      el.css('width', width);
      el.siblings().css('width', siblingwidth);
      this.onImgSizeChange('left', this.selimgsizeleft);
    }else if (this.imgFrom === 'right') {
      jQuery(this.element).find('img[data-from="right"]').parent().css('width', width).siblings().css('width', siblingwidth);
      this.onImgSizeChange('right', this.selimgsizeright);
    }else {
      jQuery(this.element).find('img').parent().css('width', width).siblings().css('width', siblingwidth);
      this.onImgSizeChange('null', 'fit');
    }
  }
  onBorderStyleChange(event: any) {
    this.borderstyle = event;
    jQuery(this.element).find('table').css('border-style', event);
  }
  onBorderColorChange(event: any) {
    this.bordercolor = event;
    jQuery(this.element).find('table').css('border-color', event);
  }
  onBorderWidthChange(event: any) {
    this.borderwidth = event;
    jQuery(this.element).find('table').css('border-width', event + 'px');
  }
  onLinkChange(event: any) {
    jQuery(this.element).find('a').attr('data-link', event);
    let href = jQuery(this.element).find('a').attr('href');
    if (this.linkTo === 'email' && (href.search('subject') === -1)) {
      jQuery(this.element).find('a').attr('href', 'mailto:?subject=&body=');
    }
  }
  ngOnInit() {
    jQuery(function() {
      jQuery.FroalaEditor.DefineIcon('Smarty Tags', {NAME: 'tag'});
      jQuery.FroalaEditor.RegisterCommand('Smarty Tags', {
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
          this.html.insert(val);
        },
        refresh: function ($btn: any) {
        },
        refreshOnShow: function ($btn: any, $dropdown: any) {
        }
      });
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    let self = this;
      if (changes.TemplateEmail.currentValue === '' ) {
              console.log('no input in template');
        }else {
          let editorItems = jQuery(changes.TemplateEmail.currentValue).find('.xhEditorControlForDesign');
          jQuery.each(editorItems, function( index: any, value: any ) {
              console.log(jQuery(value),jQuery(value).attr('cntrl'));
              switch (jQuery(value).attr('cntrl')) {
                case  'Text':
                let cloneTextItem = jQuery('#origin').find('[data-module="text_item"]').clone();
                let TextValue = jQuery(value).find('.xhEditorTextCon');
                let textBgColor = jQuery(value).css('background-color');
                let textColor = jQuery(value).css('color');
                console.log(TextValue);
                cloneTextItem.find('[data-type="text"]').css('color', textColor);
                cloneTextItem.children().css('background-color', textBgColor);
                cloneTextItem.find('[data-type="text"]').html(TextValue);
                if (cloneTextItem.find('[data-type="text"] a').length > 0) {
                  cloneTextItem.find('[data-type="text"] a').addClass('anchorimg');
                  let anchorColor = jQuery(value).find('a').css('color');
                  cloneTextItem.find('[data-type="text"] a').css('color', anchorColor);
                }
                self.Drop(cloneTextItem);
                jQuery('#destination').append(cloneTextItem);
                break;
                case  'Image':
                let cloneImageItem = jQuery('#origin').find('[data-module="image_item"]').clone(true);
                let ImageValue = jQuery(value).find('.xhEditorImageCon');
                let posImg = ImageValue.find('.customImgBlock').css('text-align');
                console.log(posImg)
                let size = ImageValue.find('img').prop('style').width;
                console.log(ImageValue, size);
                let srcImg = ImageValue.find('img').attr('src');
                let imgBgColor = jQuery(value).css('background-color');
                cloneImageItem.find('img[data-from="one"]').attr('src', srcImg).siblings().remove();
                cloneImageItem.find('div[data-align]').css('text-align', posImg).attr('data-align', posImg);
                if(size === 'auto') {
                  size = '70%';
                }
                cloneImageItem.find('img[data-from="one"]').css('width', size);
                cloneImageItem.find('div[data-size]').attr('data-size', size);
                cloneImageItem.children().css('background-color', imgBgColor);
                self.Drop(cloneImageItem);
                jQuery('#destination').append(cloneImageItem);
                break;
                case  'ImageNText':
                case 'TextNImage' :
                let cloneImageNTextItem = jQuery('#origin').find('[data-module="image_text_item"]').clone(true);
                let ImageNTextValue = jQuery(value).find('.xhEditorTextNImgCon');
                let posImgText = ImageNTextValue.find('.customImgBlock').css('text-align');
                let srcImgText = ImageNTextValue.find('img').attr('src');
                let sizeImgText = ImageNTextValue.find('img').prop('style').width;
                let TextWithImg = ImageNTextValue.find('.EditableTextArea').html();
                let boxSizeLeftImg = ImageNTextValue.find('.customImgBlock').prop('style').width;
                let boxSizeRightText = ImageNTextValue.find('.EditableTextArea').parent().prop('style').width;
                let imgNTextBgColor = jQuery(value).css('background-color');
                let imgNTextColor = jQuery(value).css('color');
                cloneImageNTextItem.find('img[data-from="one"]').attr('src', srcImgText).siblings().remove();
                cloneImageNTextItem.find('td[data-align]').css('text-align', posImgText).attr('data-align', posImgText);
                cloneImageNTextItem.find('td[data-type="text"]').html(TextWithImg);
                if (cloneImageNTextItem.find('td[data-type="text"] a').length > 0) {
                  cloneImageNTextItem.find('td[data-type="text"] a').addClass('anchorimg');
                  let anchorColor = jQuery(value).find('a').css('color');
                  cloneImageNTextItem.find('[data-type="text"] a').css('color', anchorColor);
                }
                cloneImageNTextItem.find('td[data-type="image"]').css('width', boxSizeLeftImg);
                cloneImageNTextItem.find('td[data-type="text"]').css('width', boxSizeRightText);
                cloneImageNTextItem.children().css('background-color', imgNTextBgColor);
                cloneImageNTextItem.find('[data-type="text"]').css('color', imgNTextColor);
                console.log(boxSizeLeftImg)
                if(sizeImgText === 'auto') {
                  cloneImageNTextItem.find('img[data-from="one"]').css('width', '100%');
                }else {
                  cloneImageNTextItem.find('img[data-from="one"]').css('width', sizeImgText);
                }
                self.Drop(cloneImageNTextItem);
                jQuery('#destination').append(cloneImageNTextItem);
                break;
                case 'ImageNImage':
                let cloneImageImageItem = jQuery('#origin').find('[data-module="image_image_item"]').clone(true);
                let ImageImageValue = jQuery(value).find('.xhEditorImageNImgCon');
                let posImgLeft = ImageImageValue.find('.customImgBlock:first').css('text-align');
                console.log(posImgLeft);
                let sizeImgLeft = ImageImageValue.find('.customImgBlock:first img').prop('style').width;
                let sizeBoxImgLeft = ImageImageValue.find('.customImgBlock:first').prop('style').width;
                console.log(ImageImageValue, sizeImgLeft,sizeBoxImgLeft);
                let srcImgLeft = ImageImageValue.find('.customImgBlock:first img').attr('src');
                cloneImageImageItem.find('img[data-from="left"]').attr('src', srcImgLeft).siblings().remove();
                cloneImageImageItem.find('img[data-from="left"]').closest('td[data-align]').css('text-align', posImgLeft).attr('data-align', posImgLeft);
                cloneImageImageItem.find('img[data-from="left"]').closest('td[data-size]').css('width', sizeBoxImgLeft);
                cloneImageImageItem.find('img[data-from="left"]').css('width',sizeImgLeft);
                let posImgRight = ImageImageValue.find('.customImgBlock:last').css('text-align');
                let imgimgBgColor = jQuery(value).css('background-color');
                console.log(posImgRight);
                let sizeImgRight = ImageImageValue.find('.customImgBlock:last img').prop('style').width;
                let sizeBoxImgRight = ImageImageValue.find('.customImgBlock:last').prop('style').width;
                console.log(ImageImageValue, sizeImgRight,sizeBoxImgRight);
                let srcImgRight = ImageImageValue.find('.customImgBlock:last img').attr('src');
                cloneImageImageItem.find('img[data-from="right"]').attr('src', srcImgRight).siblings().remove();
                cloneImageImageItem.find('img[data-from="right"]').closest('td[data-align]').css('text-align', posImgRight).attr('data-align', posImgRight);
                cloneImageImageItem.find('img[data-from="right"]').closest('td[data-size]').css('width', sizeBoxImgRight);
                cloneImageImageItem.find('img[data-from="right"]').css('width',sizeImgRight);
                cloneImageImageItem.children().css('background-color', imgimgBgColor);
                self.Drop(cloneImageImageItem);
                jQuery('#destination').append(cloneImageImageItem);

                break;
                case 'CustomButton':
                let cloneButtonItem = jQuery('#origin').find('[data-module="button_item"]').clone(true);
                let ButtonValue = jQuery(value).find('.customButtonDvCL');
                let ButtonBgAreaBgColor = jQuery(value).css('background-color');
                cloneButtonItem.children().css('background-color', ButtonBgAreaBgColor);
                let ButtonTextColor = ButtonValue.find('a[customButton]').css('color');
                let ButtonBgColor = ButtonValue.find('a[customButton]').css('background-color');
                cloneButtonItem.find('a button').css('color', ButtonTextColor);
                cloneButtonItem.find('a button').css('background-color', ButtonBgColor);
                let ButtonHref = ButtonValue.find('a[customButton]').attr('href');
                cloneButtonItem.find('a').attr('href', ButtonHref);
                if(ButtonHref.indexOf('http://') >= 0){
                  cloneButtonItem.find('a').attr('data-link','web');
                }else{
                  cloneButtonItem.find('a').attr('data-link','email');
                }
                let ButtonText = ButtonValue.find('a[customButton]').html();
                cloneButtonItem.find('a button').html(ButtonText);
                self.Drop(cloneButtonItem);
                jQuery('#destination').append(cloneButtonItem);
                break;
                case 'Discount':
                break;
              }
          });
          // let editoptions = jQuery('.hover-btn').first().clone(false);
          // jQuery('[data-initial="false"]').append(editoptions);
        }
      }

  BackgroundColorChange(event: any) {
    this.backgroundcolor = event;
    if (jQuery(this.element).attr('data-module') === 'discount_item') {
      jQuery(this.element).find('table[data-coupon="true"]').css('background-color', event);
    }else {
      jQuery(this.element).children().css('background-color', event);
    }
  }

  TextColorChange(event: any) {
    this.textcolor = event;
    if (jQuery(this.element).attr('data-module') === 'discount_item') {
      jQuery(this.element).find('table[data-coupon="true"]').css('color', event);
    }else {
      jQuery(this.element).find('[data-type="text"]').css('color', event);
    }
  }
  LinkColorChange(event: any) {
    this.linkcolor = event;
    if (jQuery(this.element).find('[data-type="text"] a') === 'undefined') {
    }else {
      jQuery(this.element).find('[data-type="text"] a').css('color', event);
    }
  }
  BtnBgColorChange(event: any) {
    this.btnbackgroundcolor = event;
    if (jQuery(this.element).attr('data-module') === 'discount_item') {
      jQuery(this.element).find('#discountCouponBtn').css('background-color', event);
    }else {
      jQuery(this.element).find('a button').css('background-color', event);
    }
  }
  BtnTextColorChange(event: any) {
    if (jQuery(this.element).attr('data-module') === 'discount_item') {
      jQuery(this.element).find('#discountCouponBtn').css('color', event);
    }else {
      this.textcolor = event;
      jQuery(this.element).find('a button').css('color', event);
    }
  }
  onBtnTextChange(event: any) {
    jQuery(this.element).find('a button').html(event);
  }
  ModelChange(event: any) {
    let str = event;
    let res = str.replace('<p>', '').replace('</p>', '');
    jQuery(this.element).find('[data-type="text"]')
    .html(res).find('a').css('color', this.linkcolor).css('color', this.textcolor).css('background-color', this.backgroundcolor);
  }
  onWebAddChange(event: any) {
    jQuery(this.element).find('a').attr('href', event);
  }
  onEmailAddChange(event: any) {
    let href =  jQuery(this.element).find('a').attr('href');
    let newhref = href.replace(/mailto:.+subject/, 'mailto:' + event + '?subject');
    jQuery(this.element).find('a').attr('href', newhref);
  }
  onMsgSubChange(event: any) {
    let href =  jQuery(this.element).find('a').attr('href');
    let newhref = href.replace(/subject=.+body/, 'subject=' + event + '&body');
    jQuery(this.element).find('a').attr('href', newhref);
  }
  onMsgBodyChange(event: any) {
    let href =  jQuery(this.element.children).find('a').attr('href');
    let newhref = href.split('body=');
    jQuery(this.element).find('a').attr('href', newhref[0] + 'body=' + event);
  }
  UpdateEmailArray(event: any) {
    this.dataEmailArray = event;
  }
  TestEmails() {
    this.EmailArray = this.dataEmailArray;
    jQuery('#destination').find('a').removeAttr('disabled');
    jQuery('#email').find('.hover-btn').remove();
    let template = jQuery('#email').parent().html();
    this.TemplateWithEmail.emit({ email : this.EmailArray, Html : template});
    let editoptions = jQuery('.hover-btn').first().clone(false);
    jQuery('#destination').find('[data-initial="false"]').append(editoptions);
  }
  ColorPickerDisplay(event: any) {
    setTimeout(() => {
      let el = jQuery(event.target).parent().children('color-picker').find('.color-picker');
      el.find('.arrow').hide();
      el.css('position', 'fixed').css('top', '150px').css('left', '-230px').css('z-index', '1');
    }, 0 );
  }
  SelectCategory(event: any) {
    switch (this.category) {
      case '1': this.anniversary_category = true;
                this.birthday_category = false;
                this.christmas_category = false;
                break;
      case '2': this.anniversary_category = false;
                this.birthday_category = true;
                this.christmas_category = false;
                break;
      case'3':  this.anniversary_category = false;
                this.birthday_category = false;
                this.christmas_category = true;
                break;
    }
  }
  onAttachCoupon(discountCoupon: any) {
    this.discountCoupon = discountCoupon;
    jQuery(this.element).find('[data-coupon="false"]').remove();
    jQuery(this.element).find('[data-coupon="true"]').show();
    this.discountEdit = true;
    this.changeDetectorRef.detectChanges();
    this.DiscountSelectedId = discountCoupon.id;
    if (this.carousel !== undefined) {
      this.carousel.trigger('destroy.owl.carousel');
    }
    let owl = jQuery('.owl-carousel');
    this.carousel = owl;
    owl.owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      items: 1,
      dots: false,
      onInitialized: carouselInitialized
    });
    function carouselInitialized(event: any) {
      let self = this;
      let imgset = true;
      let DiscountImgSrc = jQuery('table[data-coupon="true"]').find('img').attr('src');
      let imgarray = jQuery('.owl-item').find('img');
      jQuery.each(imgarray, function( index: any, value: any ) {
        if (DiscountImgSrc === jQuery(value).attr('src')) {
              self.carousel.trigger('refresh.owl.carousel', ['initialized.owl.carousel', 100]);
              self.carousel.on('refreshed.owl.carousel', function(e: any) {
              self.carousel.trigger('to.owl.carousel', [index, 0]);
          });
          imgset = false;
          return;
        }
      });
      if (imgset && !jQuery('table[data-coupon="true"]').find('img').hasClass('none')) {
        let data = jQuery('#itemforclone').clone();
        self.carousel.trigger('refresh.owl.carousel', ['initialized.owl.carousel', 100]);
        self.carousel.on('refreshed.owl.carousel', function(e: any) {
          jQuery(data).find('img').attr('src', DiscountImgSrc);
          self.carousel.trigger('add.owl.carousel', [data, 0]);
          self.carousel.trigger('to.owl.carousel', [0, 0]);
        });
      }
      if ( jQuery('table[data-coupon="true"]').find('img').hasClass('none')) {
        jQuery('table[data-coupon="true"]').find('img').removeClass('none');
        let src = jQuery('.owl-item.active').find('img').attr('src');
        jQuery('table[data-coupon="true"]').find('img').attr('src', src);
      }
    }
    owl.on('translated.owl.carousel', function(event: any) {
      let src = jQuery('.owl-item.active').find('img').attr('src');
      jQuery('table[data-coupon="true"]').find('img').attr('src', src);
    });
  }
  createDiscountCoupon() {
    this.DiscountCouponCreate.emit();
  }
  CouponCreated(Coupon: any) {
    jQuery(this.element).find('[data-coupon="false"]').remove();
    jQuery(this.element).find('[data-coupon="true"]').show();
    this.discountEdit = true;
  }
  OnCustomDiscountImgAdd() {
    let self = this;
    let btn = jQuery('#customImageUrlAddBtn');
    let url = this.customDiscountImgURL ;
    let img = new Image();
    img.onerror = function() {
        alert(url + ' : ' + 'Image does not exist');
        btn.prop('disabled', false).text('Add');
      };
    img.onload =  function() {
        let data = jQuery('#itemforclone').clone();
        jQuery(data).find('img').attr('src', url);
        self.carousel.trigger('add.owl.carousel', [data, 0]);
        self.carousel.trigger('to.owl.carousel', [0, 100]);
        btn.prop('disabled', false).text('Add');
        let src = jQuery('.owl-item.active').find('img').attr('src');
        jQuery('table[data-coupon="true"]').find('img').attr('src', src);
      };
    img.src = url;
    btn.prop('disabled', true).text('Loading');
  }
  Drop(el: any) {
    let self = this;
              el.find('[data-initial="false"]').show();
              if (el.find('[data-coupon="false"]').length > 0) {
                el.find('[data-coupon="true"]').hide();
              }
              el.find('[data-initial="true"]').remove();
              el.removeClass('col-sm-6 justify-content-center');
              el.css('width', '100%');
              el.css('height', 'auto');
              if (el.hasClass('indestination')) {
                return;
              }else {
                el.addClass('indestination');
              }
              let id = el.attr('data-module');
              switch (id) {
                case 'text_item':
                  el.on('click', function(event: any){
                      self.TextItem(el, event);
                  });
                  break;
                case 'image_item':
                  el.on('click', function(event: any){
                          self.ImageItem(el, event);
                  });
                  break;
                case 'button_item':
                  el.on('click', function(event: any){
                          self.ButtonItem(el, event);
                  });
                  break;
                case 'image_text_item':
                case 'text_image_item':
                  el.on('click', function(event: any){
                          self.ImageTextItem(el, event);
                  });
                  break;
                case 'image_image_item':
                  el.on('click', function(event: any){
                          self.ImageImageItem(el, event);
                  });
                  break;
                case 'discount_item':
                  let dropped = jQuery('#destination').find('[data-module="discount_item"]').length;
                  if (dropped > 0) {
                    jQuery('[data-module="discount_item"]').find('[data-initial="true"]').hide();
                  }
                  el.on('click', function(event: any){
                      self.DiscountItem(el, event);
                  });
                  break;
                default:
                  break;
              }
  }
Bootbox(el: any) {
      bootbox.confirm({
        message: 'Do you want to remove?',
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
        callback: function (result: any) {
          if (result === true) {
            jQuery(el).remove();
          }
        }
      });
    }
TextItem(el: any, event: any) {
  let self = this;
      if (event.target.id === 'removeitem') {
        this.Bootbox(el);
      }else {
        jQuery('#rightModal').modal('toggle');
        self.initialtext = false;
        self.showtext = true;
        self.showimage = false;
        self.showbutton = false;
        self.showimagetext = false;
        self.showimageimage = false;
        self.showdiscountcoupon = false;
        self.content = jQuery(el).find('[data-type="text"]').html();
        self.element = el;
        self.backgroundcolor = jQuery(el).find('.item_element').css('background-color');
        self.textcolor = jQuery(el).find('.textitem').css('color');
        if (jQuery(el).find('a').css('color') === 'undefined') {
          self.linkcolor = '#0000EE';
        }else {
          if (jQuery(el).find('a').css('color') === undefined) {
          }else {
            self.linkcolor = jQuery(el).find('a').css('color');
          }
        }
      }
    }
ImageItem(el: any, event: any) {
  let self = this;
      if (event.target.id === 'removeitem') {
        this.Bootbox(el);
      }else {
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
        let element = jQuery(el).find('img[data-from="one"]');
        let src  = element.attr('src');
        let tooltip  = element.attr('title');
        jQuery('#preview_image').find('img').attr('src', src);
        let imgPos = element.closest('div[data-align]').attr('data-align');
        let imgSize = element.closest('div[data-align]').attr('data-size');
        let imgHref = element.closest('a[href]').attr('href');
        self.Titleimg = tooltip;
        self.Anchorimg = imgHref;
        self.selimgpos  = imgPos;
        self.imgFrom = 'null';
        self.selimgsize = imgSize;
      }
    }
ButtonItem(el: any, event: any) {
  let self = this;
      if (event.target.id === 'removeitem') {
        this.Bootbox(el);
      }else {
        jQuery('#rightModal').modal('toggle');
        self.initialtext = false;
        self.showtext = false;
        self.showimage = false;
        self.showbutton = true;
        self.showimagetext = false;
        self.showimageimage = false;
        self.showdiscountcoupon = false;
        self.element = el;
        jQuery(el).find('a.anchorbtn').click(function(e: any) {
          e.preventDefault();
          return false;
        });
        let ele = jQuery(el).children();
        self.backgroundcolor = ele.css('background-color');
        self.btnbackgroundcolor = ele.find('a button').css('background-color');
        self.textcolor = ele.find('a button').css('color');
        self.buttontext = ele.find('a button').html();
        self.linkTo = ele.find('a').attr('data-link');
        let href = ele.find('a').attr('href');
        if (self.linkTo === 'web' && href === '#') {
          self.webAdd = 'http://';
          self.emailAdd = '';
          self.emailSub = '';
          self.emailBody = '';
        }else if (self.linkTo === 'web' && href !== '#' && (href.search('subject') === -1)) {
          self.webAdd = href;
          self.emailAdd = '';
          self.emailSub = '';
          self.emailBody = '';
        }else if (self.linkTo === 'email' && href === '#') {
          self.webAdd = 'http://';
          self.emailAdd = '';
          self.emailSub = '';
          self.emailBody = '';
        }else {
          self.webAdd = 'http://';
          self.emailAdd = href.substring(href.indexOf(':') + 1, href.indexOf('?'));
          self.emailSub = href.substring(href.indexOf('subject=') + 8, href.indexOf('&'));
          self.emailBody = href.substring(href.indexOf('body=') + 5);
        }
      }
    }
ImageTextItem(el: any, event: any) {
  let self = this;
      if (event.target.id === 'removeitem') {
        this.Bootbox(el);
      }else {
        jQuery('#rightModal').modal('toggle');
        self.initialtext = false;
        self.showtext = false;
        self.showimage = false;
        self.showbutton = false;
        self.showimagetext = true;
        self.showimageimage = false;
        self.showdiscountcoupon = false;
        let elem = jQuery(el).find('[data-type="text"]');
        self.content = elem.html();
        self.element = jQuery(el);
        self.backgroundcolor = jQuery(el).children().css('background-color');
        self.textcolor = elem.css('color');
        if (elem.find('a').css('color') === 'undefined') {
          self.linkcolor = '#0000EE';
        }else {
          self.linkcolor = elem.find('a').css('color');
        }
        self.changeDetectorRef.detectChanges();
        let src  = jQuery(el).find('img[data-from="one"]').attr('src');
        jQuery('#preview_image_text').find('img').attr('src', src);
        let imgPos = jQuery(el).find('img').parent().attr('data-align');
        let imgSize =  jQuery(el).find('img').parent().attr('data-size');
        self.selimgpos  = imgPos;
        self.selimgsize = imgSize;
        let element = jQuery(el).find('img[data-from="one"]');
        let widthper =  element.parent().width() / element.parent().parent().width() * 100;
        self.selimgboxsize = Math.round(widthper).toString();
        self.imgFrom = 'withtext';
      }
    }
ImageImageItem(el: any, event: any) {
  let self= this;
      if (event.target.id === 'removeitem') {
        this.Bootbox(el);
      }else {
        jQuery('#rightModal').modal('toggle');
        self.initialtext = false;
        self.showtext = false;
        self.showimage = false;
        self.showbutton = false;
        self.showimagetext = false;
        self.showimageimage = true;
        self.showdiscountcoupon = false;
        self.element = jQuery(el);
        self.backgroundcolor = jQuery(el).children().css('background-color');
        self.changeDetectorRef.detectChanges();
        let eleleft =  jQuery(el).find('img[data-from="left"]');
        let srcleft  = eleleft.attr('src');
        jQuery('#preview_image_left').find('img').attr('src', srcleft);
        let imgPosleft = eleleft.parent().attr('data-align');
        let imgSizeleft = eleleft.parent().attr('data-size');
        self.selimgposleft  = imgPosleft;
        self.selimgsizeleft = imgSizeleft;
        let widthperleft =  eleleft.parent().width() / eleleft.parent().parent().width() * 100;
        self.selimgboxsizeleft = Math.round(widthperleft).toString();
        let eleright = jQuery(el).find('img[data-from="right"]');
        let srcright  = eleright.attr('src');
        jQuery('#preview_image_right').find('img').attr('src', srcright);
        let imgPosright = eleright.parent().attr('data-align');
        let imgSizeright = eleright.parent().attr('data-size');
        self.selimgposright  = imgPosright;
        self.selimgsizeright = imgSizeright;
        let widthperright =  eleright.parent().width() / eleright.parent().parent().width() * 100;
        self.selimgboxsizeright = Math.round(widthperright).toString();
      }
    }
DiscountItem(el: any, event: any) {
  let self = this;
      if (event.target.id === 'removeitem') {
        bootbox.confirm({
          message: 'Do you want to remove?',
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
          callback: function (result: any) {
            if (result === true) {
              jQuery(el).remove();
              jQuery('[data-module="discount_item"]').find('[data-initial="true"]').show();
              self.discountEdit = false;
            }
          }
        });
      }else {
        jQuery('#rightModal').modal('toggle');
        self.initialtext = false;
        self.showtext = false;
        self.showimage = false;
        self.showbutton = false;
        self.showimagetext = false;
        self.showimageimage = false;
        self.showdiscountcoupon = true;
        self.element = jQuery(el);
        if (jQuery(el).find('[data-coupon="true"]').is(':hidden')) {
          self.discountEdit = false;
          self.changeDetectorRef.detectChanges();
        }else {
          self.onAttachCoupon(self.discountCoupon);
        }
        let table =  jQuery(el).find('table');
        self.backgroundcolor = table.css('background-color');
        self.bordercolor = table.css('border-color');
        self.borderstyle = table.css('border-style');
        let border_width = table.css('border-width');
        self.borderwidth = border_width.replace('px', '');
        self.textcolor = table.css('color');
        self.btnbackgroundcolor = table.find('#discountCouponBtn').css('background-color');
        self.btntextcolor = table.find('#discountCouponBtn').css('color');
      }
    }
  ngAfterViewInit() {
    let self = this;

    jQuery('#destination').find('[data-module]').addClass('indestination');
    jQuery('[data-module="text_item"]:not(:has([data-initial="true"]))').on('click', function(event: any){
          self.TextItem(this, event);
    });
    jQuery('[data-module="image_item"]:not(:has([data-initial="true"]))').on('click', function(event: any){
          self.ImageItem(this, event);
    });
    jQuery('[data-module="button_item"]:not(:has([data-initial="true"]))').on('click', function(event: any){
          self.ButtonItem(this, event);
    });
    jQuery('[data-module="image_text_item"]:not(:has([data-initial="true"]))').on('click', function(event: any){
          self.ImageTextItem(this, event);
    });
    jQuery('[data-module="text_image_item"]:not(:has([data-initial="true"]))').on('click', function(event: any){
          self.ImageTextItem(this, event);
    });
    jQuery('[data-module="image_image_item"]:not(:has([data-initial="true"]))').on('click', function(event: any){
          self.ImageImageItem(this, event);
    });
    jQuery('#destination').find('[data-module="discount_item"]:not(:has([data-initial="true"]))').on('click', function(event: any){
          self.DiscountItem(this, event);
    });
    let editoptions = jQuery('.hover-btn').first().clone(false);
    jQuery('[data-initial="false"]').append(editoptions);
    jQuery('.anchorbtn').click(function(e: any) {
      e.preventDefault();
    });
    jQuery('.anchorimg').click(function(e: any) {
      e.preventDefault();
    });
    jQuery('#origin').find('[data-initial="false"]').hide();
    jQuery( '#destination' ).sortable({
      revert: true,
      start: function( event: any, ui: any ) {
        let clone = $(ui.item[0].outerHTML).clone();
        jQuery(ui.item).height('auto');
        jQuery(this).sortable('refreshPositions');
      },
      placeholder: {
            element: function(clone: any, ui: any) {
                return $(clone[0].innerHTML);
            },
            update: function() {
                return;
            }
        }
    });
    jQuery( '#origin .item' ).draggable({
      connectToSortable: '#destination',
      helper: 'clone',
      revert: 'invalid'
    });
    jQuery('#destination').droppable({
      drop: function( event: any, ui: any ) {
        let el = jQuery(ui.helper[0]) ;
        self.Drop(el);
      }
    });

    let phone = jQuery('#phone_1');
    let iframe = jQuery('#frame_1');
    jQuery(phone).css('width', '375px').css('height', '667px');
    jQuery( '#phones' ).on( 'click', function(evt: any) {
      let width;
      let height;
      if (evt.target.value === '1') {
        width = 375;
        height = 667;
      }
      if (evt.target.value === '2') {
        width = 400;
        height = 640;
      }
      if (evt.target.value === '3') {
        width = 320;
        height = 480;
      }
      if (evt.target.value === '4') {
        width = 360;
        height = 640;
      }
      if (evt.target.value === '5') {
        width = 768;
        height = 1024;
      }
      jQuery(phone).css('width', width + 'px');
      jQuery(phone).css('height', height + 'px');
    });
      jQuery(iframe).on('onload', function () {
        afterLoading();
      });
    function afterLoading() {
        jQuery(phone).addClass('phone view_2');
    }
  }
}
