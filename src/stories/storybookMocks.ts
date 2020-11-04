import { FormBuilder, FormControl, Validators } from '@angular/forms';
export class StorybookMock {
    public static getBookFormMock = () => {
        const bookForm = {
            id: null,
            title:  ['', Validators.required],
            subtitle: '',
            author:  ['', Validators.required],
            published:  ['', Validators.required],
            publisher:  ['', Validators.required],
            pages: ['', Validators.pattern("^[0-9]*$")],
            description: '',
            website: '',
            createdBy: '',
        };
        const fb = new FormBuilder();
        return fb.group(bookForm);
    };


    public static getLoginFormMock = () => {
        const loginForm = {
            email: ['', Validators.required],
            password: ['', Validators.required],
        };
        const fb = new FormBuilder();
        return fb.group(loginForm);
    };

    public static getSignUpFormMock = () => {
        const registerForm = {
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
        };
        const fb = new FormBuilder();
        return fb.group(registerForm);
    };
}