import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';
import { DataService } from "../services/data.service";
import { Subscription } from 'rxjs';
import { GetWorkService } from '../api/get-work.service';
import { IonRouterOutlet } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { IonicModule } from '@ionic/angular';
import { ToastFavoriteComponent } from '../toast-favorite/toast-favorite.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy {

  KEY_LIBRARY = "my_library";


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
    private routerOutlet: IonRouterOutlet,
    public toast: ToastFavoriteComponent
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


  async onClick(bookKey: string, name : string, author: string, coverKey: string){
  
    var entry = { "key": bookKey, "name": name, "author": author, "coverKey": coverKey };

    var libraryString = (await Storage.get({ key: this.KEY_LIBRARY })).value;

    var library = JSON.parse(libraryString);

    if (library === null) {
      library = []
    }

    if (libraryString === null) {
      libraryString = "";
    }

    if (!libraryString.includes(JSON.stringify(entry))) {
      library.unshift(entry)
      await Storage.set({
        key: this.KEY_LIBRARY,
        value: JSON.stringify(library),
      });
      this.toast.presentToastFavorite();
    }
    else {
      this.toast.presentToastFavoriteFail();
    }
  }

}
