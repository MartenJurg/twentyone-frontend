import {Injectable} from "@angular/core";
import {DataInfo} from "../data/data_info";
import {InventoryInfo} from "../data/invenory_info";
import {SkillingService} from "../_services/skilling.service";

const USERNAME_KEY = 'AuthUsername';
const AUTHORITY_KEY = 'AuthAuthorities';
const CASH_KEY = 'Cash';
const HOUSE_KEY = 'House';
const FAME_KEY = 'Fame';
const STRENGTH_KEY = 'Strength';
const DEFENCE_KEY = 'Defence';
const COOKING_KEY = 'Cooking';
const THIEVING_KEY = 'Thieving';
const CRAFTING_KEY = 'Crafting';
const BEVERAGE_KEY = 'Beverage';
const ISLOGGEDIN_KEY = 'IsLoggedIn';
const PAPERS_KEY = 'Papers';
const WATCHES_KEY = 'Watches';
const PHONES_KEY = 'Phones';
const GLOVES_KEY = 'Gloves';
const HATS_KEY = 'Hats';
const SWEATERS_KEY = 'Sweater';


  @Injectable({
    providedIn: 'root'
  })
  export class TokenStorageService {

  constructor(private skillService: SkillingService) { }

  public updateDataAndInventory() {
    this.updateData();
    this.updateInventory();
  }

  public updateData() {
    this.skillService.getData(this.getUsername()).subscribe( data => {
      this.saveData(data)
    })
  }

  public updateInventory() {
    this.skillService.getInventory(this.getUsername()).subscribe( data => {
      this.saveInventory(data)
    })
  }

  public saveInventory(inventory: InventoryInfo) {
    this.savePapers(inventory.paper);
    this.saveWatches(inventory.watches);
    this.savePhones(inventory.phones);
    this.saveGloves(inventory.gloves);
    this.saveHats(inventory.hats);
    this.saveSweaters(inventory.sweaters);

  }

  public saveData(data: DataInfo) {
    this.saveCash(data.cash);
    this.saveHouse(data.house);
    this.saveFame(data.fame);
    this.saveStrength(data.strength);
    this.saveDefence(data.defence);
    this.saveCooking(data.cooking);
    this.saveThieving(data.thieving);
    this.saveCrafting(data.crafting);
    this.saveBeverage(data.beverage);
  }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveFame(fame: string) {
    window.sessionStorage.removeItem(FAME_KEY);
    window.sessionStorage.setItem(FAME_KEY, fame);
  }

  public getFame(): string {
    return sessionStorage.getItem(FAME_KEY);
  }

  public savePhones(phones: string) {
    window.sessionStorage.removeItem(PHONES_KEY);
    window.sessionStorage.setItem(PHONES_KEY, phones);
  }

  public getPhones(): string {
    return sessionStorage.getItem(PHONES_KEY);
  }

  public saveGloves(Gloves: string) {
    window.sessionStorage.removeItem(GLOVES_KEY);
    window.sessionStorage.setItem(GLOVES_KEY, Gloves);
  }

  public getGloves(): string {
    return sessionStorage.getItem(GLOVES_KEY);
  }

  public saveHats(Hats: string) {
    window.sessionStorage.removeItem(HATS_KEY);
    window.sessionStorage.setItem(HATS_KEY, Hats);
  }

  public getHats(): string {
    return sessionStorage.getItem(HATS_KEY);
  }

  public saveSweaters(sweaters: string) {
    window.sessionStorage.removeItem(SWEATERS_KEY);
    window.sessionStorage.setItem(SWEATERS_KEY, sweaters);
  }

  public getSweaters(): string {
    return sessionStorage.getItem(SWEATERS_KEY);
  }

  public saveCrafting(crafting: string) {
    window.sessionStorage.removeItem(CRAFTING_KEY);
    window.sessionStorage.setItem(CRAFTING_KEY, crafting);
  }

  public getCrafting(): string {
    return sessionStorage.getItem(CRAFTING_KEY);
  }

  public saveBeverage(beverage: string) {
    window.sessionStorage.removeItem(BEVERAGE_KEY);
    window.sessionStorage.setItem(BEVERAGE_KEY, beverage);
  }

  public getBeverage(): string {
    return sessionStorage.getItem(BEVERAGE_KEY);
  }

  public savePapers(papers: string) {
    window.sessionStorage.removeItem(PAPERS_KEY);
    window.sessionStorage.setItem(PAPERS_KEY, papers);
  }

  public getPapers(): string {
    return sessionStorage.getItem(PAPERS_KEY);
  }

  public saveWatches(watches: string) {
    window.sessionStorage.removeItem(WATCHES_KEY);
    window.sessionStorage.setItem(WATCHES_KEY, watches);
  }

  public getWatches(): string {
    return sessionStorage.getItem(WATCHES_KEY);
  }

  public saveStrength(strength: string) {
    window.sessionStorage.removeItem(STRENGTH_KEY);
    window.sessionStorage.setItem(STRENGTH_KEY, strength);
  }

  public getStrength(): string {
    return sessionStorage.getItem(STRENGTH_KEY);
  }

  public saveDefence(defence: string) {
    window.sessionStorage.removeItem(DEFENCE_KEY);
    window.sessionStorage.setItem(DEFENCE_KEY, defence);
  }

  public getDefence(): string {
    return sessionStorage.getItem(DEFENCE_KEY);
  }

  public saveThieving(thieving: string) {
    window.sessionStorage.removeItem(THIEVING_KEY);
    window.sessionStorage.setItem(THIEVING_KEY, thieving);
  }

  public getThieving(): string {
    return sessionStorage.getItem(THIEVING_KEY);
  }

  public saveCooking(cooking: string) {
    window.sessionStorage.removeItem(COOKING_KEY);
    window.sessionStorage.setItem(COOKING_KEY, cooking);
  }

  public getCooking(): string {
    return sessionStorage.getItem(COOKING_KEY);
  }

  public saveHouse(house: string) {
    window.sessionStorage.removeItem(HOUSE_KEY);
    window.sessionStorage.setItem(HOUSE_KEY, house);
  }

  public getHouse(): string {
    return sessionStorage.getItem(HOUSE_KEY);
  }

  public saveCash(cash: string) {
     window.sessionStorage.removeItem(CASH_KEY);
     window.sessionStorage.setItem(CASH_KEY, cash);

  }

  public getCash(): string {
    return sessionStorage.getItem(CASH_KEY);
  }

  public saveLoggedIn(loggedIn: string) {
    window.sessionStorage.removeItem(ISLOGGEDIN_KEY);
    window.sessionStorage.setItem(ISLOGGEDIN_KEY, loggedIn);
  }

  public getLoggedIn(): string {
    return sessionStorage.getItem(ISLOGGEDIN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveAuthorities(authority: string) {
    window.sessionStorage.removeItem(AUTHORITY_KEY);
    window.sessionStorage.setItem(AUTHORITY_KEY, authority);
  }

  public getAuthority(): string {
    return sessionStorage.getItem(AUTHORITY_KEY);
  }

}
