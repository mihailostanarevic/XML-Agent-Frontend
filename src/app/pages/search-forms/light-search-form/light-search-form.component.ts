import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { RequestService } from 'src/app/services/request.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { CarBrandComponent } from '../../create-forms/car-brand/car-brand.component';

@Component({
  selector: 'app-light-search-form',
  templateUrl: './light-search-form.component.html',
  styles: [
    `
      nz-range-picker{
        margin: 0 8px 12px 0;
      }
    `
  ],
  styleUrls: ['./light-search-form.component.css']
})
export class LightSearchFormComponent implements OnInit {
  city: String;
  dateFrom : Date;
  dateTo : Date;
  dates: Object;
  validateForm: FormGroup;
  showResults: Boolean;
  searchResults: Object[];
  isVisible : Boolean;
  addressList : Object[];
  pickUpAddress: String;

  constructor(private router: Router, private searchService: SearchService, private requestService: RequestService, private message: NzMessageService, private fb: FormBuilder) {} 

  ngOnInit(): void {
    this.page = "search";
    this.dates = {
      from : "",
      to: ""
    }
    this.showResults = false;
    this.validateForm = this.fb.group({
      city: [null, [Validators.required]],
      dates: [null, [Validators.required]]
    });
    this.searchResults = [];
    this.isVisible = false;   //modalni dijalog za izbor pickup adrese
    this.addressList = [];
    this.pickUpAddress ="";
  }

  onChange(result: Date[]): void {
    this.dateFrom = new Date(result[0]);
    this.dateTo = new Date(result[1]);
    this.formatDatesCorrectly(this.dateFrom.toISOString(),this.dateTo.toISOString());
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

  submitSearch() : void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    let data = {
      city: this.city,
      from: this.dates["from"],
      to: this.dates["to"]
    }

    this.searchService.lightSearch(data).subscribe(data => {
      this.showResults = true;
      this.searchResults = data;
      if(data.length > 0){
        for(let result of data){
          let date = new Date(result.ad.creationDate[0],result.ad.creationDate[1],result.ad.creationDate[2]);
          result.ad["formattedDate"]= date.toString().substring(0,15);
        }
        this.message.info('Your search came back with ' + data.length + ' results');
      }else {
        this.message.info('Unfortunately our search found 0 results for your search, try again with new parameters');
      }
    })
  }

  backToSearch() : void {
    //this.city = "";
    this.showResults = false;
  }


  seeInfo(ad: any) : void {
    this.router.navigateByUrl('dashboard/' + ad.adID + "/ad-details");
    localStorage.setItem("ad-detail", JSON.stringify(ad));
  }

  reserveAdNow(ad :any) :void {  //agent rezervise oglas->otvara mu se modalni dijalog za izbor tacne adrese
        console.log(ad.agent.fullLocations);
        this.isVisible = true;
        this.addressList = ad.agent.fullLocations;  
 }

  RowSelected(selectAddress){
        console.log(selectAddress.id);
        this.pickUpAddress = selectAddress.id;
  }


  handleOk(ad:any): void {
        console.log('Button ok clicked!');

        if(this.pickUpAddress === ""){
            this.message.info('You must choose address.');
        }else{
            let dateAndTimeFrom = this.dates["from"];
            let dateAndTimeTo = this.dates["to"];

            let data = {                 //RequestDAO
              adID : ad.ad.adID,
              customerID : ad.agent.agentID,
              pickUpDate : dateAndTimeFrom.split(" ")[1],
              pickUpTime : dateAndTimeFrom.split(" ")[0],
              returnDate : dateAndTimeTo.split(" ")[1],
              returnTime :  dateAndTimeTo.split(" ")[0],
              pickUpAddress : this.pickUpAddress,
              bundle : false
            }

            console.log(data);
            this.isVisible = false;

            this.requestService.updateCarAvailability(data).subscribe(data =>{
                    console.log(data);
                    this.message.info('You have successfully reserved ad.');
            })
        }
      
  }


  handleCancel(): void {
        console.log('Button cancel clicked!');
        this.isVisible = false;
  }



}


