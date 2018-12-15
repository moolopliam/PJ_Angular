import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public URL: string = 'https://localhost:44316/api/Tcustomers';
  constructor(  private router: Router,private http: HttpClient) {

  }

  GetCustomer() {

    return this.http.get<Customer[]>(this.URL);
  }
  getOneCustomer(personID) {
    return this.http.get<Customer[]>(this.URL  + personID);
  }


  CreateCustomer(tcustomer)
  {
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.URL, tcustomer)
        .toPromise()
        .then(
          res => {
            //sec
            //this.router.navigate(['/', 'home']);
            console.log(res);
            resolve(tcustomer);
          }
        );
      });
      return promise;
  }
}
