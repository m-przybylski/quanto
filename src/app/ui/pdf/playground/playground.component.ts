import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Injector,
} from '@angular/core'
import { JsPDF } from '../../../core/pdf/js-pdf.service'

@Component({
  selector: 'qto-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
})
export class PlaygroundComponent implements OnInit {
  constructor(private JsPdf: JsPDF, private injector: Injector) {}
  @ViewChild('preview') private entry: ElementRef
  @ViewChild('text') private text: ElementRef

  ngOnInit() {
    console.log(this.text.nativeElement)
    this.text.nativeElement.value = ``
  }

  public getPreview() {
    this.injector.get(JsPDF)
    this.JsPdf = new JsPDF({
      orientation: 'p',
      format: 'a4',
      unit: 'pt',
      compressPdf: false,
    })
    /**
     * this.JsPdf.setFontSize(10)
     * this.JsPdf.text('hello', 1, 10 )
     * this.JsPdf.text('hello', 1, 20 )
     * this.JsPdf.text('hello', 1, 30 )
     * this.JsPdf.text('hello', 1, 40 ).rect(50, 50, 10, 10, 'DF')
     * this.JsPdf.lines([[10,10,20,0,0,20]], 1, 40 )
     */
    // tslint:disable-next-line:no-eval
    eval(
      'try{' +
        this.text.nativeElement.value +
        '} catch(e) { console.error(e.message,e.stack,e); }',
    )
    this.entry.nativeElement.setAttribute('src', this.JsPdf.output('bloburi'))
  }
}
