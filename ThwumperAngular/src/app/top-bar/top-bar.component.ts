import { Component, OnInit } from '@angular/core';
import { faList, faCog, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  faList = faList;
  faCog = faCog;
  faUser = faUser;
  faEnvelope = faEnvelope;
  constructor() { }

  ngOnInit() {
  }

}