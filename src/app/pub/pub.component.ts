import { Component, OnInit } from '@angular/core';
import {SkillForm} from "../skill_form";
import {TokenStorageService} from "../auth/token-storage.service";
import {SkillingService} from "../skilling.service";

@Component({
  selector: 'app-pub',
  templateUrl: './pub.component.html',
  styleUrls: ['./pub.component.css']
})
export class PubComponent implements OnInit {

  beverages = [{name: "Water (level 0)"}, {name: "Apple Juice (level 10)"}, {name: "Gin Tonic (level 30)"}];
  value = "water";
  pubForm: SkillForm;
  errorMessage: string;
  servingFailed = false;


  constructor(
    private tokenService : TokenStorageService,
    private skillService : SkillingService
  ) { }

  ngOnInit() {
  }

  onChange( value ) {
    this.value = value;
  }

  serve() {
    switch (this.value) {
      case "Apple Juice (level 10)" :
        this.value = "applejuice";
        break;
      case "Gin Tonic (level 30)" :
        this.value = "gintonic";
        break;
      default:
        this.value = "water";
    }

    this.pubForm = new SkillForm(this.tokenService.getUsername(), this.value);
    this.skillService.serve(this.pubForm).subscribe(
      data => {
        this.skillService.getData(this.tokenService.getUsername()).subscribe(
          data => {
            this.tokenService.saveCash(data.cash);
            this.tokenService.saveHouse(data.house);
            this.tokenService.saveFame(data.fame);
            this.tokenService.saveStrength(data.strength);
            this.tokenService.saveDefence(data.defence);
            this.tokenService.saveCooking(data.cooking);
            this.tokenService.saveThieving(data.thieving);
            this.tokenService.saveCrafting(data.crafting);
            this.tokenService.saveBeverage(data.beverage);
            this.servingFailed = false;
          }
        )
      }, error => {
        this.servingFailed = true;
        this.errorMessage = "Serving failed!"
    }
    )
  }

}
