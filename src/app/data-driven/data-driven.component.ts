import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

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

    genders = [
        'male',
        'female'
    ];

    constructor() {
        this.myForm = new FormGroup({
            'userData': new FormGroup({
                'username': new FormControl('Dmitry', Validators.required),
                'email': new FormControl('dmitry@test.com', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
            }),
            'password': new FormControl('', Validators.required),
            'gender': new FormControl('female'),
            'hobbies': new FormArray([
                new FormControl('Cooking', Validators.required),
                new FormControl('Biking', Validators.required)
            ])
        });
    }

    onSubmit() {
        console.log(this.myForm.value);
    }

    onAddHobby() {
        (<FormArray>this.myForm.controls['hobbies']).push(new FormControl('', Validators.required));
    }
}
