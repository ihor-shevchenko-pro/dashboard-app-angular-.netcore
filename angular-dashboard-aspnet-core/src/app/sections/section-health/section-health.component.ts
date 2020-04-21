import { Component, OnInit, OnDestroy } from '@angular/core';
import { Server } from 'src/app/core/models/server';
import { ServerService } from 'src/app/services/server.service';
import { ServerMessage } from 'src/app/core/models/server-message'
import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from 'rxjs/Subscription';


// const SAMPLE_SERVERS = [
//   { id: 1, name: 'dev-web', isOnline: true },
//   { id: 2, name: 'dev-mail', isOnline: false },
//   { id: 3, name: 'prod-web', isOnline: true },
//   { id: 4, name: 'prod-mail', isOnline: true }
// ];

@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: ['./section-health.component.css']
})
export class SectionHealthComponent implements OnInit, OnDestroy {

  constructor(private _serverService: ServerService) { }

  // public servers: Server[] = SAMPLE_SERVERS;

  public servers: Server[];
  public timerSubscription: AnonymousSubscription;

  ngOnInit(): void {
    this.refreshData();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private refreshData() {
    this._serverService.getServers().subscribe(res => {
      this.servers = res;
    });
    this.subscribeToData();
  }

  // Set timer in order to check data in Db every 5s 
  private subscribeToData() {
    this.timerSubscription = Observable.timer(2000).first().subscribe(() => this.refreshData());
  }

  public sendMessage(msg: ServerMessage) {
    this._serverService.handleServerMessage(msg)
      .subscribe(res => console.log('Message sent to server:', msg),
                //  err => console.log('Error:', err));
                 err => err);
  }

}
