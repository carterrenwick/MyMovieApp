import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-alert',
  animations: [
    trigger(
        'show-hide-animation', [
            transition(':enter', [
                style({opacity: 0}),
                animate('300ms', style({opacity: 1}))
            ]),
            transition(':leave', [
                style({opacity: 1}),
                animate('200ms', style({opacity: 0}))
            ])
        ])
  ],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close() {
    this.alertService.clearAlert();
  }
}
