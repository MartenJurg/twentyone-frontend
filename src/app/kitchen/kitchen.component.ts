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
        this.tokenStorage.updateData();
        this.message = data.message;
        switch (this.value) {
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
      }
    )
  }



}
