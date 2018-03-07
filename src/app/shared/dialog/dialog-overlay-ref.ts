import { OverlayRef } from '@angular/cdk/overlay'

export class DialogOverlayRef<T> {
  componentInstance: T
  constructor(private overlayRef: OverlayRef) {}
  close() {
    this.overlayRef.dispose()
  }
}
