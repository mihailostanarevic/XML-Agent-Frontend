import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { CarAccessoriesService } from 'src/app/services/car-accessories.service';
import { CarAccessory } from 'src/app/shared/carAccessory.model';
import { NzMessageService } from 'ng-zorro-antd';
import { MessageService } from 'src/app/services/message.service';
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
  previousPage: string;
  visible:boolean;
  childrenVisible: boolean;
  possibleAccessories: CarAccessory[] = [];
  carAccessories: CarAccessory[] = [];
  selectedCarAccessories: CarAccessory[] = [];
  text: string;
  userID: string;

  constructor(private store: Store<fromApp.AppState>,private carAccessoriesService:CarAccessoriesService, private carService:CarService, private message:NzMessageService, private messageService: MessageService) {}

  constructor(private store: Store<fromApp.AppState>,
              private adService: CreateAdService) {}

  ngOnInit(): void {
    this.previousPage = JSON.parse(localStorage.getItem("page-leading-to-details"));
    console.log(this.previousPage);
    this.currentAd = JSON.parse(localStorage.getItem("ad-detail"));
    console.log(this.currentAd);

    this.adService.getAdImage(this.currentAd.ad.adID)
    .subscribe(
      res => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    });
    this.visible = false;
    this.childrenVisible = false;
    this.carService.getCarAccessories(this.currentAd.car.carID).subscribe( data => {
      this.carAccessories = data;
    })

    this.carAccessoriesService.getAllAccessories().subscribe( data => {
      for(let item of data){
        let found = false;
        this.carAccessories.forEach(carAccessory => {
          if(carAccessory["id"] === item["id"]){
            found = true;
          }
        })

        if(!found){
          let ca:CarAccessory = new CarAccessory(item["id"], null, item["description"]);
          this.possibleAccessories.push(ca);
        }
      }
    })
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

  addAccessory(accessory: CarAccessory){
    console.log(accessory);
    this.carAccessories.push(accessory);
    this.selectedCarAccessories.push(accessory);
    this.possibleAccessories.splice(this.possibleAccessories.indexOf(accessory), 1)
  }

  removeAccessoryAdded(accessory: CarAccessory){
    if(this.selectedCarAccessories.length === 0){
      this.message.info("You can only remove equipment you previously selected");
    }

    this.selectedCarAccessories.forEach(element => {
      if(accessory.id === element.id){
        this.selectedCarAccessories.splice(this.selectedCarAccessories.indexOf(accessory),1);
        this.carAccessories.splice(this.carAccessories.indexOf(accessory),1);
        this.possibleAccessories.push(accessory);
      }else {
        this.message.info("You can only remove equipment you previously selected");
      }
    })
  }

  changeText($event): void {
    this.text = $event.target.value;
  }

  sendMessage(): void {

    this.store.select("auth").subscribe(authData => {
      console.log(authData.user.id);
      this.userID = authData.user.id;
    });

    let list: string[] = [];
    this.selectedCarAccessories.forEach( accessory => {
      list.push(accessory.id);
    })
    const body = {
      text: this.text,
      sender: this.userID,
      receiver: this.currentAd.agent.agentID,
      ad: this.currentAd.ad.adID,
      accessories: list
    }

    this.messageService.sendMessage(body).subscribe(data => {});
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
