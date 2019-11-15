import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { FormsModule} from "@angular/forms";
import {Router, RouterModule, Routes} from "@angular/router";

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { DataComponent } from './data/data.component';
import { ToGoComponent } from './to-go/to-go.component';
import { BoxingClubComponent } from './boxing-club/boxing-club.component';
import { StreetsComponent } from './streets/streets.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { PubComponent } from './pub/pub.component';
import { CraftingRoomComponent } from './crafting-room/crafting-room.component';
import { HouseComponent } from './house/house.component';

const appRoutes :Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path:"pub",
    component: PubComponent
  },
  {
    path:"boxing-club",
    component: BoxingClubComponent
  },
  {
    path:"streets",
    component: StreetsComponent
  },
  {
    path:"kitchen",
    component: KitchenComponent
  },
  {
    path:"crafting-room",
    component: CraftingRoomComponent
  },
  {
    path:"",
    component: HomeComponent,
    pathMatch: "full"
  },
  {
    path:"**",
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    HomeComponent,
    AuthComponent,
    DataComponent,
    ToGoComponent,
    BoxingClubComponent,
    StreetsComponent,
    KitchenComponent,
    PubComponent,
    CraftingRoomComponent,
    HouseComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
