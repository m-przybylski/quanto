import {
  Injectable,
  InjectionToken,
  Injector,
  ComponentRef,
} from '@angular/core'
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay'
import { ComponentPortal, ComponentType } from '@angular/cdk/portal'
import { DialogOverlayRef } from './dialog-overlay-ref'
import { PortalInjector } from '@angular/cdk/portal'
import { Quote } from '../../core/quote/quote'

export const DIALOG_DATA = new InjectionToken<Quote>('DIALOG_DATA')

export interface DialogConfig {
  width?: number | string
  height?: number | string
  data?: Quote
}

const DEFAULT_CONFIG: DialogConfig = {
  width: '75vw',
  height: '85vh',
  data: null,
}
@Injectable()
export class DialogService {
  constructor(private overlay: Overlay, private injector: Injector) {}
  public open<T>(component: ComponentType<T>, config: DialogConfig = {}) {
    const dialogConfig = { ...DEFAULT_CONFIG, ...config }
    const overlayRef = this.createOverlay(dialogConfig)
    const dialogRef = new DialogOverlayRef(overlayRef)
    this.attachDialogContainer(overlayRef, dialogConfig, dialogRef, component)
    return dialogRef
  }

  private getOverlayConfig(config: DialogConfig): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically()

    const overlayConfig = new OverlayConfig({
      width: config.width,
      height: config.height,
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
    })

    return overlayConfig
  }
  private createOverlay(config: DialogConfig) {
    const overlayConfig = this.getOverlayConfig(config)
    return this.overlay.create(overlayConfig)
  }
  private createInjector<T>(
    config: DialogConfig,
    dialogRef: DialogOverlayRef<T>,
  ): PortalInjector {
    const injectionTokens = new WeakMap()
    injectionTokens.set(DialogOverlayRef, dialogRef)
    injectionTokens.set(DIALOG_DATA, config.data)
    return new PortalInjector(this.injector, injectionTokens)
  }

  private attachDialogContainer<T>(
    overlayRef: OverlayRef,
    config: DialogConfig,
    dialogRef: DialogOverlayRef<T>,
    component: ComponentType<T>,
  ) {
    const injector = this.createInjector<T>(config, dialogRef)
    const containerPortal = new ComponentPortal(component, null, injector)
    const containerRef: ComponentRef<T> = overlayRef.attach(containerPortal)
    overlayRef.backdropClick().subscribe(_ => dialogRef.close())
    return containerRef.instance
  }
}
