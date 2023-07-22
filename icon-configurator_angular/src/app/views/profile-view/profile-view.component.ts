import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AppState} from "../../../state/app.state";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {getIsLoggedIn} from "../../../state/auth/auth.selectors";
import {getMessage} from "../../../state/message/message.selectors";
import {IconActions} from "../../../state/icon/icon.actions";
import authService from "../../../services/auth.service";
import {AuthActions} from "../../../state/auth/auth.actions";
import User from "../../../models/user";

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit, AfterViewInit {

  breakpointMdAndDown: boolean = false;
  loggedIn: boolean = false;
  serverConfirm: string = '';

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.store.select(getIsLoggedIn).subscribe(loggedInValue => {
      console.log("logged in: " + loggedInValue);
      this.loggedIn = loggedInValue;
      if (!this.loggedIn) {
        this.router.navigateByUrl('login');
      }
    });
    this.store.select(getMessage).subscribe(messageValue => this.serverConfirm = messageValue);

    this.setBreakpointMdAndDown(window.innerWidth)
    window.addEventListener('resize', () => {
      this.setBreakpointMdAndDown(window.innerWidth);
    });
  }

  goToConfigurator(){
    this.router.navigateByUrl('');
  }

  setBreakpointMdAndDown(windowWidth: number){
    windowWidth <= 768 ? this.breakpointMdAndDown = true : this.breakpointMdAndDown = false;
  }

  logout(){
    this.store.dispatch(IconActions.reset());
    authService.logout(this.store);
    this.store.dispatch(AuthActions.setuser({user: new User('','','','', true)}));
    this.store.dispatch(AuthActions.setloggedin({loggedIn: false}));
    this.router.navigateByUrl('login');
  }


}
