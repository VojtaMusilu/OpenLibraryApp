import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HistoryRecord } from '../models/history-record.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private _storage: Storage | null = null;
  historyArray: HistoryRecord[] = []

  constructor(private storage: Storage) 
  { 
    this.init();
    storage.get('history').then((val) => 
    {
      if(val)
      {
        this.historyArray = JSON.parse(val);
      }
    });
  }


  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public saveRecord(record: HistoryRecord) {
    this.historyArray.unshift(record);
    this._storage?.set('history', JSON.stringify(this.historyArray));
  }

  public getRecord() {
    return this.historyArray;
  }
}