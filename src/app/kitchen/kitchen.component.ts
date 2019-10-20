import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {SkillingService} from "../skilling.service";
import {SkillForm} from "../skill_form";

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {


  dishes = [{name: "Dumplings (level 0)"}, {name: "Pasta (level 10)"}, {name: "Duck (level 30)"}];
  value = "dumpling";
  kitchenForm: SkillForm;

  constructor(
    private tokenStorage: TokenStorageService,
    private skillService: SkillingService) { }

  ngOnInit() {

  }

  onChange( value ) {
    this.value = value;
  }

  cook() {
    switch (this.value) {
      case "Pasta (level 10)" :
        this.value = "pasta";
        break;
      case "Duck (level 30)" :
        this.value = "duck";
        break;
      default:
        this.value = "dumpling";
    }

    this.kitchenForm = new SkillForm(this.tokenStorage.getUsername(), this.value);
    this.skillService.cook(this.kitchenForm).subscribe(
      data => {
        this.skillService.getData(this.tokenStorage.getUsername()).subscribe(
          data=> {
            this.tokenStorage.saveCash(data.cash);
            this.tokenStorage.saveHouse(data.house);
            this.tokenStorage.saveFame(data.fame);
            this.tokenStorage.saveStrength(data.strength);
            this.tokenStorage.saveDefence(data.defence);
            this.tokenStorage.saveCooking(data.cooking);
            this.tokenStorage.saveThieving(data.thieving);
            this.tokenStorage.saveCrafting(data.crafting);
            this.tokenStorage.saveBeverage(data.beverage);
            console.log(data.cash);
          }
        )
      }
    )
  }



}
