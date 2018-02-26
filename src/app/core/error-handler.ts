import { ErrorHandler, Injectable } from '@angular/core'

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    // this.message.add(error.message)
    throw error
  }
}
