import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {User} from "../model/user.model";
import {AuthActionTypes} from "../auth/auth.actions";
import {AuthState} from "../auth/auth.reducer";


export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
