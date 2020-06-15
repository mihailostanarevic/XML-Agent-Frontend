import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { CarAccessoriesService } from 'src/app/services/car-accessories.service';
import { CarAccessory } from 'src/app/shared/carAccessory.model';
import { NzMessageService } from 'ng-zorro-antd';
import { MessageService } from 'src/app/services/message.service';
import { User } from 'src/app/shared/user.model';
import { Store } from '@ngrx/store';
import * as fromApp from "../../../store/app.reducer";

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
  page: string;
  visible:boolean;
  childrenVisible: boolean;
  possibleAccessories: CarAccessory[] = [];
  carAccessories: CarAccessory[] = [];
  selectedCarAccessories: CarAccessory[] = [];
  text: string;
  userID: string;

  constructor(private store: Store<fromApp.AppState>,private carAccessoriesService:CarAccessoriesService, private carService:CarService, private message:NzMessageService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.page = 'ad-detail-reservation';
    this.currentAd = JSON.parse(localStorage.getItem("ad-detail"));
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
          let ca:CarAccessory = new CarAccessory(item["id"], item["description"]);
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
    //console.log(body);
    this.messageService.sendMessage(body).subscribe(data => {

    });
  }
}
