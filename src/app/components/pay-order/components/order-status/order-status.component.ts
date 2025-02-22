import { Component, inject } from '@angular/core';
import { UserOrderService } from '../../../../services/user-order.service';
import { TranslateModule } from '@ngx-translate/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [
    TranslateModule,
    JsonPipe
  ],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.scss'
})
export class OrderStatusComponent {

  private userOrderService = inject(UserOrderService);

  public productsSignal = this.userOrderService.productsSignals;
  public totalOrderSignal = this.userOrderService.totalOrderSignal;


}
