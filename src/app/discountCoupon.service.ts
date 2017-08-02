import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions}
  from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DiscountCouponList } from './mock-discountCouponList';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class GetDiscountCouponService {
  // headers: Headers;
  // options: RequestOptions;

  getDiscountCouponList(TemplateId: any): Array<any> {
    return  DiscountCouponList;
  }

  // constructor(private http: Http) {
  //   this.headers = new Headers({ 'Content-Type': 'application/json',
  //     'Accept': 'q=0.8;application/json;q=0.9' });
  //   this.options = new RequestOptions({ headers: this.headers });
  // }
  // getDiscountCoupon(emailTemplateInfo: any): Observable<any> {
  //   let TemplateId = JSON.stringify(emailTemplateInfo);
  //   console.log(TemplateId);
  //   let self = this;
  //   return this.http
  //     .post(`http://localhost:55663/api/values`, TemplateId, self.options)
  //     .map(self.extractData)
  //     .catch(self.handleError);
  // }

//   private extractData(res: Response) {
//     let body = res.json();
//     return body || {};
//   }

//   private handleError(error: any) {
//     let errMsg = (error.message) ? error.message :
//       error.status ? `${error.status} - ${error.statusText}` : 'Server error';
//     console.error(errMsg);
//     return Observable.throw(errMsg);
//   }

}
