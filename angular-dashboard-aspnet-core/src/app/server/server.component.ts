import { Component, OnInit, Input } from '@angular/core';
import { Server } from '../core/models/server';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  constructor() { }

  public color: string;
  public buttonText: string;
  public serverStatus: string;
  public isLoading: boolean;

  @Input() serverInput: Server;

  ngOnInit(): void {
    this.setServerStatus(this.serverInput.isOnline);
  }

  private setServerStatus(isOnline: boolean) {
    if (isOnline) {
      this.serverInput.isOnline = true;
      this.serverStatus = 'Online';
      this.color = '#66BB6A',
      this.buttonText = 'Shut Down';
    } else {
      this.serverInput.isOnline = false;
      this.serverStatus = 'Offline';
      this.color = '#FF6B6B';
      this.buttonText = 'Start';
    }
  }

  sendServerAction(isOnline: boolean) {
    console.log(this.serverInput.name, 'sendServerAction called!');
    this.setServerStatus(!isOnline);
    // this.makeLoading();
    // const payload = this.buildPayload(isOnline);
    // this.serverAction.emit(payload);
  }

}
