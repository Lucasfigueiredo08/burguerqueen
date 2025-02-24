import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from './../../../environments/environment';
import { StripeService } from './../../services/stripe.service';
import { Component, inject, ViewChild } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IOrder } from '../../models/order.model';

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

  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  private stripeService = inject(StripeService);
  private userOrderService = inject(UserOrderService);
  private translateService = inject(TranslateService);
  private snackBar = inject(MatSnackBar);

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

    if (event.selectedIndex == 1 && (!this.elementsOptions.clientSecret || this.lastTotal != this.totalOrderSignal())) {

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

    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,

        redirect: 'if_required'
      })
      .subscribe(result => {

        if (result.error) {
          this.snackBar.open(
            this.translateService.instant('label.payment.error'),
            this.translateService.instant('label.error'),
            {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 5000
            }
          )
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {

            this.snackBar.open(
              this.translateService.instant('label.payment.ok'),
              this.translateService.instant('label.ok'),
              {
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                duration: 5000
              }
            )
            this.createOrder();
          }
        }
      });
  }

  createOrder(){ 

    const order: IOrder = {
      address: 'Rua Santa Catarina 503',
      user: {
        email: 'test@email.com',
        password: '123456'
      },
      products: this.userOrderService.productsSignals();

    }

  }


}
