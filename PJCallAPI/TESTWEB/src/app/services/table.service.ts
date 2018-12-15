import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Table } from '../models/table';
import { TypeTable } from '../models/table';

@Injectable({
  providedIn: 'root'
})
export class TableService {


  private URL = 'https://localhost:44316/api/Tmookathas';

  private URLTABLE  = 'https://localhost:44316/api/ttypes';
  constructor(private http: HttpClient) {

  }
  delete(data:any) {
 
    const promise = new Promise((resolve, reject) => {
      this.http.delete(this.URL+'/'+data)
        .toPromise()
        .then(
          res => {
            console.log(res);
            resolve(data);
          }
        );
    });
    console.log(data);
    return promise;
  }
  update(id,data) {
    const promise = new Promise((resolve, reject) => {
    const api = this.URL;
      this.http.put(api+'/'+id,data)
        .toPromise()
        .then(
          res => {
            console.log(res);
            resolve(id);
          }
        );
      });
      return promise;
  }
  getOne(id){
    return this.http.get<Table[]>(this.URL+'/'+id);
  }
  GetTable() {

    return this.http.get<Table[]>(this.URL);
  }
  GetType(){
    return this.http.get<TypeTable[]>(this.URLTABLE);
  }

  CreateTable(table)
  {
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.URL, table)
        .toPromise()
        .then(
          res => {
            //sec
            //this.router.navigate(['/', 'home']);
            console.log(res);
            resolve(table);
          }
        );
      });
     return promise;
  }


}
