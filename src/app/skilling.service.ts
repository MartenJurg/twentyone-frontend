import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtResponseMessage} from "./jwtResponseMessage";
import { SkillForm} from "./skill_form";

import {DataInfo} from "./data/data_info";
import {InventoryInfo} from "./data/invenory_info";


@Injectable({
  providedIn: "root"
})

export class SkillingService {


  constructor(private http: HttpClient) {
  }

  upgradeHouse(username: string) : Observable<JwtResponseMessage> {
    return this.http.post<JwtResponseMessage>("/api/house/upgrade", username);
  }

  trainStrength(username : string) : Observable<JwtResponseMessage> {
    return this.http.post<JwtResponseMessage>("/api/boxing/strength", username);
  }

  trainDefence(username : string) : Observable<JwtResponseMessage> {
    return this.http.post<JwtResponseMessage>("/api/boxing/defence", username);
  }

  sellCrafted(username: string) : Observable<JwtResponseMessage> {
    return this.http.post<JwtResponseMessage>("/api/crafting/sell", username);
  }

  sellThieved(username: string) : Observable<JwtResponseMessage> {
    return this.http.post<JwtResponseMessage>("/api/stealing/sell", username);
  }


  getInventory(username: string) : Observable<InventoryInfo> {
    return this.http.post<InventoryInfo>("/api/inventory", username);
  }

  steal(stealingForm: SkillForm) : Observable<JwtResponseMessage> {
    return this.http.post<JwtResponseMessage>("/api/stealing/steal", stealingForm)
  }

  cook(cookForm: SkillForm): Observable<JwtResponseMessage> {
    return this.http.post<JwtResponseMessage>("/api/kitchen/cook", cookForm);
  }

  craft(craftForm: SkillForm): Observable<JwtResponseMessage> {
    return this.http.post<JwtResponseMessage>("/api/crafting/craft", craftForm);
  }

  serve(serveForm: SkillForm) : Observable<JwtResponseMessage> {
    return this.http.post<JwtResponseMessage>("/api/pub/serve", serveForm);
  }

  getData(username: string): Observable<DataInfo> {
    return this.http.post<DataInfo>("/api/data/data", username);
  }
}
