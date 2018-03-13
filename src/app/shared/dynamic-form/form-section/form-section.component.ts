import {
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
  ChangeDetectionStrategy,
} from '@angular/core'
import { FormConfig } from '../form-config'
import { FormBuilder } from '../form-builder.service'

@Component({
  selector: 'qto-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSectionComponent {
  @Input()
  set formSection(value: FormConfig) {
    this.build(value)
  }

  @ViewChild('entry', { read: ViewContainerRef })
  private entry: ViewContainerRef
  @ViewChild('entryArray', { read: ViewContainerRef })
  private entryArray: ViewContainerRef
  @ViewChild('header', { read: ViewContainerRef })
  private header: ViewContainerRef

  constructor(private formBuilder: FormBuilder) {}
  private build(form: FormConfig) {
    this.formBuilder.build(form, this.entry, this.entryArray, this.header)
  }
}
