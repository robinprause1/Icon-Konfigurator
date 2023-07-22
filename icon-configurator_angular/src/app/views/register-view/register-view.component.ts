import { Component, OnInit } from '@angular/core';
import User from 'src/models/user';
import authService from "../../../services/auth.service";
import {AppState} from "../../../state/app.state";
import {Store} from "@ngrx/store";
import {AuthActions} from "../../../state/auth/auth.actions";
import {MessageActions} from "../../../state/message/message.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css']
})
export class RegisterViewComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) { }

  user: User = new User('', '', '', '');

  serverError: String = '';

  ngOnInit(): void {
  }

  handleRegister(): void {
    //this.message = '';
    authService.register(this.user).then(
      response => {
        this.store.dispatch(AuthActions.setloggedin({loggedIn:false}));
        return Promise.resolve(response.data);
      },
      error => {
        this.store.dispatch(AuthActions.setloggedin({loggedIn:false}));
        return Promise.reject(error);
      }
    ).then(data => {
        let serverConfirm = data.message;
        this.store.dispatch(MessageActions.setmessage({msg: serverConfirm}));
        this.router.navigateByUrl("/login");
      }, error => {
        this.serverError = error.response.data.message;
      }
    )
  }

}
