import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {IconActions} from "../../../../state/icon/icon.actions";
import axios from "axios";
import {getCurrentStep, getFinalIcon} from "../../../../state/icon/icon.selectors";
import {take} from "rxjs";
import {AppState} from "../../../../state/app.state";
import authService from "../../../../services/auth.service";
import {MessageActions} from "../../../../state/message/message.actions";
import authHeader from "../../../../services/auth-headers";

@Component({
  selector: 'app-icon-props',
  templateUrl: './icon-props.component.html',
  styleUrls: ['./icon-props.component.css']
})
export class IconPropsComponent implements OnInit, AfterViewInit {

  @Input() deleteIcons: boolean = false;
  @Input() refId: string = '';
  @Input() editIdx: number = 0;
  @Input() editFavorites: boolean = false;
  @Input() icon: string = '';
  @Input() color: string = '';
  @Input() fill: number = 0;
  @Input() weight: number = 400;
  @Output() iconRemoved = new EventEmitter<string>();


  constructor(private store: Store<AppState>, private router: Router) {
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    let el = document.getElementById(this.refId);
    let editIcon = document.getElementById(this.refId + "overlay");
    editIcon!.style.display = "none";
    el!.onmouseover = function () {
      editIcon!.style.display = "block";
      el!.style.filter = "blur(3px)"
    }
    el!.onmouseleave = function () {
      editIcon!.style.display = "none";
      el!.style.filter = "blur(0px)"
    }
    editIcon!.onmouseover = function () {
      editIcon!.style.display = "block";
      el!.style.filter = "blur(3px)"
    }
    editIcon!.onmouseleave = function () {
      editIcon!.style.display = "none";
      el!.style.filter = "blur(0px)"
    }
  }

  overlayIcon() {
    return this.deleteIcons ? 'delete' : 'tune';
  }

  changeOrDeleteIcon() {
    /**
     * reset, because user can switch from zusammenfassung zu profile and back
     * Zusammenfassung with new icon is still shown but not the steps
     */
    this.store.dispatch(IconActions.reset());
    this.store.dispatch(IconActions.seteditmode({editMode: true}));
    this.store.dispatch(IconActions.seteditidx({editIdx: this.editIdx.toString()}));
    this.store.dispatch(IconActions.seticon({icon: this.icon}));
    this.store.dispatch(IconActions.setfill({fill: this.fill}));
    this.store.dispatch(IconActions.setcolor({color: this.color}));
    this.store.dispatch(IconActions.setweight({weight: this.weight}));

    if (this.deleteIcons) {
      let url = 'http://localhost:3000/icons/delete';
      if (this.editFavorites) {
        url += 'Favorite';
      } else {
        url += 'History';
      }
      this.store.pipe(select(getFinalIcon)).pipe(take(1)).subscribe(finalIcon => {
        axios.patch(url, finalIcon, {headers: authHeader()})
          .then(() => {
            this.store.dispatch(MessageActions.setmessage({msg: 'Icon erfolgreich gelöscht'}))
            this.iconRemoved.emit();
          })
          .catch(err => {
            authService.jwtExpired(err, this.store, this.router);
          });
      });
    } else {
      this.router.navigateByUrl('');
    }

  }

}
