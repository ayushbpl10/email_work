import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {GetDiscountCouponService} from './discountCoupon.service';
declare var moment: any;
declare var jQuery: any;
@Component({
    selector: 'discountCouponList',
    templateUrl: './discountCouponList.component.html'
})

export class DiscountCouponListComponent implements OnInit {

    @Output() AttachedCoupon = new EventEmitter();

    _discountCouponList: Array<any> = [];
    constructor(private discountCouponService: GetDiscountCouponService) {}

    ngOnInit() { }

    open(TemplateID: any) {
        console.log(TemplateID);
        this._discountCouponList = this.discountCouponService.getDiscountCouponList(TemplateID);

        for (let _discountCoupon of this._discountCouponList) {
        let current = moment();
        let duration = moment.duration(current.diff(_discountCoupon['createdOn']));
        let mins = duration.asMinutes();
        let hours = duration.asHours();
        let days = duration.asDays();
        let months = duration.asMonths();
        let years = duration.asYears();
        if (mins < 60 && hours < 1 && days < 1 && months < 1 && years < 1 ) {
            _discountCoupon['createdDifference'] = 'Created ' + Math.floor(mins).toString() + ' minutes ago';
            }else if (mins > 60 && hours < 24 && days < 1 && months < 1 && years < 1) {
            _discountCoupon['createdDifference'] = 'Created ' + Math.floor(hours).toString() + ' hours ago';
            }else if (mins > 60 && hours > 24 && days < 31 && months < 1 && years < 1) {
            _discountCoupon['createdDifference'] = 'Created ' + Math.floor(days).toString() + ' days ago';
            }else if (mins > 60 && hours > 24 && days > 31 && months < 12 && years < 1) {
            _discountCoupon['createdDifference'] = 'Created ' + Math.floor(months).toString() + ' months ago';
            }else if (mins > 60 && hours > 24 && days > 31 && months > 12 && years < 200) {
            _discountCoupon['createdDifference'] = 'Created ' + Math.floor(years).toString() + ' years ago';
            }
        }

        jQuery('#CouponModal').modal('toggle');
    }

    onAttachCoupon(discountCoupon: any) {
        this.AttachedCoupon.emit(discountCoupon);
    }
    onPreviewClick() {
        console.log('preview clicked');
    }
}
