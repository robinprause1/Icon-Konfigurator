import axios, {AxiosError} from "axios";
//import { state } from "@/main";
//import router from "@/router";
import User from "../models/user";
import {select, Store} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {AuthActions} from "../state/auth/auth.actions";
import {MessageActions} from "../state/message/message.actions";
import {Router} from "@angular/router";
import {getError} from "../state/message/message.selectors";
import {take} from "rxjs";

const API_URL = 'http://localhost:3000/users/';


/**
 * Methods for authenticating users
 * Methods get called from action within auth module state
 */
class AuthService{

    login(user: User){
        return axios
        .post(API_URL + 'login', {
            username: user.username,
            password: user.password
        })
        .then((response) => {
            if(response.data.accessToken){
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data
        });
    }

    logout(store: Store<AppState>){
        localStorage.removeItem('user');
        store.dispatch(AuthActions.setloggedin({loggedIn: false}));
    }

    register(user: User){
      console.log(user);
        return axios.post(API_URL + 'register', {
            username: user.username,
            prename: user.prename,
            name: user.name,
            password: user.password
        });
    }

    //TODO nicht sicher?
    jwtExpired(err: { response: { data: { jwtExpired: any; }; }; }, store: Store<AppState>, router: Router){
        if(err.response.data.jwtExpired){
          //TODO
          this.logout(store);
          store.pipe(select(getError)).pipe(take(1)).subscribe(errorMessage => {
            store.dispatch(MessageActions.seterror({error: errorMessage}));
          });
          router.navigateByUrl('login');
        }
    }
}

export default new AuthService();
