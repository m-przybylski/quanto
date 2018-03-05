import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core'
import { Company } from '../../../core/company/company'
import { Product } from '../../../core/product/products'
import { Client, Quote, ClientInfo } from '../../../core/quote/quote'
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms'
import { MessageService } from 'primeng/components/common/messageservice'

@Component({
  selector: 'qto-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteFormComponent implements OnInit {
  @Input() companyList: Company[] = []
  @Input() productList: Product[] = []
  @Input() clientList: Client[] = []
  @Input() nextID: number
  @Input() quote: Quote
  @Output() save: EventEmitter<Quote> = new EventEmitter<Quote>()
  public filteredCustomer: Client[]
  public quoteForm: FormGroup
  private clientShipGroup: FormGroup
  private clientBillGroup: FormGroup
  public productsArrayCtrl: FormArray
  public clientDetailArray: FormArray
  constructor(private errorMessageService: MessageService) {}
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
    this.clientShipGroup = new FormGroup(this.generateClientDetailForm())
    this.clientBillGroup = new FormGroup(this.generateClientDetailForm())
    this.clientDetailArray = new FormArray([])

    this.productsArrayCtrl = new FormArray([this.createProductItem()])
    this.quoteForm = new FormGroup({
      companyCrtl: new FormControl(this.companyList[0], {
        validators: Validators.required,
      }),
      quoteNumberCtrl: new FormControl({
        value: this.nextID,
        disabled: true,
      }),
      creationDateCtrl: new FormControl({
        value: new Date(),
        disabled: true,
      }),
      expirationDateCtrl: new FormControl(),
      preparedByCtrl: new FormControl(''),
      clientCtrl: new FormControl('', Validators.required),
      productsArrayCtrl: this.productsArrayCtrl,
      clientDetailArray: this.clientDetailArray,
    })

    if (this.quote) {
      this.quoteForm.setValue({
        companyCrtl: this.quote.company,
        quoteNumberCtrl: this.quote.id,
        creationDateCtrl: this.quote.created,
        expirationDateCtrl: this.quote.expiration || '',
        preparedByCtrl: this.quote.preparedBy || '',
        clientCtrl: this.quote.client,
        productsArrayCtrl: this.quote.products.map(product => ({
          productCtrl: product.product,
          productQtyCtrl: product.quantity,
        })),
        clientDetailArray: {
          clientShipGroup: this.intractPartialClientInfo(
            this.quote.client.ship,
          ),
          clientBillGroup: this.intractPartialClientInfo(
            this.quote.client.bill,
          ),
        },
      })
    }
  }
  public selectCustomer(event: Client) {
    this.customerSelected()
    this.clientShipGroup.setValue(this.intractPartialClientInfo(event.ship))
    this.clientBillGroup.setValue(this.intractPartialClientInfo(event.bill))
  }

  public customerSelected() {
    if (this.clientDetailArray.length === 0) {
      this.clientDetailArray.push(this.clientShipGroup)
      this.clientDetailArray.push(this.clientBillGroup)
    } else {
      console.log(this.quoteForm.controls.clientCtrl.value)
    }
  }
  public filterCustomer(event): void {
    const query = event.query
    this.filteredCustomer = this.clientList.filter(client =>
      client.name.includes(query),
    )
  }
  public addNewProduct(): void {
    this.productsArrayCtrl.push(this.createProductItem())
  }
  public removeProduct(i: number): void {
    this.productsArrayCtrl.removeAt(i)
  }
  public saveQuote() {
    const quote: Quote = {
      id: this.quoteForm.controls.quoteNumberCtrl.value,
      company: this.quoteForm.controls.companyCrtl.value,
      created: this.quoteForm.controls.creationDateCtrl.value,
      expiration: this.quoteForm.controls.expirationDateCtrl.value,
      preparedBy: this.quoteForm.controls.preparedByCtrl.value,
      client: this.extractClientInfo(),
      products: this.extractProductInfo(this.productsArrayCtrl),
    }
    this.save.emit(quote)
  }
  public resetForm() {
    this.ngOnInit()
  }
  private intractPartialClientInfo(info: ClientInfo) {
    return {
      nameCtrl: info.name,
      contanctNameCtrl: info.contanctName,
      contanctEmailCtrl: info.contanctEmail,
      contanctAddressCtrl: info.contanctAddress,
      cityCtrl: info.city,
      postalCodeCtrl: info.postalCode,
      countryCtrl: info.country,
    }
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

  private generateClientDetailForm() {
    return {
      nameCtrl: new FormControl('', Validators.required),
      contanctNameCtrl: new FormControl('', Validators.required),
      contanctEmailCtrl: new FormControl('', Validators.required),
      contanctAddressCtrl: new FormControl('', Validators.required),
      cityCtrl: new FormControl('', Validators.required),
      postalCodeCtrl: new FormControl('', Validators.required),
      countryCtrl: new FormControl('', Validators.required),
    }
  }
  private extractProductInfo(
    array: FormArray,
  ): { product: Product; quantity: number }[] {
    return array.controls.map((control: FormGroup) => ({
      product: control.controls.productCtrl.value,
      quantity: control.controls.productQtyCtrl.value,
    }))
  }
  private extractClientInfo(): Client {
    let name = this.quoteForm.controls.clientCtrl.value
    if (name.name !== undefined) {
      name = name.name
    }
    const result: Client = {
      name,
      ship: this.extractPartialClientInfo(this.clientShipGroup),
      bill: this.extractPartialClientInfo(this.clientBillGroup),
    }
    return result
  }
  private extractPartialClientInfo(group: FormGroup): ClientInfo {
    return {
      name: group.controls.nameCtrl.value,
      contanctName: group.controls.contanctNameCtrl.value,
      contanctEmail: group.controls.contanctEmailCtrl.value,
      contanctAddress: group.controls.contanctAddressCtrl.value,
      city: group.controls.cityCtrl.value,
      postalCode: group.controls.postalCodeCtrl.value,
      country: group.controls.countryCtrl.value,
    }
  }
}
