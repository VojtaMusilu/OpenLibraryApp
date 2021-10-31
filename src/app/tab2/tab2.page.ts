import { Component } from '@angular/core';
import { HistoryService } from '../api/history.service';
import { HistoryRecord } from '../models/history-record.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  historyArray: HistoryRecord[]

  constructor(private historyService: HistoryService) { }

  ionViewWillEnter() {
    console.log('Method ionViewWillEnter was called.');
    this.historyArray = this.historyService.getRecord();
  }

}
