
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent  {
  visible: boolean = false;

  position: string = 'center';

  showDialog(position: string) {
      this.position = position;
      this.visible = true;
  }
}