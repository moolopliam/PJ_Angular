import { Injectable } from '@angular/core';
declare const $: any;
declare const swal: any;
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  notify(message: string, type: string) {
    $.notify(message,type);
}



confirm(message: string = 'คุณต้องการจะลบข้อมูล?'): Promise<any> {
  return swal(message, {
      buttons: ["ยกเลิก", "ยืนยัน"],
      dangerMode: true
  });
}
}
