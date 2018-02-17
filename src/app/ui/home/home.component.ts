import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core'
import { MenuItem, Message } from 'primeng/api'
import { MessageService } from 'primeng/components/common/messageservice'

@Component({
  selector: 'qto-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  constructor(private service: MessageService, private cdr: ChangeDetectorRef) {
    this.service.messageObserver.subscribe(message => {})
  }
}
