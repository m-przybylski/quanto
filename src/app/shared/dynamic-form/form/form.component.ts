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
    this._formConfig = this.buildForm()
    const header = this.actions.createComponent(
      this.cfr.resolveComponentFactory(FormGroupHeaderComponent),
    )
    header.instance.headerCaption = 'Actions'
    this.actions.createEmbeddedView(this.actionsTemplate)
  }
  resetForm() {
    this._formConfig = this.buildForm()
  }
  saveForm() {
    this.save.emit(this.dynamicForm.getRawValue())
  }
  private buildForm(): FormConfig[] {
    return this.formConfig.map(config => ({
      ...config,
      formGroup: this.dynamicForm,
      formArrayControls:
        config.formArrayControls &&
        Object.assign(config.formArrayControls, {
          formGroup: this.dynamicForm,
        }),
    }))
  }
}
