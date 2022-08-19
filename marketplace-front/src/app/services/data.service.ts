import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  constructor() { }

  changeMessage(message: any){
    console.log("Envia el mensaje las plenas", message)
    this.messageSource.next(message);
    
  }
}
