import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../_services/token-storage.service";
import {SkillingService} from "../_services/skilling.service";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor(
    public tokenService: TokenStorageService,
    public skillService: SkillingService,
  ) { }

  ngOnInit() {
  }

}
