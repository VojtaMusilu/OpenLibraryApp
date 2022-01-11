import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';
import { DataService } from "../services/data.service";
import { Subscription } from 'rxjs';
import { GetWorkService } from '../api/get-work.service';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy {

  workKey: string = "hello"
  author: string = "author"
  title: string = "title"
  firstSentence: string = "sentence"
  book: Object = null

  message: string;
  subscription: Subscription;


  constructor(private route: ActivatedRoute, 
    private data: DataService, 
    private getWorkService: GetWorkService, 
    private routerOutlet: IonRouterOutlet
    ) { }

  goBack() {
    this.routerOutlet.pop();
}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(this.workKey);

      console.log(params);
      this.workKey = params.get("workKey");
      console.log(this.workKey);
    });
    
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message)

    var string1 = JSON.stringify(this.message);

    this.book = JSON.parse(string1);

  }

}
