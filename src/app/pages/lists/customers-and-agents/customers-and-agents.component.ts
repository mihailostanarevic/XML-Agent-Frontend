import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customers-and-agents',
  templateUrl: './customers-and-agents.component.html',
  styleUrls: ['./customers-and-agents.component.css']
})
export class CustomersAndAgentsComponent implements OnInit {

  listOfData = [];

  constructor(private router: Router, private message: NzMessageService, private userService: UserService) { }

  ngOnInit(): void {
    this.setupData();
  }

  private setupData(): void {
    this.userService.getCustomersAndAgents().subscribe(data => {
      this.listOfData = data;
    });
  }

  delete(id, username): void {
    this.userService.deleteCustomerOrAgent(id).subscribe(() => {
      this.message.info('You have successfully deleted ' + username +'.');
      this.setupData();
    });
  }
}
