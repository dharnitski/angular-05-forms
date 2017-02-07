import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'data-driven',
    templateUrl: 'data-driven.component.html',
    styles: [`
    input.ng-invalid {
      border: 1px solid red;
    }
  `]
})
export class DataDrivenComponent {
    myForm: FormGroup;

    constructor() {
        this.myForm = new FormGroup({
            'userData': new FormGroup({
                'username': new FormControl('Dmitry', Validators.required),
                'email': new FormControl('dmitry@test.com', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
            }),
            'password': new FormControl('', Validators.required)
        });
    }

    onSubmit() {
        console.log(this.myForm.value);
    }
}
