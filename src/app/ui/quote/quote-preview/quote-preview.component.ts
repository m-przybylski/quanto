import { Component, OnInit, Inject } from '@angular/core'
import { DialogOverlayRef } from '../../../shared/dialog/dialog-overlay-ref'
import { DIALOG_DATA } from '../../../shared/dialog/dialog.service'

@Component({
  selector: 'qto-quote-preview',
  templateUrl: './quote-preview.component.html',
  styleUrls: ['./quote-preview.component.scss'],
})
export class QuotePreviewComponent implements OnInit {
  constructor(
    public dialogRef: DialogOverlayRef<QuotePreviewComponent>,
    @Inject(DIALOG_DATA) a,
  ) {
    console.log(a)
  }

  ngOnInit() {}

  close() {
    this.dialogRef.close()
  }
}
