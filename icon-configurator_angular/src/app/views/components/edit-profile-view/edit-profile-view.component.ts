import {AfterContentChecked, AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit} from '@angular/core';
import {AppState} from "../../../../state/app.state";
import {select, Store} from "@ngrx/store";
import {getIcon} from "../../../../state/icon/icon.selectors";
import {take} from "rxjs";
import {getIsLoggedIn, getUser} from "../../../../state/auth/auth.selectors";
import User from "../../../../models/user";
import {Router} from "@angular/router";
import axios from "axios";
import authHeader from "../../../../services/auth-headers";
import {MessageActions} from "../../../../state/message/message.actions";
import authService from "../../../../services/auth.service";

@Component({
  selector: 'app-edit-profile-view',
  templateUrl: './edit-profile-view.component.html',
  styleUrls: ['./edit-profile-view.component.css']
})
export class EditProfileViewComponent implements OnInit, AfterViewInit{

  name: string = '';
  prename: string = '';
  username: string = '';
  oldpw: string = '';
  newpw: string = ''
  newpwrp: string = '';
  confirm: boolean = false;
  serverError: string = '';

  loggedIn: boolean = false;
  currentUser: User = new User('','','','', true);

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.subscriptions();
    if(!this.loggedIn){
      this.router.navigateByUrl('login');
    }
  }

  ngAfterViewInit() {

  }

  subscriptions(){
    this.store.pipe(select(getIsLoggedIn)).subscribe(isLoggedIn => {
        this.loggedIn = isLoggedIn;
      }
    );
    this.store.pipe(select(getUser)).subscribe(user => {
        this.currentUser = user;
      if(this.loggedIn){
        setTimeout(() => {
          console.log("subscriptions prename: " + user.prename);
          console.log("subscriptions username: " + user.username);
          this.name = this.currentUser.name;
          this.prename = this.currentUser.prename;
          this.username = this.currentUser.username;
          this.oldpw = this.currentUser.password;
        }, 0);
      }
      }
    );
  }

  editedUser(){
    return {
      name: this.name,
      prename: this.prename,
      username: this.username,
      oldpw: this.oldpw,
      newpw: this.newpw,
      newpwrp: this.newpwrp
    };
  }

  edit(){
    axios.patch('http://localhost:3000/users/edit', this.editedUser(), {headers: authHeader()})
      .then(data => {
        let serverConfirm = data.data.message;
        let currentUser = JSON.parse(localStorage.getItem('user')!.toString());
        currentUser.username = data.data.username;
        currentUser.name =  data.data.name;
        currentUser.prename = data.data.prename;
        localStorage.setItem('user', JSON.stringify(currentUser));
        this.store.dispatch(MessageActions.setmessage({msg: serverConfirm}));
      })
      .catch(err => {
        this.serverError = err.response.data.message;
        authService.jwtExpired(err, this.store, this.router);
      });
  }

  deleteUser(){
    axios.patch('http://localhost:3000/users/delete', this.currentUser, {headers: authHeader()})
      .then(data => {
        let serverConfirm = data.data.message;
        this.store.dispatch(MessageActions.setmessage({msg: serverConfirm}));
      })
      .catch(err => {
        this.serverError = err.response.data.message;
        authService.jwtExpired(err, this.store, this.router);
      });
  }

}
