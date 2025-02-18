import { Component } from '@angular/core';
import { ThemeService } from '../../app/Services/theme.service';

@Component({
  selector: 'app-toggle-theme',
  imports: [],
  templateUrl: './toggle-theme.component.html',
  styleUrl: './toggle-theme.component.scss'
})
export class ToggleThemeComponent {

  isDarkMode = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // this.themeService.isDarkMode$.subscribe((isDark) => {
    //   this.isDarkMode = isDark;
    // });
  }

  toggleTheme() {
    // this.themeService.toggleTheme();
  }
}
