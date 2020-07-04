import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { PriceListService } from 'src/app/services/price-list.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  validateForm: FormGroup;
  isValid: boolean;

  private user: any;
  private id: any;

  isUpdate: boolean;

  constructor(private route: ActivatedRoute, private message: NzMessageService, private fb: FormBuilder, private router: Router, private priceListService: PriceListService) {}

  ngOnInit(): void {
    this.isValid = true;
    this.validateForm = this.fb.group({
      price1day: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      price7days: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      price15days: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      price30days: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
    this.setupUser();
    this.isUpdate = false;
    if(this.route.snapshot.params.id != undefined){
      this.getDetails();
    }
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
  }

  private getDetails(): void {
    this.isUpdate = true;
    this.priceListService.getPriceListByAgent(this.user.id).subscribe(data =>{
      const formValues = {
        price1day: data.price1day,
        price7days: data.price7days,
        price15days: data.price15days,
        price30days: data.price30days
      }
      this.validateForm.setValue(formValues);
    })
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    {
      const body = {
        ...this.validateForm.value,
        agentId: this.user.id
      }
      if(!this.isUpdate){
        this.priceListService.createPriceList(body).subscribe(() => {
          this.message.info('You have successfully created price list for your ads.');
          this.router.navigateByUrl('dashboard');
        }, error => {
          this.message.info(error.errror.message);
        });
      }else{
        this.priceListService.updatePriceList(body).subscribe(() => {
          this.message.info('You have successfully updated price list for your ads.');
          this.router.navigateByUrl('dashboard');
        }, error => {
          this.message.info(error.errror.message);
        });
      }
      
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.rePassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }
}
