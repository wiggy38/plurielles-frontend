import { Injectable } from '@angular/core';
import {Message} from "@angular/compiler/src/i18n/i18n_ast";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];
  msgs: Message[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  addMsg(message: Message) {
    this.msgs.push(message);
  }

  addAll(messages: Message[]) {
    for (const message of messages) {
      this.msgs.push(message);
    }
  }

  clear() {
    this.messages = [];
  }

}
