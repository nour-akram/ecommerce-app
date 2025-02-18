import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../app/Services/auth.service';
// import { ToggleThemeComponent } from "../toggle-theme/toggle-theme.component";

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserLogged().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      console.log(this.isLoggedIn);
    });
  }
  logout() {
    this.authService.logout();
  }
}
