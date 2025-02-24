import { StripeService } from './../../services/stripe.service';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatStepper, MatStep, MatStepLabel, MatStepperNext, MatStepperPrevious } from '@angular/material/stepper';
import { MatButton } from '@angular/material/button';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { environment } from '../../../environments/environment.development';
import { injectStripe, StripeElementsDirective, StripePaymentElementComponent } from 'ngx-stripe';
import {
  StripeElementsOptions,
  StripePaymentElementOptions
} from '@stripe/stripe-js'
import { UserOrderService } from '../../services/user-order.service';
import { ICreatePaymentIntent } from '../../models/create-payment-intent.model';
import { IPayment } from '../../models/payment.model';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

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
    OrderStatusComponent,
    StripeElementsDirective,
    StripePaymentElementComponent,
  ],
  templateUrl: './pay-order.component.html',
  styleUrl: './pay-order.component.scss'
})
export class PayOrderComponent {

  private stripeService = inject(StripeService);
  private userOrderService = inject(UserOrderService);

  public stripe = injectStripe(environment.stripe.publishKey);

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    appearance: {
      theme: 'flat'
    }
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false
    }
  };

  public totalOrderSignal = this.userOrderService.totalOrderSignal;
  public lastTotal: number = 0;

  createPaymentIntent(event: StepperSelectionEvent) {

    if (event.selectedIndex == 1 && ( !this.elementsOptions.clientSecret ||  this.lastTotal != this.totalOrderSignal())) {

      const amount = this.totalOrderSignal() * 100;

      const paymentIntent: ICreatePaymentIntent = {
        secretKey: environment.stripe.secretKey,
        amount: +amount.toFixed(0),
        currency: 'EUR',
        customer_id: environment.stripe.customer_id
      }

      this.stripeService.createPaymentSheet(paymentIntent).subscribe({
        next: (paymentIntent: IPayment) => {
          this.elementsOptions.clientSecret = paymentIntent.paymentIntentClientSecret;
        }
      })
    }
  }

  payOrder() {

  }



}
