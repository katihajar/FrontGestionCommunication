import { Component, OnInit } from '@angular/core';
import { AuthService } from '../controller/service/auth.service';
import { ChangePasswordService } from '../controller/service/change-password.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{
  currentPassword = '';
  newPassword = '';
  confirmNewPassword = '';
  passwordsMatch = false;
  isSecure = false;

  constructor(private messageService: MessageService,private authService: AuthService, private service: ChangePasswordService) { }

  ngOnInit(): void {

  }
  get dialogpassword(): boolean {
    return this.service.dialogpassword;
  }

  set dialogpassword(value: boolean) {
    this.service.dialogpassword = value;
  }
 
 
  save() {
    this.service.changepass(this.newPassword, this.currentPassword).subscribe((data) => {
      this.dialogpassword = false;
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Mot de passe modifier avec succer'});
        },error=>{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Mot de passe incorrect'});
  });
  }

  cancel() {
    this.dialogpassword = false;
  }

  validatePassword() {
    this.passwordsMatch = this.newPassword === this.confirmNewPassword;

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    this.isSecure = passwordRegex.test(this.newPassword);
  }
}
