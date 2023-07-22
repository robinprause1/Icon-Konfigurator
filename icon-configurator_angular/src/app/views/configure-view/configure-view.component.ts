import { Component, OnInit } from '@angular/core';
import {AppState} from "../../../state/app.state";
import {select, Store} from "@ngrx/store";
import {getCurrentStep, getEditMode, getFinalIcon, getIcon, getWeight} from "../../../state/icon/icon.selectors";
import {take} from "rxjs";
import {IconActions} from "../../../state/icon/icon.actions";
import {MessageActions} from "../../../state/message/message.actions";
import {getIsLoggedIn} from "../../../state/auth/auth.selectors";
import axios from "axios";
import authHeader from "../../../services/auth-headers";
import authService from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-configure-view',
  templateUrl: './configure-view.component.html',
  styleUrls: ['./configure-view.component.css'],
})
export class ConfigureViewComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) { }

  chooseIconMsg: string = '';
  showColorPicker: boolean = false;

  ngOnInit(): void {
  }


  nextStep() {
    this.store.pipe(select(getIcon)).pipe(take(1)).subscribe(icon => {
        if(icon == ''){
          this.chooseIconMsg = "Bitte wähle ein Icon aus";
        }
        else{
          this.store.dispatch(IconActions.next());
        }
      }
    );
  }

  previousStep() {
    this.store.dispatch(IconActions.previous());
  }

  finishConfig() {
    if(this.loggedIn()){
      this.store.pipe(select(getFinalIcon)).pipe(take(1)).subscribe(finalIcon => {
        axios.post('http://localhost:3000/icons/saveHistory', finalIcon, {headers: authHeader()})
          .then(() => {
            this.store.dispatch(IconActions.reset());
          })
          .catch(err => {
            authService.jwtExpired(err, this.store, this.router);
          })
        }
      );
    }else{
      this.store.dispatch(MessageActions.setmessage({msg: ''}));
      this.store.dispatch(IconActions.reset());
    }
  }

  currentStep(): number {
    let currentStep1 = 0;
    this.store.pipe(select(getCurrentStep)).pipe(take(1)).subscribe(currentStep => {
        currentStep1 = currentStep;
      }
    );
    return currentStep1;
  }

  heading() {
    if (this.currentStep() == 0) {
      return "Icon auswählen"
    } else if (this.currentStep() == 1) {
      return "Formeinstellungen"
    } else if (this.currentStep() == 2) {
      return "Farbe auswählen"
    }
    return "Dein Icon"
  }

  editMode() {
    let editMode1: boolean = false;
    this.store.pipe(select(getEditMode)).pipe(take(1)).subscribe(editMode => {
        editMode1 = editMode;
      }
    );
    return editMode1;
  }

  loggedIn() {
    let loggedIn1: boolean = false;
    this.store.pipe(select(getIsLoggedIn)).pipe(take(1)).subscribe(loggedIn => {
        loggedIn1 = loggedIn;
      }
    );
    return loggedIn1;
  }
}
