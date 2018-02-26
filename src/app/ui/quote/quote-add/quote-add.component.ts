import { Component, ChangeDetectionStrategy } from '@angular/core'
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { Product } from '../../../core/product/products'
import { Router, ActivatedRoute } from '@angular/router'
import { QuoteService } from '../../../core/quote/quote.service'
import { Quote, Client, ClientInfo } from '../../../core/quote/quote'
import { Company } from '../../../core/company/company'

@Component({
  selector: 'qto-quote-add',
  templateUrl: './quote-add.component.html',
  styleUrls: ['./quote-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteAddComponent {
  public quote: FormGroup
  public products: Product[]
  public filteredCustomer: Client[]
  public company: Company
  public nextID: number
  public disabled = true
  private clientList: Client[]
  private clientShipGroup: FormGroup
  private clientBillGroup: FormGroup
  public productsArrayCtrl: FormArray
  public clientDetailArray: FormArray
  constructor(
    private quoteService: QuoteService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.company = this.route.snapshot.data.company
    this.products = this.route.snapshot.data.products
    this.nextID = this.route.snapshot.data.nextID || 1
    this.clientList = this.route.snapshot.data.clients
    this.productsArrayCtrl = new FormArray([this.createProductItem()])
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

    this.quote = new FormGroup({
      companyCrtl: new FormControl(this.company[0], {
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

  public addQuote() {
    // build Quote
    const quote: Quote = {
      id: this.quote.controls.quoteNumberCtrl.value,
      company: this.quote.controls.companyCrtl.value,
      created: this.quote.controls.creationDateCtrl.value,
      expiration: this.quote.controls.expirationDateCtrl.value,
      preparedBy: this.quote.controls.preparedByCtrl.value,
      client: this.extractClientInfo(),
      products: this.extractProductInfo(this.productsArrayCtrl),
    }
    this.quoteService.addQuote(quote).then(() => {
      this.router.navigate(['/quote'])
    })
  }
  public addNewProduct(): void {
    this.productsArrayCtrl.push(this.createProductItem())
  }
  public removeProduct(i: number): void {
    this.productsArrayCtrl.removeAt(i)
  }
  public filterCustomer(event) {
    const query = event.query
    this.filteredCustomer = this.clientList.filter(client =>
      client.name.includes(query),
    )
  }
  public selectCustomer(event: Client) {
    this.clientShipGroup.setValue(this.intractPartialClientInfo(event.ship))
    this.clientBillGroup.setValue(this.intractPartialClientInfo(event.bill))
  }
  private extractClientInfo(): Client {
    let name = this.quote.controls.clientCtrl.value
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
  private extractProductInfo(
    array: FormArray,
  ): { product: Product; quantity: number }[] {
    return array.controls.map((control: FormGroup) => ({
      product: control.controls.productCtrl.value,
      quantity: control.controls.productQtyCtrl.value,
    }))
  }

  private createProductItem(): FormGroup {
    return new FormGroup({
      productCtrl: new FormControl(this.products[0]),
      productQtyCtrl: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
    })
  }
}
