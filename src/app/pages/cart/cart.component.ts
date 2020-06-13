import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzButtonSize, NzMessageService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import * as fromApp from "../../store/app.reducer";
import { Cart } from './../../shared/cart.model';
import * as CartActions from '../../cart/store/cart.actions';
import { reduce } from 'rxjs/operators';

export interface RequestDTO {
  adID: string;
  customerID: string;
  pickUpDate: string;
  pickUpTime: string;
  returnDate: string;
  returnTime: string;
  pickUpAddress: string;
  bundle: boolean;
}

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    cartContent: Cart[];
    subscription: Subscription;
    dateFrom: Date;
    dateTo: Date;
    dates: Object;
    size: NzButtonSize = 'large';

    constructor(private store: Store<fromApp.AppState>,
                private message: NzMessageService) { }

    ngOnInit(): void {
      this.dates = {
        from : "",
        to: ""
      }
        this.subscription = this.store.select('cart').subscribe(cartItems => {
            this.cartContent = cartItems.cartContent;
        });
    }

    onChangeDate(result: Date, adID?: string): void {
      this.dateFrom = new Date(result[0]);
      this.dateTo = new Date(result[1]);
      this.formatDatesCorrectly(this.dateFrom.toISOString(),this.dateTo.toISOString());
      const timeFrom:string = this.dates["from"].split(" ")[0];
      const timeTo:string = this.dates["to"].split(" ")[0];
      const dateFrom:string =this.dates["from"].split(" ")[1];
      const dateTo:string = this.dates["to"].split(" ")[1];
      console.log(timeFrom + "-" +timeTo + ", " +dateFrom + "-" +dateTo);
      let index: number;
      this.store.select('cart').subscribe(content => {
        index = content.cartContent.findIndex(x => x.ad.id === adID);
      });

      this.store.dispatch(new CartActions.ChangeDateTime({
        id: adID,
        dateFrom: dateFrom,
        dateTo: dateTo,
        timeFrom: timeFrom,
        timeTo: timeTo,
        index: index
      }));
    }

    formatDatesCorrectly(date1 : string, date2 : string) : void {
      let timeFrom = date1.split('T')[1].substring(0,5);
      let timeTo = date2.split('T')[1].substring(0,5);
      let dateFrom = date1.split('T')[0];
      let dateTo = date2.split('T')[0];
      this.dates = {
        from : timeFrom + " " + dateFrom,
        to : timeTo + " " + dateTo,
      }
    }

    onOkDate(result: Date | Date[] | null, adID?: string): void {
      // console.log('onOk'+ result + ", id: " + adID);
    }

    sendRequest(): void {
      console.log('send request');
      let requestBody: RequestDTO[];
      let customerID: string;
      this.store.select('auth').subscribe(authData => {
        customerID = authData.user.id;
      });
      this.store.select('cart').subscribe(data => {
        data.cartContent.forEach(cart => {
          let requestDTO: RequestDTO;
          if(this.checkInputFields(cart)) {
            requestDTO.adID = cart.ad.id;
            requestDTO.customerID = customerID;
            requestDTO.pickUpDate = cart.ad.dateFrom;
            requestDTO.pickUpTime = cart.ad.timeFrom;
            requestDTO.returnDate = cart.ad.dateTo;
            requestDTO.returnTime = cart.ad.timeTo;
            requestDTO.bundle = false;      // promeniti ako treba kad se napravi lista request-ova
          } else {
            this.message.warning('Please fill all input fields.');
            return;
          }

          requestBody.push(requestDTO);
        });
      });

      console.log(requestBody[0].pickUpAddress);
    }

    // check whether input fields(date & address) is filled
    checkInputFields(cart: Cart): boolean {
      if(!cart.ad.dateFrom || !cart.ad.dateTo || !cart.ad.timeFrom || !cart.ad.timeTo || !cart.ad.pickUpAddressID) {
        return false;
      }
      return true;
    }

    changeAddress(event, adID: string): void {
      // console.log(event.srcElement.attributes[2].nodeValue);
      const addresClicked: string = event.srcElement.attributes[2].nodeValue;
      let index: number;
      this.store.select('cart').subscribe(content => {
        index = content.cartContent.findIndex(x => x.ad.id === adID);
      });
      this.store.dispatch(new CartActions.ChangeAddress({
        index: index,
        address:addresClicked
      }));
    }
}
