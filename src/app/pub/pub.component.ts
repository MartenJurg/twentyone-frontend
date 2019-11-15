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
  valuetoBack = "";
  message = "";
  message2 = "";
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
        this.valuetoBack = "applejuice";
        break;
      case "Gin Tonic (level 30)" :
        this.valuetoBack = "gintonic";
        break;
      default:
        this.valuetoBack = "water";
    }

    this.pubForm = new SkillForm(this.tokenService.getUsername(), this.value);
    this.skillService.serve(this.pubForm).subscribe(
      data => {
        this.tokenService.updateData();
        this.servingFailed = false;
        this.message = data.message;
        switch (this.valuetoBack) {
          case "water":
            this.message2 = "You earned 5 cash";
            this.tokenService.saveCash((Number(this.tokenService.getCash()) + 5).toString());
            break;
          case "applejuice":
            this.message2 = "You earned 20 cash";
            this.tokenService.saveCash((Number(this.tokenService.getCash()) + 20).toString());

            break;
          case "gintonic":
            this.tokenService.saveCash((Number(this.tokenService.getCash()) + 50).toString());
            this.message2 = "You earned 50 cash";
            break
        }
      }, error1 => {
        this.servingFailed = true;
        this.message = "Serving failed!";
        this.message2 = "";

      }
    )
  }

}
