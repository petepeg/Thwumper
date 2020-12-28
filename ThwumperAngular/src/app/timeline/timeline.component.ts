import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserDetailsService } from '../user-details.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  userDetails;
  uName;
  dName;
  timeline;
  postInput;

  constructor(
    private userDetailsService: UserDetailsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const userIdFromRoute = this.route.snapshot.paramMap.get('userId');
    let response = this.userDetailsService.getUserByuName(userIdFromRoute);

    const myObserver = {
      next: x => {
        this.userDetails = x,
        this.uName = this.userDetails.uName,
        this.dName = this.userDetails.dName,
        this.timeline = this.userDetails.timeline
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };
    response.subscribe(myObserver)
  }

  dateFromObjectId(objectId) {
    if (objectId) {
      let date = new Date(parseInt(objectId.substring(0,8),16) * 1000);
      return date.toDateString();
    } else {
      return "";
    }
  }

  hideShowElement(element:HTMLElement) {
    (element.style.display === 'none') ? (element.style.display = 'block'):(element.style.display = 'none');
  }

  onPost(userName:string) {
    let postData = {
      body:this.postInput
    }
    let response = this.userDetailsService.postTimeline(this.uName, postData);
    const myObserver = {
      next: x => console.log(x),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => this.ngOnInit(),
    };
    response.subscribe(myObserver);
    //clear input
    this.postInput = "";
  }

  onReply(mId:number) {
    let replyButton = document.getElementById("replyButton" + mId);
    this.hideShowElement(replyButton);

    let replyBox = document.getElementById("replyBox" + mId);
    this.hideShowElement(replyBox);
  }

  onCancel(mId:number) {
    let replyBox = document.getElementById("replyBox" + mId);
    this.hideShowElement(replyBox);
    
    let replyButton = document.getElementById("replyButton" + mId);
    this.hideShowElement(replyButton);
  }

  onSubmitReply(mId:number) {
    let replyBox = document.getElementById("replyBox" + mId);
    this.hideShowElement(replyBox);

    let replyButton = document.getElementById("replyButton" + mId);
    this.hideShowElement(replyButton);
    
    let input = (<HTMLInputElement>document.getElementById("input" + mId)).value;
    //temp vars
    let userName = "John";
    let displayName = "Johnny";

    let postData = {
      uName: userName,
      dName: displayName,
      body: input
    }
    let response = this.userDetailsService.postReply(userName, mId, postData);
    const myObserver = {
      next: x => console.log(x),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => this.ngOnInit(),
    };
    response.subscribe(myObserver);
  }

}