import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core'
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
} from '@angular/forms'
import { ProductService } from '../../../core/product/product.service'
import {
  Price,
  Product,
  CurrencyDropDown,
} from '../../../core/product/products'
import { MessageService } from 'primeng/components/common/messageservice'
import { map, take } from 'rxjs/operators'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'qto-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAddComponent {
  public product: FormGroup
  public productSku: FormControl
  public productName: FormControl
  public prices: FormArray

  public currencyListArray: CurrencyDropDown[][]
  public productCategories: CurrencyDropDown[]

  private currencyList: CurrencyDropDown[]
  public disableAdd = false
  public disableRemove = true
  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.productCategories = this.route.snapshot.data.productCategories
    this.productService.getCurrency().subscribe(value => {
      this.currencyListArray = [this.currencyList] = [value]
    })

    this.productSku = new FormControl('', {
      validators: Validators.required,
      asyncValidators: this.ValidateSKU,
      updateOn: 'blur',
    })
    this.productName = new FormControl('', { validators: Validators.required })
    this.prices = new FormArray([
      this.createPriceItem(this.currencyListArray[0][0].value),
    ])
    this.product = new FormGroup({
      productName: this.productName,
      productSku: this.productSku,
      priceCurrency: new FormControl(),
      prices: this.prices,
      description: new FormControl(),
      productCategoryCtrl: new FormControl(this.productCategories[0]),
    })
  }

  public postProduct() {
    this.productService
      .addEditProduct({
        sku: this.getFormValue('productSku'),
        name: this.getFormValue('productName'),
        description: this.getFormValue('description'),
        price: this.getPricesFromForm(),
        categories: [this.getFormValue('productCategoryCtrl')],
      })
      .then(() => {
        this.router.navigate(['products'])
      })
      .catch(message => {
        console.log(message)
        this.messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: message,
        })
      })
  }
  public addPrice(i: number): FormArray {
    const usedCurrencyList = this.prices.controls.map((control: FormGroup) => {
      control.get('currency').disable()
      return control.get('currency').value
    })
    const notUsedCurrencyList = this.currencyList.filter(
      item => !usedCurrencyList.includes(item.value),
    )
    this.currencyListArray.push([...notUsedCurrencyList])
    this.prices.insert(
      i + 1,
      this.createPriceItem(this.currencyListArray[i + 1][0].value),
    )
    if (notUsedCurrencyList.length === 1) {
      this.disableAdd = true
    }
    if (this.currencyListArray.length > 1) {
      this.disableRemove = false
    }
    return this.prices
  }

  public removePrice(i: number): FormArray {
    this.prices.removeAt(i)
    this.prices.controls[this.prices.controls.length - 1].enable()
    this.currencyListArray.pop()
    if (this.currencyList.length > 1) {
      this.disableAdd = false
    }
    if (this.currencyListArray.length === 1) {
      this.disableRemove = true
    }
    return this.prices
  }

  private createPriceItem(selectedItem: any): FormGroup {
    return new FormGroup({
      currency: new FormControl(selectedItem),
      price: new FormControl('', {
        validators: [Validators.required, Validators.min(0)],
      }),
    })
  }
  private getFormValue(controllName: string) {
    return this.product.controls[controllName].value
  }
  private getPricesFromForm(): Price[] {
    return this.prices.controls.map((formGroup: FormGroup) => ({
      currency: formGroup.controls.currency.value,
      price: formGroup.controls.price.value,
    }))
  }
  private ValidateSKU: AsyncValidatorFn = (control: AbstractControl) => {
    return this.productService.getProductBySKU(control.value).pipe(
      take(1),
      map((products: Product[]) => {
        requestAnimationFrame(() => {
          this.cdr.markForCheck()
        })
        return products.length > 0 ? { skuExists: true } : null
      }),
    )
  }
}
