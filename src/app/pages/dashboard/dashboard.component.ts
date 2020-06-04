import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private user: any;
  public isAdmin: boolean;
  public isAgent: boolean;
  public isSimpleUser: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupUserRole();
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  } 

  private setupUserRole(): void {
    if(this.user.userRole === 'ADMIN_ROLE'){
        this.isAdmin = true;
        this.isAgent = false;
        this.isSimpleUser = false;
    }else if(this.user.userRole === 'AGENT_ROLE'){
      this.isAdmin = false;
      this.isAgent = true;
      this.isSimpleUser = false;
    }else if(this.user.userRole === 'SIMPLE_USER_ROLE'){
      this.isAdmin = false;
      this.isAgent = false;
      this.isSimpleUser = true;
  }
  }

  registerNewAgent(): void {
    this.router.navigateByUrl('dashboard/agent-registration');
  }

  registrationRequests(): void {
    this.router.navigateByUrl('dashboard/registration-requests');
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('auth/login');
  }

  carBrands(): void {
    this.router.navigateByUrl('dashboard/car-brands');
  }

  carClasses(): void {
    this.router.navigateByUrl('dashboard/car-classes');
  }

  carModels(): void {
    this.router.navigateByUrl('dashboard/car-models');
  }

  gearshiftTypes(): void {
    this.router.navigateByUrl('dashboard/gearshift-types');
  }

  fuelTypes(): void {
    this.router.navigateByUrl('dashboard/fuel-types');
  }

  createCarBrand(): void {
    this.router.navigateByUrl('dashboard/car-brand');
  }

  createCarClass(): void {
    this.router.navigateByUrl('dashboard/car-class');
  }

  createCarModel(): void {
    this.router.navigateByUrl('dashboard/car-model');
  }

  createGearshiftType(): void {
    this.router.navigateByUrl('dashboard/gearshift-type');
  }

  createFuelType(): void {
    this.router.navigateByUrl('dashboard/fuel-type');
  }
}
