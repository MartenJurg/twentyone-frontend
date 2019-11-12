import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {SkillingService} from "../skilling.service";

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
