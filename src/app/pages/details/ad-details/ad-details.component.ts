import { Component, OnInit } from '@angular/core';

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

  vegetables = ['asparagus', 'bamboo', 'potato', 'carrot', 'cilantro', 'potato', 'eggplant'];

  constructor() {}

  ngOnInit(): void {
    this.currentAd = JSON.parse(localStorage.getItem("ad-detail"));
    console.log(this.currentAd);
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

 

}
