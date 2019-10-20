import { Component, OnInit } from '@angular/core';
import {SkillForm} from "../skill_form";
import {TokenStorageService} from "../auth/token-storage.service";
import {SkillingService} from "../skilling.service";

@Component({
  selector: 'app-crafting-room',
  templateUrl: './crafting-room.component.html',
  styleUrls: ['./crafting-room.component.css']
})
export class CraftingRoomComponent implements OnInit {

  crafts = [{name: "Gloves (level 0)"}, {name: "Hat (level 10)"}, {name: "Sweater (level 30)"}];
  value = "gloves";
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
        this.value = "hat";
        break;
      case "Sweater (level 30)" :
        this.value = "sweater";
        break;
      default:
        this.value = "gloves";
    }

    this.craftingForm = new SkillForm(this.tokenService.getUsername(), this.value)
    this.skillService.craft(this.craftingForm).subscribe(
      data => {
        this.skillService.getData(this.tokenService.getUsername()).subscribe(
          data=> {
            this.tokenService.saveCash(data.cash);
            this.tokenService.saveHouse(data.house);
            this.tokenService.saveFame(data.fame);
            this.tokenService.saveStrength(data.strength);
            this.tokenService.saveDefence(data.defence);
            this.tokenService.saveCooking(data.cooking);
            this.tokenService.saveThieving(data.thieving);
            this.tokenService.saveCrafting(data.crafting);
            this.tokenService.saveBeverage(data.beverage);
            this.craftingFailed = false;
          }
        )
      }, error1 => {
        this.craftingFailed = true;
        this.errorMessage = "Serving failed!"
      }
    )
  }
}
