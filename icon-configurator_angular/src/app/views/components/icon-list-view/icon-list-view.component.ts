import {Component, Input, OnInit} from '@angular/core';
import axios from "axios";
import authHeader from "../../../../services/auth-headers";
import authService from "../../../../services/auth.service";
import {select, Store} from "@ngrx/store";
import {getEditIdX, getFinalIcon} from "../../../../state/icon/icon.selectors";
import {take} from "rxjs";
import {AppState} from "../../../../state/app.state";
import {Router} from "@angular/router";

@Component({
  selector: 'app-icon-list-view',
  templateUrl: './icon-list-view.component.html',
  styleUrls: ['./icon-list-view.component.css']
})
export class IconListViewComponent implements OnInit {

  @Input() api_url: string = '';
  icons: any = [];
  filteredIcons: string[] = [];
  deleteIcons: boolean = false;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.loadIcons();
  }

  loadIcons(){
    setTimeout(() => {
      axios.get('http://localhost:3000/icons/'+this.api_url, { headers: authHeader() })
        .then(res => {
          this.icons = res.data.icons;
        })
        .catch(err => {
          authService.jwtExpired(err, this.store, this.router);
        });
    }, 100);
  }

  removeDeletedIcon(){
    this.store.pipe(select(getEditIdX)).pipe(take(1)).subscribe(editIdx => {
      this.icons.splice(+editIdx, 1);
    });
  }

}
