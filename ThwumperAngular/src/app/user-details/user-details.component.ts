import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserDetailsService } from "../user-details.service";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"]
})
export class UserDetailsComponent implements OnInit {
  userDetails;
  id;
  uName;
  dName;

  constructor(
    private route: ActivatedRoute,
    private userDetailsService: UserDetailsService
  ) {}

  ngOnInit() {
    const userIdFromRoute = this.route.snapshot.paramMap.get('userId');
    console.log(userIdFromRoute)
    this.userDetails = this.userDetailsService.getUserByuName(userIdFromRoute);

    const myObserver = {
      next: x => {
        this.id = x._id,
        this.uName = x.uName,
        this.dName = x.dName
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };
    this.userDetails.subscribe(myObserver)

  }
}
