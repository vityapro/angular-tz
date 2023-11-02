import { Component, inject } from '@angular/core';
import { AlertComponent, AlertModule } from 'ngx-bootstrap/alert';
import { EventService } from "../../data-access";
import { ALERT_MESSAGE_EVENT } from "../../data-access/event.types";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-alert-timeout',
  templateUrl: './alert-timeout.component.html',
  styleUrls: [ './alert-timeout.component.css' ],
  imports: [
    AlertModule,
    CommonModule
  ],
  standalone: true
})

export class AlertTimeoutComponent {

  public alerts: any[] = [];
  private event: EventService = inject(EventService);

  constructor() {
    this.event.listening(ALERT_MESSAGE_EVENT)
      .pipe(takeUntilDestroyed())
      .subscribe((data: any) => {
        this.alerts.push(data.payload);
      });
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}
