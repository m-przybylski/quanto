import { ErrorHandler, Injectable } from '@angular/core'
import { MessageService } from 'primeng/components/common/messageservice'
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private message: MessageService) {}
  handleError(error) {
    this.message.add(error.message)
    throw error
  }
}
