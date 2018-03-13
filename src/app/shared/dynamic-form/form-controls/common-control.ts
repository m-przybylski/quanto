import { FormGroup, FormControl } from '@angular/forms'
import { ControlConfig } from '../form-config'
import { OnInit } from '@angular/core'
import { NgClass } from '@angular/common'

export class CommonControl implements OnInit {
  formGroup: FormGroup
  formControl: FormControl
  control: ControlConfig

  constructor(private ngClass: NgClass) {}

  ngOnInit(): void {
    this.ngClass.ngClass = [this.control.controlClass, 'form-control-prop']
    this.ngClass.ngDoCheck()
  }
}
