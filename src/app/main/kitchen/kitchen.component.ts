import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../_services/token-storage.service";
import {SkillingService} from "../../_services/skilling.service";
import {SkillForm} from "../../_pojos/skill_form";

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {


  dishes = [{name: "Dumplings (level 0)"}, {name: "Pasta (level 10)"}, {name: "Duck (level 30)"}];
  value = "dumpling";
  valueToBack = "";
  message = "";
  message2 = "";
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
        this.valueToBack = "pasta";
        break;
      case "Duck (level 30)" :
        this.valueToBack = "duck";
        break;
      default:
        this.valueToBack = "dumpling";
    }

    this.kitchenForm = new SkillForm(this.tokenStorage.getUsername(), this.valueToBack);
    this.skillService.cook(this.kitchenForm).subscribe(
      data => {
        this.tokenStorage.updateData();
        this.message = data.message;
        switch (this.valueToBack) {
          case "dumpling":
            this.message2 = "You earned 5 cash";
            this.tokenStorage.saveCash((Number(this.tokenStorage.getCash()) + 5).toString());
            break;
          case "pasta":
            this.message2 = "You earned 20 cash";
            this.tokenStorage.saveCash((Number(this.tokenStorage.getCash()) + 20).toString());
            break;
          case "duck":
            this.message2 = "You earned 50 cash";
            this.tokenStorage.saveCash((Number(this.tokenStorage.getCash()) + 50).toString());
            break
        }
      }, error1 => {
        this.message = "Serving failed!";
        this.message2 = "";

      }
    )
  }



}
