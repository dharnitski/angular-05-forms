import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

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

    constructor(private formBuilder: FormBuilder) {
        this.myForm = new FormGroup({
            'userData': new FormGroup({
                'username': new FormControl('Dmitry', [Validators.required, this.exampleValidator]),
                'email': new FormControl('dmitry@test.com', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
            }),
            'password': new FormControl('', Validators.required),
            'gender': new FormControl('female'),
            'hobbies': new FormArray([
                new FormControl('Cooking', Validators.required, this.asyncExampleValidator),
                new FormControl('Biking', Validators.required)
            ])
        });

        this.myForm.valueChanges.subscribe(
            (data: any) => console.log(data)
        );

        this.myForm.statusChanges.subscribe(
            (data: any) => console.log(data)
        );

        // this.myForm = formBuilder.group(
        //     formBuilder.group({
        //         'userData': formBuilder.group({
        //             'username': formBuilder.control('Dmitry', Validators.required),
        //             'email': formBuilder.control('dmitry@test.com', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
        //         }),
        //         'password': formBuilder.control('', Validators.required),
        //         'gender': formBuilder.control('female'),
        //         'hobbies': formBuilder.array([
        //             formBuilder.control('Cooking', Validators.required),
        //             formBuilder.control('Biking', Validators.required)
        //         ])
        //     })
        // );
    }

    onSubmit() {
        console.log(this.myForm.value);
    }

    onAddHobby() {
        (<FormArray>this.myForm.controls['hobbies']).push(new FormControl('', Validators.required));
    }

    exampleValidator(control: FormControl): { [s: string]: boolean } {
        if (control.value === 'Example') {
            return { example: true };
        }
        return null;
    }

    asyncExampleValidator(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise<any>(
            (resolve, rejects) => {
                setTimeout(() => {
                    if (control.value === 'Example') {
                        resolve({ 'invalid': true });
                    } else {
                        resolve(null);
                    }
                }, 1500)
            }
        );
        return promise;
    }
}
