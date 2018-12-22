import {User} from "../model/user.model";
import {AuthActions, AuthActionTypes} from "./auth.actions";


export interface AuthState {
 loggedIn : boolean,
  user : User
}



export const initialAuthState: AuthState = {
  loggedIn : false,
  user : undefined
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {

    case AuthActionTypes.LoginAction :
      if(action && action.payload && action.payload.user){
        return {
          loggedIn : true,
          user : action.payload.user
        }
      }
    case AuthActionTypes.LogoutAction :
      return initialAuthState;
    default:
      return state;
  }
}
