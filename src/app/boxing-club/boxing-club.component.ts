import { Component, OnInit } from '@angular/core';
import {SkillingService} from "../skilling.service";
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-boxing-club',
  templateUrl: './boxing-club.component.html',
  styleUrls: ['./boxing-club.component.css']
})
export class BoxingClubComponent implements OnInit {

  constructor(private skillService: SkillingService, private tokenService: TokenStorageService) { }

  ngOnInit() {
  }


  trainStrength() {
    this.skillService.trainStrength(this.tokenService.getUsername()).subscribe(data=> {

    })
  }

  trainDefence() {
    this.skillService.trainDefence(this.tokenService.getUsername()).subscribe(data=> {

    })
  }
}
