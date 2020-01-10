import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../_services/token-storage.service";

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.tokenStorage.updateDataAndInventory();
  }

}
