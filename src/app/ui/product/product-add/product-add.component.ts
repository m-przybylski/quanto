import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ProductService } from '../../../core/product/product.service'
import { Price, ProductCategory } from '../../../core/product/products'
import { ProductCategoryService } from '../../../core/product/product-category.service'
import { MessageService } from 'primeng/components/common/messageservice'
import { SelectItem } from 'primeng/api'

@Component({
  selector: 'qto-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAddComponent implements OnInit {
  public product: FormGroup
  public productCategory: ProductCategory[]
  public currencyList: SelectItem[]
  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
  ) {
    this.product = new FormGroup({
      productName: new FormControl(),
      productSku: new FormControl(),
      priceCurrency: new FormControl(),
      priceValue: new FormControl(),
      description: new FormControl(),
      productCategoryCtrl: new FormControl(),
    })

    this.currencyList = [
      { label: 'USD', value: 'USD' },
      { label: 'EUR', value: 'EUR' },
    ]
  }

  ngOnInit(): void {
    this.productCategoryService
      .getProductCategories()
      .subscribe(productCategories => {
        this.productCategory = productCategories
        this.cdr.markForCheck()
      })
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
