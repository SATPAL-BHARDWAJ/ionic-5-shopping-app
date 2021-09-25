import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  storeKeys = {
    user: "user",
  }

  user: any = {};
  cart_count: number = 0;
  
  constructor(
    public store: StoreService
  ) { }

  set(key: string, value: any) {
    this[key] = value;
    this.store.set(key, value);
  }

  remove(key: string) {
    this[key] = null;
    this.store.remove(key);
  }

  get(key: string) {
    return new Promise((resolve, reject)=>{

      this.store.get(key).then((result) => {
        this[key] = result;
        resolve(result);
      }).catch((err) => {
        reject(err);
      });

    })
  }

}
