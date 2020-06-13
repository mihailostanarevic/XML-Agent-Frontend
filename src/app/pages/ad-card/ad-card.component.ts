import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.css']
})
export class AdCardComponent implements OnInit {
  @Input() result: any;
  @Input() page: string;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  seeInfo(ad: any) : void {
    this.router.navigateByUrl('dashboard/' + ad.adID + "/ad-details");
    localStorage.setItem("ad-detail", JSON.stringify(ad));
  }
}
