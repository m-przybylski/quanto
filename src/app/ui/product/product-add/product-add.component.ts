import { Component, ChangeDetectionStrategy } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ProductService } from '../../../core/product/product.service'
import { Price, ProductCategory } from '../../../core/product/products'
import { ProductCategoryService } from '../../../core/product/product-category.service'
import { MessageService } from 'primeng/components/common/messageservice'
import { SelectItem } from 'primeng/api'
import { Observable } from 'rxjs/Observable'

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
  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private messageService: MessageService,
  ) {
    this.productSku = new FormControl('', { validators: Validators.required })
    this.product = new FormGroup({
      productName: new FormControl('', { validators: Validators.required }),
      productSku: this.productSku,
      priceCurrency: new FormControl(),
      priceValue: new FormControl(),
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

  private getFormValue(controllName: string) {
    return this.product.controls[controllName].value
  }
  private get price(): Price {
    return {
      currency: this.product.controls['priceCurrency'].value,
      price: this.product.controls['priceValue'].value,
    }
  }
}
