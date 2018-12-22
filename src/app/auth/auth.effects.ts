import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthActionTypes, Login, Logout} from "./auth.actions";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {User} from "../model/user.model";
import {Action} from "@ngrx/store";
import {defer, Observable, of} from "rxjs";


@Injectable()
export class AuthEffects {

  @Effect({dispatch:false})
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => {
      if( action.payload && action.payload.user){
        console.log('LOGIN CALLED');
        localStorage.setItem("user", JSON.stringify(action.payload.user))
        this.router.navigateByUrl('/courses');
      }
      })
  );

  @Effect({dispatch:false})
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap( () => {
      localStorage.removeItem("user");
      this.router.navigateByUrl('/login');
    })
  );


  @Effect()
  init$ : Observable<Action> = defer<Action>(() => {

    const userData = localStorage.getItem("user");
    console.log('userData',userData);
    if(userData){
      let user : User = JSON.parse(userData)
      return of(new Login({user}));
    }
    else{
      return of(new Logout());
    }


  })

  constructor(private actions$: Actions, private router : Router) {

  }
}
