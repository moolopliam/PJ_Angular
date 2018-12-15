import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 
  constructor(private CustomerSV: CustomerService, private builder: FormBuilder, 
     private router: Router,
     private alertSV: AlertService,
     private activatedRouter: ActivatedRoute) 
     { 
      
     }
  errorMsg: string;
  Form: FormGroup;
  submitted = false;
  ngOnInit() {
    this.initialCreateFromDate();
  }

  get validate() { return this.Form.controls; }


  private initialCreateFromDate() {
  this.Form = this.builder.group({
    cusPassWord: ['', Validators.required],
    titleId: [, Validators.required],
    cusName: ['', Validators.required],
    cusLastName: ['', Validators.required],
    cusPhone: ['', Validators.required],
    cusTambon: ['', Validators.required],
    cusAunper: ['', Validators.required],
    cusCanghwad: ['', Validators.required],
    cusTypeUserId:[1],
    cusCardId: ['',Validators.required],
    customerId:['',Validators.required]
  });
}

  onSubmit() {
    this.submitted = true;
    if (this.Form.invalid) {
        return;
    }

      console.log(this.Form.value);
      this.CustomerSV
        .CreateCustomer(this.Form.value)
        .then(res => {
          this.alertSV.notify('เพิ่มข้อมูลเรียบร้อยแล้ว', 'success')
          this.router.navigate(['/', 'home']);
        })
        .catch(err => this.errorMsg = err);   
        if(this.errorMsg != null){
          this.alertSV.notify('เกิดข้อผิดพลาด', 'error');
          }
  }

}
