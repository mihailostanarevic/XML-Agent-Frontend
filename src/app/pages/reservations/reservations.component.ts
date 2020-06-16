import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Store } from '@ngrx/store';
import * as fromApp from "../../store/app.reducer";


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  usersReservedRequests: any[] = [];
  userID: string;
  page: string = '"reservations"';

  constructor(private userService: UserService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    localStorage.setItem("page-leading-to-details", this.page);
    this.store.select("auth").subscribe(authData => {
      console.log(authData.user.id);
      this.userID = authData.user.id;
    });

    this.userService.getUsersReservedRequests(this.userID).subscribe(data => {
      this.usersReservedRequests = data;
      for(let result of data){
        let date = new Date(result.ad.creationDate[0],result.ad.creationDate[1],result.ad.creationDate[2]);
        result.ad["formattedDate"]= date.toString().substring(0,15);
      }
    })
  }
}
