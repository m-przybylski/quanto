import { Component, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'qto-root',
  template: `<router-outlet></router-outlet>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
