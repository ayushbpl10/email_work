import {Component, OnInit} from '@angular/core';
import {EmailTemplateService} from './emailTemplate.service'
@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
  errorMessage: any;
  createdCoupon: any ={};
  constructor(private _emailService: EmailTemplateService) {
  }

  ngOnInit() {
  }

DiscountArray :  Array<any> = [
  {"id":46214,"type":"DISCOUNT","category":"BASIC","code":"mm123","title":"20 off at Spa","description":"","imageUrl":"","discountValue":20,"discountType":"PERCENTAGE","minimumOrderAmount":0,"appliesOnService":[],"appliesOnStaff":[],"appliesOnClient":{"id":0,"name":null},"startDateTime":"2017-07-11T00:00:00","endDateTime":"2017-07-11T00:00:00","expiresOn":"2050-01-01T00:00:00","byday":[],"appliesOnFirstBookingPerUser":false,"appliesOncePerUser":false,"usageLimit":0,"timesUsed":0,"isEnabled":true,"createdOn":"2017-07-11T14:16:00"},
  {"id":46215,"type":"DISCOUNT","category":"BASIC","code":"rrtt101","title":"0 off at Spa","description":"","imageUrl":"","discountValue":20,"discountType":"PERCENTAGE","minimumOrderAmount":0,"appliesOnService":[],"appliesOnStaff":[],"appliesOnClient":{"id":0,"name":null},"startDateTime":"2017-07-11T00:00:00","endDateTime":"2017-07-11T00:00:00","expiresOn":"2050-01-01T00:00:00","byday":[],"appliesOnFirstBookingPerUser":false,"appliesOncePerUser":false,"usageLimit":0,"timesUsed":0,"isEnabled":true,"createdOn":"2017-07-11T14:16:00"},
  {"id":45410,"type":"DISCOUNT","category":"BASIC","code":"1cag558","title":"30 % Off on For Online Classes, (Google Video Chat), B-Complex ( B1, B2, B3, B5, B6, Biotin And Folic Acid ) at Skills Lagoon Pte. Ltd.","description":"","imageUrl":"http://rahul55.appointy.com/admin/Promote/Promote20/Images/Discounts.jpg","discountValue":30,"discountType":"PERCENTAGE","minimumOrderAmount":0,"appliesOnService":[{"id":128333,"name":"For Online Classes, (Google Video Chat)"},{"id":174196,"name":"B-Complex ( B1, B2, B3, B5, B6, Biotin And Folic Acid )"}],"appliesOnStaff":[],"appliesOnClient":{"id":0,"name":null},"startDateTime":"2017-02-18T00:00:00","endDateTime":"2017-02-18T23:59:00","expiresOn":"2050-01-01T00:00:00","byday":[],"appliesOnFirstBookingPerUser":false,"appliesOncePerUser":false,"usageLimit":0,"timesUsed":0,"isEnabled":true,"createdOn":"2017-02-18T09:33:00"}
  ]

  onTemplateSave(event: any){
    console.log(event);
  }

  onTemplateWithEmail(event :  any){
    console.log(event["Html"]);
    console.log(event["email"][0]);
    this.emailToBackEnd(event);

  }
  emailToBackEnd(emailinfo: any) {

    this._emailService.sendEmail(emailinfo).subscribe(
      result => console.log(result),
      error => {
        console.log(error);
        this.errorMessage = <any>error;
      }
    );
  }

  createCoupon(){
    this.createdCoupon  = {"id":46214,"type":"DISCOUNT","category":"BASIC","code":"mm123","title":"20 off at Spa","description":"","imageUrl":"","discountValue":20,"discountType":"PERCENTAGE","minimumOrderAmount":0,"appliesOnService":[],"appliesOnStaff":[],"appliesOnClient":{"id":0,"name":null},"startDateTime":"2017-07-11T00:00:00","endDateTime":"2017-07-11T00:00:00","expiresOn":"2050-01-01T00:00:00","byday":[],"appliesOnFirstBookingPerUser":false,"appliesOncePerUser":false,"usageLimit":0,"timesUsed":0,"isEnabled":true,"createdOn":"2017-07-11T14:16:00"};
  }

}
