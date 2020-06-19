import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  validateForm: FormGroup;
  isValid: boolean;

  private user: any;
  private id: any;

  constructor(private route: ActivatedRoute, private message: NzMessageService, private fb: FormBuilder, private router: Router, private reportService: ReportService) {}

  ngOnInit(): void {
    this.isValid = true;
    this.validateForm = this.fb.group({
      description: ['', [Validators.required]],
      kilometersTraveled: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
    this.setupUser();
    this.extractId();
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
  }

  private extractId(): void {
    this.id = this.route.snapshot.params.id;
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    {
      this.reportService.writeReport(this.validateForm.value, this.id).subscribe(() => {
        this.message.info('You have successfully written report.');
        this.router.navigateByUrl('dashboard/ads-which-need-report');
      }
        , error => {
        this.message.info(error.errror.message);
      }
      );
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
