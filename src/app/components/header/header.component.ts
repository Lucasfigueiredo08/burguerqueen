import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon'
import { MatBadge } from '@angular/material/badge';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatIcon, MatBadge],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private translateService = inject(TranslateService);

  public languages: string[] = ['es', 'en'];

  changeLang(language: string){
    this.translateService.use(language);
  }

}
