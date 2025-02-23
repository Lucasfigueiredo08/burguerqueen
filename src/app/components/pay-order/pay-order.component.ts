import { StripeElement } from './../../../../node_modules/@stripe/stripe-js/dist/stripe-js/elements-group.d';
import { StripeService } from './../../services/stripe.service';
import { Component } from '@angular/core';
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

  payOrder() {

  }



}
