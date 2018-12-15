import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TableService } from '../../services/table.service';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  tableId: any;
  itemType = [];
  errorMsg: "";
  Form: FormGroup;
  submitted = false;
  items: any;
  constructor(private builder: FormBuilder,
    private TableSV: TableService,
    private router: Router,
    private alertSV: AlertService,
    private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params.forEach(

      params => {
        this.tableId = params.id;
        //this.Form.controls['movieId'].setValue(this.movieId);
        // console.log(this.tableId);
      });

  }

  ngOnInit() {
    this.initialLoadData();
    this.initialCreateFromDate();
    this.initialUpdateFormData();
  }

  get validate() { return this.Form.controls; }

  private initialLoadData() {
    this.TableSV.GetType().subscribe(items => {
      this.itemType = items;
    });
  }

  private initialUpdateFormData() {
    if (!this.tableId) { return; }
    this.TableSV.getOne(this.tableId)
      .subscribe((data => {
        this.items = data;
        this.Form.controls['tableId'].setValue(this.items.tableId);
        this.Form.controls['tableName'].setValue(this.items.tableName);
        this.Form.controls['tableTypeId'].setValue(this.items.tableTypeId);
        this.Form.controls['tableDetail'].setValue(this.items.tableDetail);
        this.Form.controls['tablePrice'].setValue(this.items.tablePrice);
        this.Form.controls['tableImg'].setValue(this.items.tableImg);
      }));

  }

  private initialCreateFromDate() {
    this.Form = this.builder.group({
      tableName: ['', [Validators.required]],
      tablePrice: [, [Validators.required]],
      tableTypeId: [, [Validators.required]],
      tableDetail: ['', [Validators.required]],
      tableStatusId: [1],
      tableImg: ['', [Validators.required]],
      tableId: [0]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.Form.invalid) {
      return;
    }
    console.log(this.Form.value);
    if (this.Form.get('tableId').value === 0) {
      this.TableSV
        .CreateTable(this.Form.value)
        .then(res => {
          console.log(res);
          this.alertSV.notify('เพิ่มข้อมูลเรียบร้อยแล้ว', 'info')
          this.router.navigate(['/', 'home']);
        })
        .catch(err => this.errorMsg = err);
      if (this.errorMsg != null) {
        this.alertSV.notify('เกิดข้อผิดพลาด', 'error');
      }
    } //แก้ไข
    else if (this.tableId !== 0) {
      console.log(this.Form.get('tableId').value);
      this.TableSV
        .update(this.Form.get('tableId').value, this.Form.value)
        .then(res => {
          console.log(res);
          this.alertSV.notify('แก้ไขข้อมูลสำเร็จ', 'success');
          this.router.navigate(['/', 'home']);
        })
        .catch(err => this.errorMsg = err);
      if (this.errorMsg != null) {
        this.alertSV.notify('เกิดข้อผิดพลาด', 'error');
      }
    }
  }
}
