import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {SkillingService} from "../skilling.service";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  cash = "";
  house = "";
  fame = "";
  strength = "";
  defence = "";
  cooking = "";
  thieving = "";
  crafting = "";
  beverage = "";



  constructor(
    private tokenService: TokenStorageService,
    private skillService: SkillingService,
  ) { }

  ngOnInit() {
    this.updateAllTheIime()
  }

  updateAllTheIime() {
      setInterval(() =>
        {
          this.update();
        },
        100);
    setInterval(() =>
      {
        this.getData();
      },
      1000);
  }



  getData() {
    this.skillService.getData(this.tokenService.getUsername()).subscribe(data=> {
      this.tokenService.saveCash(data.cash);
      this.tokenService.saveHouse(data.house);
      this.tokenService.saveFame(data.fame);
      this.tokenService.saveStrength(data.strength);
      this.tokenService.saveDefence(data.defence);
      this.tokenService.saveCooking(data.cooking);
      this.tokenService.saveThieving(data.thieving);
      this.tokenService.saveCrafting(data.crafting);
      this.tokenService.saveBeverage(data.beverage);
    })
    this.skillService.getInventory(this.tokenService.getUsername()).subscribe(data=> {
      this.tokenService.savePapers(data.paper);
      this.tokenService.saveWatches(data.watches);
      this.tokenService.savePhones(data.phones);
      this.tokenService.saveGloves(data.gloves);
      this.tokenService.saveHats(data.hats);
      this.tokenService.saveSweaters(data.sweaters);
    })
  }

  update() {
    this.cash = this.tokenService.getCash();
    this.house = this.tokenService.getHouse();
    this.fame = this.tokenService.getFame();
    this.strength = this.tokenService.getStrength();
    this.defence = this.tokenService.getDefence();
    this.cooking = this.tokenService.getCooking();
    this.thieving = this.tokenService.getThieving();
    this.crafting = this.tokenService.getCrafting();
    this.beverage = this.tokenService.getBeverage();
    console.log(this.fame)
  }

}
