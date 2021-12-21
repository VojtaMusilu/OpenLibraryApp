import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from "../services/data.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy {

  workKey: string = "hello"
  author: string = "author"

  message:string;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,private data: DataService) { }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  ngOnInit() {
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message)
    console.log("subscription:");
    console.log(this.message);
    
    this.route.paramMap.subscribe(params => {
      console.log(this.workKey);
      
      console.log(params);

      this.workKey = params.get("workKey");
      this.author = params.get("author");


      console.log(this.workKey);
    });

  }

}
