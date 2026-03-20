import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../user/service/user.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],   // ⭐ REQUIRED
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  user = {
    userName: '',
    userPassword: '',
    address: '',
    city: '',
    role: 'USER'
  };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.registerUser(this.user).subscribe({
      next: () => {
        alert("Registration successful");
        this.router.navigate(['/login']);
      },
      error: () => {
        alert("Registration failed");
      }
    });
  }
}
