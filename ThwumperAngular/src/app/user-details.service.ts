import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserDetailsService {
  constructor(
    private http: HttpClient,
  ) { }

  getUserDetails(uId) {
    //temp for testing
    if (uId == 0) {return   {"uName": "John","uId": 0}
    } else if (uId == 1) {return {"uName": "Jane","uId": 1}
    } else {return {"uName": "error","uId": -1}}
  }

  getUserByuName(uName) {
    return this.http.get('api/userByuName/' + uName);
  }

  postReply(uName, mId, postData) {
    console.log("reply to post");
    console.log(mId, postData);
    return this.http.post('api/replyPost/' + mId, postData);
  }

  postTimeline(uName, postData) {
    console.log("post to timeline");
    console.log(uName, postData);
    return this.http.post('api/timelinePost/' + uName, postData);
  }

}