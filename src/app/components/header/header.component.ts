import { Component, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon'
import { MatBadge } from '@angular/material/badge';
import { UserOrderService } from '../../services/user-order.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatIcon, MatBadge],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private translateService = inject(TranslateService);
  private userOrderService = inject(UserOrderService);

  public languages: string[] = ['es', 'en'];
  public numProductsSignal: Signal<number> = this.userOrderService.numProductsSignal;

  changeLang(language: string){
    this.translateService.use(language);
  }

}
