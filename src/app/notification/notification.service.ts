import { Injectable, EventEmitter } from '@angular/core';

import { Notification } from './notification';
// EventEmitter facilcate the data binding/transferring between the parent and child components
@Injectable()
export class NotificationService {
    public emitter: EventEmitter<Notification>;

    constructor() {
        this.emitter = new EventEmitter();
    }

    public show(type: string, title: string, content: string) {
        // we grasp the needed information and turn it into a Notification type and emit it
        let note = new Notification(type, title, content);
        this.emitter.emit(note);
    }

}