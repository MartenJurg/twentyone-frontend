import { Component, OnInit } from '@angular/core';
import {SkillForm} from "../../_pojos/skill_form";
import {TokenStorageService} from "../../_services/token-storage.service";
import {SkillingService} from "../../_services/skilling.service";

@Component({
  selector: 'app-crafting-room',
  templateUrl: './crafting-room.component.html',
  styleUrls: ['./crafting-room.component.css']
})
export class CraftingRoomComponent implements OnInit {

  crafts = [{name: "Gloves (level 0)"}, {name: "Hat (level 10)"}, {name: "Sweater (level 30)"}];
  value = "";
  valueToBack = "";
  message = "";
  message2 = "";
  craftingForm: SkillForm;
  craftingFailed = false;
  errorMessage: string;

  constructor(
    private tokenService : TokenStorageService,
    private skillService: SkillingService) { }

  ngOnInit() {
    this.craftingFailed = false;
  }

  onChange( value ) {
    this.value = value;

  }

  craft() {
    switch (this.value) {
      case "Hat (level 10)" :
        this.valueToBack = "hat";
        break;
      case "Sweater (level 30)" :
        this.valueToBack = "sweater";
        break;
      default:
        this.valueToBack = "gloves";
    }

    this.craftingForm = new SkillForm(this.tokenService.getUsername(), this.valueToBack);
    this.skillService.craft(this.craftingForm).subscribe(
      data => {
        this.tokenService.updateDataAndInventory();
        this.craftingFailed = false;
        this.message = data.message;
        switch (this.valueToBack) {
          case "gloves":
            this.tokenService.saveGloves((Number(this.tokenService.getGloves()) + 1).toString());

            this.message2 = "You now have " + this.tokenService.getGloves() + " gloves!";
            break;
          case "hat":
            this.tokenService.saveHats((Number(this.tokenService.getHats()) + 1).toString());
            this.message2 = "You now have " + this.tokenService.getHats() + " hats!";
            break;
          case "sweater":
            this.tokenService.saveSweaters((Number(this.tokenService.getSweaters()) + 1).toString());
            this.message2 = "You now have " + this.tokenService.getSweaters() + " sweaters!";
            break
        }
      }, error1 => {
        this.craftingFailed = true;
        this.message = "Crafting failed!";
        this.message2 = "";
      }
    )
  }
}
