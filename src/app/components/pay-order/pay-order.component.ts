import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatStepper, MatStep, MatStepLabel, MatStepperNext, MatStepperPrevious } from '@angular/material/stepper';
import { MatButton } from '@angular/material/button';
import { OrderStatusComponent } from '../order-status/order-status.component';

@Component({
  selector: 'app-pay-order',
  standalone: true,
  imports: [
    TranslateModule, 
    MatStep, 
    MatStepper,
    MatStepLabel,
    MatStepperNext,
    MatStepperPrevious,
    MatButton,
    OrderStatusComponent
  ],
  templateUrl: './pay-order.component.html',
  styleUrl: './pay-order.component.scss'
})
export class PayOrderComponent {

}
