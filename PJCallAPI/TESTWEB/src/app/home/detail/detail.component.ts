import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { TableService } from '../../services/table.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  tableId: any;
  Detail =[];
  errMsg:string;
  constructor(   private activatedRouter: ActivatedRoute,   private router: Router,private TableSV:TableService) { 

    this.activatedRouter.params.forEach(

      params => {
        this.tableId = params.id;
        //this.Form.controls['movieId'].setValue(this.movieId);
        // console.log(this.tableId);
      });
  }

  ngOnInit() {
    this.showProductDetail();
  }
  showProductDetail(){  
    this.TableSV.getOne(this.tableId)
    .subscribe(data=> this.Detail  = data,
     error => this.errMsg = error);
  }

}
