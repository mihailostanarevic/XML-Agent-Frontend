import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as CartActions from '../../../cart/store/cart.actions';
import { Car } from 'src/app/shared/car.model';
import { Ad } from 'src/app/shared/ad.model';
import { Agent } from 'src/app/shared/agent.model';
import { Address } from 'src/app/shared/address.model';
import { CreateAdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css'],
  styles: [
    `
      [nz-carousel-content] {
        text-align: center;
        height: 160px;
        line-height: 160px;
        background: #364d79;
        color: #fff;
        overflow: hidden;
      }

      h3 {
        color: #fff;
        margin-bottom: 0;
      }
    `
  ]
})
export class AdDetailsComponent implements OnInit {
  array = [1, 2, 3, 4];
  currentAd: any;
  visible = false;
  childrenVisible = false;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  vegetables = ['asparagus', 'bamboo', 'potato', 'carrot', 'cilantro', 'potato', 'eggplant'];

  constructor(private store: Store<fromApp.AppState>,
              private adService: CreateAdService) {}

  ngOnInit(): void {
    this.currentAd = JSON.parse(localStorage.getItem("ad-detail"));
    console.log(this.currentAd);

    this.adService.getAdImage(this.currentAd.ad.adID)
    .subscribe(
      res => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    });
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  openChildren(): void {
    this.childrenVisible = true;
  }

  closeChildren(): void {
    this.childrenVisible = false;
  }

  addToCart(): void {
    const car: Car = {
      id: this.currentAd.car.carID,
      model : this.currentAd.car.carModelName,
      brand : this.currentAd.car.carBrandName,
      carClass : this.currentAd.car.carClassName,
      fuelType : this.currentAd.car.fuelTypeType,
      tankCapacity : this.currentAd.car.fuelTypeTankCapacity,
      gas : this.currentAd.car.fuelTypeGas,
      gearshiftType: this.currentAd.car.gearshiftTypeType,
      gearshiftNumberOfGears: this.currentAd.car.getGearshiftTypeNumberOfGears
    }
    const locations = this.currentAd.agent.fullLocations;
    let addresses: Address[] = [];
    locations.forEach(location => {
      let address: Address = new Address(location.id, location.city, location.street, location.number);
      addresses.push(address);
    });
    const agent: Agent = {
      id: this.currentAd.agent.agentID,
      name: this.currentAd.agent.agentName,
      locations: addresses
    }
    const ad: Ad = {
      id: this.currentAd.ad.adID,
      photos: this.retrievedImage,
      dateFrom: "",
      dateTo: "",
      timeFrom: "",
      timeTo: "",
      pickUpAddressID: ""
    }
    this.store.dispatch(new CartActions.AddToCart({
       car: car,
       ad: ad,
       agent: agent
    }));
  }

}
