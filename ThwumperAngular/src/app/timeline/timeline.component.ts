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
  uNameActive = "John";
  dNameActive = "Johnny";
  timeline;
  postInput;

  constructor(
    private userDetailsService: UserDetailsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // Get userId from path
    const userIdFromRoute = this.route.snapshot.paramMap.get('userId');
    // Query DB for user info
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

  // Converts MongoDB Object id to timestamp //
  dateFromObjectId(objectId) {
    if (objectId) {
      let date = new Date(parseInt(objectId.substring(0,8),16) * 1000);
      return date.toDateString();
    } else {
      return "";
    }
  }

  // Post and Reply Methods //
  onPost(userName:string) {
    let postData = {
      body:this.postInput
    }
    
    let response = this.userDetailsService.postTimeline(this.uNameActive, postData);
    const myObserver = {
      next: x => console.log(x),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => this.ngOnInit(),
    };

    response.subscribe(myObserver);
    //clear input
    this.postInput = "";
  }

  onReply(post) {
    post.replyActive = true;
  }

  onCancel(post) {
    post.replyActive = false;
  }

  onSubmitReply(post) {
    post.replyActive = false;

    let postData = {
      uName: this.uNameActive,
      dName: this.dNameActive,
      body: post.replyInput
    }

    let response = this.userDetailsService.postReply(this.uNameActive, post._mid, postData);
    const myObserver = {
      next: x => console.log(x),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => this.ngOnInit(),
    };

    response.subscribe(myObserver);
    post.replyInput = "";
  }

}