import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../user/service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],   // ⭐ FIXED
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  credentials = {
    username: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.loginUser(
      this.credentials.username,
      this.credentials.password
    ).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.name);

        alert('Login successful');
        this.router.navigate(['/restaurant-listing']);
      },
      error: () => {
        alert('Invalid username or password');
      }
    });
  }
}
