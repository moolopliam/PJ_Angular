import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableService } from '../services/table.service';
import { Table } from '../models/table';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ListTable =[];
  ErrorMSG="";
  sugarLevels: Array<Table>;
  constructor(private TableSV:TableService,private route:Router,  private alertSV: AlertService,) 
  {

   }

  ngOnInit() {
  
   this.initialLoadData();
  }

  private initialLoadData() {
    this.TableSV.GetTable().subscribe(items => {
        this.ListTable = items;
    });
}

delete(tableId) {
  const result = confirm('ยืนยันการลบ?');
  if (result) {
    this.TableSV
      .delete(tableId)
      .then(res => {
        this.alertSV.notify('ลบข้อมูลแล้ว', 'success');
       this.initialLoadData();
      })
      .catch(err => this.ErrorMSG = err);
  }
}
}
