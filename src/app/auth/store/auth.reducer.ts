import { User } from '../../shared/user.model';
import * as AuthActions from './auth.actions';

export interface State {
   user: User;
   authError: string;
}

const initiaState: State = {
   user: null,
   authError: null,
}

export function authReducer(state: State = initiaState, action: AuthActions.AuthActions) {
    switch(action.type) {
        case AuthActions.LOGIN_START:
            return {
               ...state
            };
        case AuthActions.SIGNUP_START:
            return {
              ...state
            };
        case AuthActions.LOGIN_SUCCESS:
            const user = new User(
               action.payload.userId,
               action.payload.email,
               action.payload.token,
               action.payload.expirationDate
            );
            return {
               ...state,
               user: user
            };
        case AuthActions.LOGIN_FAIL:
        case AuthActions.SIGNUP_FAIL:
          console.log(action.payload);
          return {
            ...state,
            user: null,
            authError: action.payload,
          };
        case AuthActions.LOGIN_BAN:
          return {
            ...state,
            user: null,
            authError: action.payload,
          };
        case AuthActions.LOGOUT:
           return {
              ...state,
              user: null
           };
        default:
           return state;
    }
}
