import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  currentUser;
  constructor() { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

}
