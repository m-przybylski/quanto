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
import { Price, ProductCategory, Product } from '../../../core/product/products'
import { ProductCategoryService } from '../../../core/product/product-category.service'
import { MessageService } from 'primeng/components/common/messageservice'
import { SelectItem } from 'primeng/api'
import { Observable } from 'rxjs/Observable'
import { map, take } from 'rxjs/operators'
import { Router } from '@angular/router'

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

  public currencyListArray: SelectItem[][]
  public productCategory$: Observable<ProductCategory[]>

  private currencyList: SelectItem[]
  public disableAdd = false
  public disableRemove = true
  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
    this.productCategory$ = this.productCategoryService.getProductCategories()
    this.currencyListArray = [this.currencyList] = [
      [{ label: 'USD', value: 'USD' }, { label: 'EUR', value: 'EUR' }],
    ]

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
      productCategoryCtrl: new FormControl(),
    })
  }

  public postProduct() {
    this.productService
      .addProduct({
        sku: this.getFormValue('productSku'),
        name: this.getFormValue('productName'),
        price: this.price,
        description: this.getFormValue('description'),
        category: this.getFormValue('productCategoryCtrl'),
      })
      .catch(message => {
        console.log(message)
        this.messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: message,
        })
      })
      .then(() => {
        this.router.navigate(['products'])
      })
  }
  public addPrice(i: number): FormArray {
    const usedCurencyList = this.prices.controls.map(
      control => control.value.currency,
    )
    this.currencyList = this.currencyList.filter(
      item => !usedCurencyList.includes(item.value),
    )
    this.currencyListArray.push(this.currencyList)
    this.prices.insert(
      i + 1,
      this.createPriceItem(this.currencyListArray[i][0]),
    )
    // this is bug fix it later
    if (this.currencyListArray.length === 2) {
      this.disableAdd = true
    }
    if (this.currencyListArray.length > 1) {
      this.disableRemove = false
    }
    return this.prices
  }

  public removePrice(i: number): FormArray {
    this.prices.removeAt(i)
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
  private get price(): Price[] {
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
