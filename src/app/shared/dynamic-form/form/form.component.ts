import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core'
import { FormConfig } from '../form-config'
import { FormGroup } from '@angular/forms'
import { FormGroupHeaderComponent } from '../form-controls/form-group-header/form-group-header.component'

@Component({
  selector: 'qto-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public _formConfig: FormConfig[]
  public dynamicForm = new FormGroup({})

  @Input() public formConfig: FormConfig[]
  @Output() save = new EventEmitter()
  @ViewChild('actionTemplate', { read: TemplateRef })
  private actionsTemplate: TemplateRef<any>
  @ViewChild('actions', { read: ViewContainerRef })
  private actions: ViewContainerRef

  constructor(private cfr: ComponentFactoryResolver) {}
  ngOnInit(): void {
    this._formConfig = this.formConfig.map(config => ({
      ...config,
      formGroup: this.dynamicForm,
      formArrayControls:
        config.formArrayControls &&
        config.formArrayControls.map(formArrayControl => ({
          ...formArrayControl,
          formGroup: this.dynamicForm,
        })),
    }))
    const header = this.actions.createComponent(
      this.cfr.resolveComponentFactory(FormGroupHeaderComponent),
    )
    header.instance.headerCaption = 'Actions'
    this.actions.createEmbeddedView(this.actionsTemplate)
  }
  resetForm() {
    this.formConfig = Object.assign({}, this.formConfig)
  }
  saveForm() {
    this.save.emit(this.dynamicForm.getRawValue())
  }
}
