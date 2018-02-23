import { Component, ChangeDetectionStrategy } from '@angular/core'
import { MessageService } from 'primeng/components/common/messageservice'

@Component({
  selector: 'qto-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HomeComponent {
  constructor(private service: MessageService) {
    this.service.messageObserver.subscribe(console.log)
  }
}
