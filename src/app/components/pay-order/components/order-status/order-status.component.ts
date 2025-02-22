import { CalculateTotalPricePipe } from './../../../../pipes/calculate-total-price.pipe';
import { Component, inject } from '@angular/core';
import { UserOrderService } from '../../../../services/user-order.service';
import { TranslateModule } from '@ngx-translate/core';
import { JsonPipe } from '@angular/common';
import { MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable } from '@angular/material/table'

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
    CalculateTotalPricePipe
  ],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.scss'
})
export class OrderStatusComponent {

  private userOrderService = inject(UserOrderService);

  public productsSignal = this.userOrderService.productsSignals;
  public totalOrderSignal = this.userOrderService.totalOrderSignal;
  public displayedColumns: string[] = ['name', 'price', 'quantity', 'total'];


}
