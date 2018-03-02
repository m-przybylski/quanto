import { Component, Input, OnInit } from '@angular/core'
import { Company } from '../../../core/company/company'
import { Product } from '../../../core/product/products'
import { Client, Quote } from '../../../core/quote/quote'
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms'
import { MessageService } from 'primeng/components/common/messageservice'

@Component({
  selector: 'qto-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss'],
})
export class QuoteFormComponent implements OnInit {
  @Input() companyList: Company[] = []
  @Input() productList: Product[] = []
  @Input() clientList: Client[] = []
  @Input() nextID: number
  @Input() quote: Quote

  public filteredCustomer: Client[]
  public quoteForm: FormGroup
  private clientShipGroup: FormGroup
  private clientBillGroup: FormGroup
  public productsArrayCtrl: FormArray
  public clientDetailArray: FormArray

  constructor(private errorMessageService: MessageService) {
    this.clientShipGroup = new FormGroup({
      nameCtrl: new FormControl(),
      contanctNameCtrl: new FormControl(),
      contanctEmailCtrl: new FormControl(),
      contanctAddressCtrl: new FormControl(),
      cityCtrl: new FormControl(),
      postalCodeCtrl: new FormControl(),
      countryCtrl: new FormControl(),
    })
    this.clientBillGroup = new FormGroup({
      nameCtrl: new FormControl(),
      contanctNameCtrl: new FormControl(),
      contanctEmailCtrl: new FormControl(),
      contanctAddressCtrl: new FormControl(),
      cityCtrl: new FormControl(),
      postalCodeCtrl: new FormControl(),
      countryCtrl: new FormControl(),
    })
    this.clientDetailArray = new FormArray([
      this.clientShipGroup,
      this.clientBillGroup,
    ])
  }
  ngOnInit(): void {
    let errorFlag = false
    if (this.productList.length === 0) {
      errorFlag = true
      this.errorMessageService.add({
        detail: 'There is no products please create one',
      })
    }
    if (this.companyList.length === 0) {
      errorFlag = true
      this.errorMessageService.add({ detail: 'Please provice company info' })
    }

    if (errorFlag) {
      return
    }
    this.productsArrayCtrl = new FormArray([this.createProductItem()])
    this.quoteForm = new FormGroup({
      companyCrtl: new FormControl(this.companyList[0], {
        validators: Validators.required,
      }),
      quoteNumberCtrl: new FormControl({ value: this.nextID, disabled: true }),
      creationDateCtrl: new FormControl({ value: new Date(), disabled: true }),
      expirationDateCtrl: new FormControl(),
      preparedByCtrl: new FormControl(),
      clientCtrl: new FormControl('', Validators.required),
      productsArrayCtrl: this.productsArrayCtrl,
      clientDetailArray: this.clientDetailArray,
    })
  }

  private createProductItem(): FormGroup {
    return new FormGroup({
      productCtrl: new FormControl(this.productList[0]),
      productQtyCtrl: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
    })
  }
}
