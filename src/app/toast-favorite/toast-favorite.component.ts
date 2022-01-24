import { Component, Injectable, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-toast-favorite',
  templateUrl: './toast-favorite.component.html',
  styleUrls: ['./toast-favorite.component.scss'],
})
export class ToastFavoriteComponent {

  constructor(public toastController: ToastController) { }


  async presentToastFavorite() {
    const toast = await this.toastController.create({
      message: 'Added book to your favorites list!',
      position: "top",
      duration: 2000,
    });
    toast.present();
  }

  async presentToastFavoriteFail() {
    const toast = await this.toastController.create({
      message: 'Book is already in your favorites list',
      position: "top",
      duration: 2000,
    });
    toast.present();
  }

}
