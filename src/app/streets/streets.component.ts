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
  stealingForm: SkillForm;
  stealingFailed = false;
  errorMessage: string;

  papers = "0";
  watches = "0";
  phones = "0";
  gloves = "0";
  hats = "0";
  sweaters = "0";

  constructor(private tokenService : TokenStorageService,
              private skillService: SkillingService) { }

  ngOnInit() {
    this.updateAllTheIime()
    this.getData()
  }

  updateAllTheIime() {
    setInterval(() =>
      {
        this.update();
      },
      100);
  }

  getDataAllTheIime() {
    setInterval(() =>
      {
        this.getData();
      },
      1000);
  }

  onChange( value ) {
    this.value = value;
  }

  update() {
    this.papers = this.tokenService.getPapers();
    this.watches = this.tokenService.getWatches();
    this.phones = this.tokenService.getPhones();
    this.gloves = this.tokenService.getGloves();
    this.hats = this.tokenService.getHats();
    this.sweaters = this.tokenService.getSweaters();
    console.log(this.tokenService.getPapers())
  }

  sell() {
    this.skillService.sellCrafted(this.tokenService.getUsername()).subscribe(data=>{
      console.log(data.message);
    });
    this.skillService.sellThieved(this.tokenService.getUsername()).subscribe( data=> {
      console.log(data.message);
    });
    this.getData()
  }

  getData() {
    this.skillService.getInventory(this.tokenService.getUsername()).subscribe(
      data=> {
        this.tokenService.savePapers(data.paper);
        this.tokenService.saveWatches(data.watches);
        this.tokenService.savePhones(data.phones);
        this.tokenService.saveGloves(data.gloves);
        this.tokenService.saveHats(data.hats);
        this.tokenService.saveSweaters(data.sweaters);
      }
    )

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
      }
    )
  }

  craft() {
    switch (this.value) {
      case "Watches (level 10)" :
        this.value = "watch";
        break;
      case "Phones (level 30)" :
        this.value = "phone";
        break;
      default:
        this.value = "paper";
    }

    this.stealingForm = new SkillForm(this.tokenService.getUsername(), this.value)
    this.skillService.steal(this.stealingForm).subscribe(
      data => {
        this.getData()
        this.stealingFailed = false;

      }, error1 => {
        this.stealingFailed = true;
        this.errorMessage = "Serving failed!"
      }
    )
  }

}
