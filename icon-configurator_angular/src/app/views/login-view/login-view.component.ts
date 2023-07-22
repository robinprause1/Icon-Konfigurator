import { Component, OnInit } from '@angular/core';
import User from "src/models/user";
import authService from "../../../services/auth.service";
import {select, Store} from "@ngrx/store";
import {AuthActions} from "../../../state/auth/auth.actions";
import {Router} from "@angular/router";
import {MessageActions} from "../../../state/message/message.actions";
import {take} from "rxjs";
import {getIsLoggedIn} from "../../../state/auth/auth.selectors";
import {AppState} from "../../../state/app.state";
import {getError, getMessage} from "../../../state/message/message.selectors";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) { }

  user: User = new User('', '', '', '', true);
  serverError: String = '';

  ngOnInit(): void {

  }

  loggedIn(): boolean {
    let isLoggedIn1: boolean = false;
    this.store.pipe(select(getIsLoggedIn)).pipe(take(1)).subscribe(isLoggedIn => {
      isLoggedIn1 = isLoggedIn;
    });
    return isLoggedIn1;
  }

  serverConfirm(): String{
    let message1: String = '';
    this.store.pipe(select(getMessage)).pipe(take(1)).subscribe(message => {
      message1 = message;
    });
    return message1;
  }
  errorMsg(){
    let error1: String = '';
    this.store.pipe(select(getError)).pipe(take(1)).subscribe(error => {
      error1 = error;
    });
    return error1;
  }

  handleLogin(): void {
    if (this.user.username && this.user.password) {
      authService.login(this.user).then(
        user => {
          this.store.dispatch(AuthActions.setuser({ user: user}));
          this.store.dispatch(AuthActions.setloggedin({ loggedIn: true}));
          localStorage.setItem('user', JSON.stringify(user));
          console.log(user);
          return Promise.resolve(user);
        },
        error => {
          this.store.dispatch(AuthActions.setloggedin({ loggedIn: false}));
          return Promise.reject(error);
        }
      ).then(
        () => {
          this.router.navigateByUrl('/profile');
          this.store.dispatch(MessageActions.setmessage({ msg: '' }))
        },
        error => {
          this.serverError = error.response.data.message;
        }
      );
    }
  }

  onLibraryAdd(){
    this.router.navigateByUrl('/');
  }

}
