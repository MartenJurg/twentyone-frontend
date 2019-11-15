import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {SkillForm} from "../skill_form";
import {SkillingService} from "../skilling.service";

@Component({
  selector: 'app-streets',
  templateUrl: './streets.component.html',
  styleUrls: ['./streets.component.css']
})
export class StreetsComponent implements OnInit {


  items = [{name: "Papers (level 0)"}, {name: "Watches (level 10)"}, {name: "Phones (level 30)"}];
  value = "";
  valueToBack = "";
  message = "";
  message2 = "";
  amount = 0;
  stealingForm: SkillForm;
  stealingFailed = false;
  errorMessage: string;

  constructor(public tokenService : TokenStorageService,
              public skillService: SkillingService) { }

  ngOnInit() {
    this.tokenService.updateDataAndInventory();
  }


  onChange( value ) {
    this.value = value;
  }

  sell() {
    this.skillService.sellCrafted(this.tokenService.getUsername()).subscribe(data=>{
      console.log(data.message);
    });
    this.skillService.sellThieved(this.tokenService.getUsername()).subscribe( data=> {
      console.log(data.message);
    });
    this.tokenService.updateDataAndInventory();
  }

  steal() {
    switch (this.value) {
      case "Watches (level 10)" :
        this.valueToBack = "watch";
        break;
      case "Phones (level 30)" :
        this.valueToBack = "phone";
        break;
      default:
        this.valueToBack = "paper";
    }

    this.stealingForm = new SkillForm(this.tokenService.getUsername(), this.valueToBack);
    this.skillService.steal(this.stealingForm).subscribe(
      data => {
        this.tokenService.updateDataAndInventory();
        this.stealingFailed = false;
        this.message = data.message;
        switch (this.valueToBack) {
          case "paper":
            this.tokenService.savePapers((Number(this.tokenService.getPapers()) + 1).toString());
            this.message2 = "You now have " + this.tokenService.getPapers() + " papers!";
            break;
          case "watch":
            this.tokenService.saveWatches((Number(this.tokenService.getWatches()) + 1).toString());
            this.message2 = "You now have " + this.tokenService.getWatches() + " watches!";
            break;
          case "phone":
            this.tokenService.savePhones((Number(this.tokenService.getPhones()) + 1).toString());
            this.message2 = "You now have " + this.tokenService.getPhones() +  " phones!";
            break
        }

      }, error1 => {
        this.stealingFailed = true;
        this.message = "Stealing failed!";
        this.message2 = "";
      }
    )
  }

}
