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

@Component({
  selector: 'qto-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAddComponent {
  public product: FormGroup
  public productCategory$: Observable<ProductCategory[]>
  public currencyList: SelectItem[]
  public productSku: FormControl
  public prices: FormArray
  public disableAdd = false
  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
  ) {
    this.productSku = new FormControl('', {
      validators: Validators.required,
      asyncValidators: this.ValidateSKU,
    })
    this.prices = new FormArray([this.createPriceItem()])
    this.product = new FormGroup({
      productName: new FormControl('', { validators: Validators.required }),
      productSku: this.productSku,
      priceCurrency: new FormControl(),
      prices: this.prices,
      description: new FormControl(),
      productCategoryCtrl: new FormControl(),
    })

    this.currencyList = [
      { label: 'USD', value: 'USD' },
      { label: 'EUR', value: 'EUR' },
    ]
    this.productCategory$ = this.productCategoryService.getProductCategories()
  }

  public onSubmit() {
    this.productService
      .addProduct({
        sku: this.getFormValue('productSku'),
        name: this.getFormValue('productName'),
        price: [this.price],
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
  }
  public addPrice(i: number) {
    this.prices.insert(i + 1, this.createPriceItem())
    if (this.prices.length === this.currencyList.length) {
      this.disableAdd = true
    }
  }
  private createPriceItem(): FormGroup {
    return new FormGroup({
      currency: new FormControl(),
      price: new FormControl('', {
        validators: [Validators.required, Validators.min(0)],
      }),
    })
  }
  private getFormValue(controllName: string) {
    return this.product.controls[controllName].value
  }
  private get price(): Price {
    return {
      currency: this.product.controls['priceCurrency'].value,
      price: this.product.controls['priceValue'].value,
    }
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
