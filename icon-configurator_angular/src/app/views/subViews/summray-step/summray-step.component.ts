import {Component, OnInit} from '@angular/core';
import authService from "../../../../services/auth.service";
import axios from "axios";
import {select, Store} from "@ngrx/store";
import {getFinalIcon} from "../../../../state/icon/icon.selectors";
import {take} from "rxjs";
import {AppState} from "../../../../state/app.state";
import authHeader from "../../../../services/auth-headers";
import {IconActions} from "../../../../state/icon/icon.actions";
import {MessageActions} from "../../../../state/message/message.actions";
import {Router} from "@angular/router";
import {getIsLoggedIn} from "../../../../state/auth/auth.selectors";

@Component({
  selector: 'app-summray-step',
  templateUrl: './summray-step.component.html',
  styleUrls: ['./summray-step.component.css']
})
export class SummrayStepComponent implements OnInit {

  loggedIn: boolean = false;
  editMode: boolean = false;

  errorMsg: string = '';
  serverConfirm: string = '';
  iconWithColorBlob: Blob = new Blob();

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.store.pipe(select(getIsLoggedIn)).subscribe(isLoggedIn => {
        this.loggedIn = isLoggedIn;
      }
    );
  }

  saveToFavorites() {
    if (!this.loggedIn) {
      this.errorMsg = "Bitte logge dich zunächst ein, um das Icon zu deinen Favoriten hinzufügen zu können"
    }
    else{
      this.store.pipe(select(getFinalIcon)).pipe(take(1)).subscribe(finalIcon => {
          axios.post('http://localhost:3000/icons/saveFavorite', finalIcon, {headers: authHeader()})
            .then(res => {
              this.serverConfirm = res.data.message;
            })
            .catch(err => {
              authService.jwtExpired(err, this.store, this.router);
            });
        }
      );
    }
  }

  downloadIcon() {
    this.store.pipe(select(getFinalIcon)).pipe(take(1)).subscribe(icon => {
      console.log(icon);
      let url = "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/"
        + icon.icon + "/"
        + (icon.weight == 400 && icon.fill == 0 ?
          "default/" :
          ((icon.weight == 400 ? "" : "wght" + icon.weight) + (icon.fill == 0 ? "/" : "") + (icon.fill == 0 ? "" : "fill" + icon.fill + "/"))) + "48px.svg";
      fetch(url, {method: 'GET'})
        .then(r => r.text())
        .then(text =>new Blob([text], {type: 'image/xml+svg'}))
        .then(b => {
          let hexColor = icon.color;

          let myReader = new FileReader();
          //handler executed once reading(blob content referenced to a variable) from blob is finished.
          myReader.onloadend = (e) => {
            this.iconWithColorBlob = new Blob([e.target!.result!.toString().replace("<path", "<path fill=\"" + hexColor + "\"")], {type: "text/plain"});
          }
          myReader.readAsText(b);
        })
      setTimeout(() => {
        console.log(this.iconWithColorBlob);
        const a = document.createElement('a');
        a.style.display = "none";
        a.href = window.URL.createObjectURL(this.iconWithColorBlob);
        a.download = "icon.svg";
        document.body.appendChild(a);
        a.click();
      }, 300);
      }
    );
  }

  patchFavorite() {
    this.store.pipe(select(getFinalIcon)).pipe(take(1)).subscribe(icon => {
      axios.patch('http://localhost:3000/icons/editFavorite', icon, {headers: authHeader()})
        .then(() => {
        })
        .catch(err => {
          authService.jwtExpired(err, this.store, this.router);
        })
      this.store.dispatch(IconActions.seteditmode({ editMode: false}));
      this.store.dispatch(MessageActions.setmessage({ msg: "Icon erfolgreich gespeichert"}));
      this.router.navigateByUrl("profile");
    });
  }

}
