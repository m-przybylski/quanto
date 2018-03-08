import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  Renderer2,
  ViewContainerRef,
  ElementRef,
} from '@angular/core'

@Component({
  selector: 'qto-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements AfterViewInit {
  @Input() public menuIcon: string

  @ViewChild('icon', { read: ViewContainerRef })
  private iconRef: ViewContainerRef
  @ViewChild('container', { read: ElementRef })
  private container: ElementRef

  private containerDiv: HTMLDivElement
  private selfTriggered: boolean
  private documentClickListener: () => void
  constructor(private renderer: Renderer2) {}
  toggleMenu() {
    if (this.containerDiv.offsetParent) {
      this.hide()
    } else {
      this.show()
    }
  }
  ngAfterViewInit(): void {
    this.containerDiv = this.container.nativeElement
    this.renderer.setStyle(
      this.container.nativeElement,
      'top',
      `${this.iconRef.element.nativeElement.clientHeight}px`,
    )
    this.renderer.setStyle(this.container.nativeElement, 'right', `0px`)
  }

  private show() {
    this.renderer.setStyle(this.containerDiv, 'display', 'block')
    this.selfTriggered = true
    this.bindDocumentClickListener()
  }

  private hide() {
    this.renderer.setStyle(this.containerDiv, 'display', 'none')
    this.unbindDocumentClickListener()
  }

  private bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = this.renderer.listen(
        'document',
        'click',
        () => {
          if (!this.selfTriggered) {
            this.hide()
          }
          this.selfTriggered = false
        },
      )
    }
  }

  private unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener()
      this.documentClickListener = null
    }
  }
}
