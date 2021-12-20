import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  workKey: string = "hello"
  author: string = "author"


  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.route.paramMap.subscribe(params => {
      console.log(this.workKey);
      
      console.log(params);

      this.workKey = params.get("workKey");
      this.author = params.get("author");


      console.log(this.workKey);
    });
  }

}
