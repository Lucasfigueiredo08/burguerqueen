import { CalculateTotalPricePipe } from './../../../../pipes/calculate-total-price.pipe';
import { Component, inject } from '@angular/core';
import { UserOrderService } from '../../../../services/user-order.service';
import { TranslateModule } from '@ngx-translate/core';
import { JsonPipe } from '@angular/common';
import { MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable } from '@angular/material/table'
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { IProduct } from '../../../../models/product.model';
import { Router } from '@angular/router';
import { IQuantityProduct } from '../../../../models/quantity-product.model';
import { MatDialog } from '@angular/material/dialog'
import { DialogExtrasComponent } from '../../../dialogs/dialog-extras/dialog-extras.component';

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [
    TranslateModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatCellDef,
    CalculateTotalPricePipe, 
    MatMiniFabButton,
    MatIcon
  ],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.scss'
})
export class OrderStatusComponent {

  private userOrderService = inject(UserOrderService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  public productsSignal = this.userOrderService.productsSignals;
  public totalOrderSignal = this.userOrderService.totalOrderSignal;
  public displayedColumns: string[] = ['name', 'price', 'quantity', 'total'];


  oneLessProduct(event: MouseEvent, product: IProduct) {
    event.stopPropagation();
    this.userOrderService.oneLessProduct(product);

    if(this.productsSignal().length == 0) {
      this.router.navigateByUrl('/categories');
    }
  }

  oneMoreProduct(event: MouseEvent, product: IProduct) {
    event.stopPropagation();
    this.userOrderService.oneMoreProduct(product);
  }

  showExtras(row: IQuantityProduct) {
    console.log(row);

    if(row.product.extras) {

      const extraBlocks = row.product.extras.flatMap((extra) => extra.blocks);

      this.dialog.open(DialogExtrasComponent, {
        data: {
          extraBlocks
        }
      })

    }
  }


}
