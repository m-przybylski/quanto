import { Component, ChangeDetectorRef, Input, OnInit } from '@angular/core'
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
  ProductCategory,
} from '../../../core/product/products'
import { MessageService } from 'primeng/components/common/messageservice'
import { map, take } from 'rxjs/operators'
import { Router } from '@angular/router'

@Component({
  selector: 'qto-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product
  @Input() productCategories: ProductCategory[]
  @Input() header: string
  public productGroup: FormGroup
  public productSku: FormControl
  public productName: FormControl
  public prices: FormArray

  public currencyListArray: CurrencyDropDown[][]

  private currencyList: CurrencyDropDown[]
  public disableAdd = false
  public disableRemove = true
  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
    this.productService.getCurrency().subscribe(value => {
      this.currencyListArray = [this.currencyList] = [value]
    })
  }

  ngOnInit() {
    this.productSku = new FormControl(
      {
        value: (this.product && this.product.sku) || '',
        disabled: !!this.product,
      },
      {
        validators: Validators.required,
        asyncValidators: this.ValidateSKU,
        // updateOn: 'blur',
      },
    )
    this.productName = new FormControl(
      (this.product && this.product.name) || '',
      {
        validators: Validators.required,
      },
    )
    if (this.product) {
      this.prices = new FormArray([])
      this.currencyListArray = []
      this.product.price.forEach((price, index) => this.addPrice(index, price))
    } else {
      this.prices = new FormArray([
        this.createPriceItem(this.currencyListArray[0][0].value),
      ])
    }
    this.productGroup = new FormGroup({
      productName: this.productName,
      productSku: this.productSku,
      prices: this.prices,
      description: new FormControl(
        (this.product && this.product.description) || '',
      ),
      productCategoryCtrl: new FormControl(
        (this.product && this.product.categories[0]) ||
          this.productCategories[0],
      ),
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
  public addPrice(i: number, value: Price = null): FormArray {
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
      this.createPriceItem(value || this.currencyListArray[i + 1][0].value),
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

  private createPriceItem(selectedItem: Price | any): FormGroup {
    if (typeof selectedItem === 'string') {
      return new FormGroup({
        currency: new FormControl(selectedItem),
        price: new FormControl('', {
          validators: [Validators.required, Validators.min(0)],
        }),
      })
    } else {
      return new FormGroup({
        currency: new FormControl(selectedItem.currency),
        price: new FormControl(selectedItem.price, {
          validators: [Validators.required, Validators.min(0)],
        }),
      })
    }
  }
  private getFormValue(controllName: string) {
    return this.productGroup.controls[controllName].value
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
