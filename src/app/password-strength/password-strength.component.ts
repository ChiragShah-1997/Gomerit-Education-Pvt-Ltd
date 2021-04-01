import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css']
})
export class PasswordStrengthComponent implements OnInit {
  constructor() { }
  @Input() public passwordCheck: string;
  @Output() Strength = new EventEmitter<boolean>();
  length0: string;
  length1: string;
  length2: string;
  length3: string;
  message='';
  private colors = ['red', 'darkorange', 'green', 'darkgreen'];

  private static Strengths(p) {
    let checklen = 0;
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;

    const lowerLetters = /[a-z]+/.test(p);
    const upperLetters = /[A-Z]+/.test(p);
    const numbers = /[0-9]+/.test(p);
    const symbols = regex.test(p);

    const flags = [lowerLetters, upperLetters, numbers, symbols];

    let Passwordmaches = 0;
    for (const flag of flags) {
      Passwordmaches += flag === true ? 1 : 0;
    }

    checklen += 2 * p.length + ((p.length >= 10) ? 1 : 0);
    checklen += Passwordmaches * 10;

    //Check length
    checklen = (p.length <= 6) ? Math.min(checklen, 3) : checklen;


    checklen = (Passwordmaches === 1) ? Math.min(checklen, 10) : checklen;
    checklen = (Passwordmaches === 2) ? Math.min(checklen, 20) : checklen;
    checklen = (Passwordmaches === 3) ? Math.min(checklen, 30) : checklen;
    checklen = (Passwordmaches === 4) ? Math.min(checklen, 40) : checklen;

    return checklen;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    debugger;
     const password = changes.passwordCheck.currentValue;
     this.setBarColors(4, '#DDD');
     if (password) {
       const c = this.getColor(PasswordStrengthComponent.Strengths(password));
       this.setBarColors(c.idx, c.col);

       const pwdStrength = PasswordStrengthComponent.Strengths(password);

       if(pwdStrength>=30)
       {
       this.Strength.emit(true)
       }
       else
       {
         this.Strength.emit(false)
       }
       switch (c.idx) {
         case 1:
           this.message = 'Weak'+'(Ex:Bhavik@12345)';
           break;
         case 2:
           this.message = 'Average' +'(Ex:Bhavik@12345)';
           break;
         case 3:
           this.message = 'Good' +'(Ex:Bhavik@12345)';
           break;
         case 4:
           this.message = 'Strong';
           break;
       }
     } else {
       this.message = '';
     }
   }

   private getColor(s) {
     let idx = 0;
     if (s <= 10) {
         idx = 0;
     } else if (s <= 20) {
         idx = 1;
     } else if (s <= 30) {
         idx = 2;
     } else if (s <= 40) {
         idx = 3;
     } else {
         idx = 4;
     }
     return {
         idx: idx + 1,
         col: this.colors[idx]
     };
   }

   private setBarColors(count, col) {
     for (let n = 0; n < count; n++) {
         this['length' + n] = col;
     }
   }

}
