import { Injectable } from '@angular/core';
import { Observable, timer, Subscription, Subject } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;
  private timerSubscription = new Subscription();
  private defaultClearTimer = 7000; // in milliseconds

  constructor(private router: Router) {
      // clear alert message on route change
      router.events.subscribe(event => {
          if (event instanceof NavigationStart) {
              if (this.keepAfterNavigationChange) {
                  // only keep for a single location change
                  this.keepAfterNavigationChange = false;
              } else {
                  // clear alert
                 this.clearAlert();
              }
          }
      });
  }

  success(message: string, keepAfterNavigationChange = true, clearTimer = this.defaultClearTimer) {
    this.timerSubscription.unsubscribe();
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
    // timer to clear alert after # of seconds
    if (clearTimer !== -1) {
        this.timerSubscription = timer(clearTimer).subscribe(x => this.clearAlert());
    }
  }

  warn(message: string, keepAfterNavigationChange = true, clearTimer = this.defaultClearTimer) {
    this.timerSubscription.unsubscribe();
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'warn', text: message });
    // timer to clear alert after # of seconds
    if (clearTimer !== -1) {
        this.timerSubscription = timer(clearTimer).subscribe(x => this.clearAlert());
    }
  }

  error(message: string, keepAfterNavigationChange = true, clearTimer = this.defaultClearTimer) {
    this.timerSubscription.unsubscribe();
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
    // timer to clear alert after # of seconds
    if (clearTimer !== -1) {
        this.timerSubscription = timer(clearTimer).subscribe(x => this.clearAlert());
    }
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  clearAlert() {
    this.subject.next();
  }
}
