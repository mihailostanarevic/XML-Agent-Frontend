import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  page:string;
  constructor() { }

  ngOnInit(): void {
    this.page = "reservations";
  }

}
