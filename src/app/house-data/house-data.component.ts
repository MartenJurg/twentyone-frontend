import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {SkillingService} from "../skilling.service";

@Component({
  selector: 'app-house-data',
  templateUrl: './house-data.component.html',
  styleUrls: ['./house-data.component.css']
})
export class HouseDataComponent implements OnInit {
  house = "0";

  constructor( private tokenService: TokenStorageService, private skillsService: SkillingService) { }

  ngOnInit() {
    this.house = this.tokenService.getHouse();
  }

  upgradeHouse() {
    this.skillsService.upgradeHouse(this.tokenService.getUsername()).subscribe(data=> {

    })
  }

}
