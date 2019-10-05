import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';

export function emailValidator(control: FormControl): {[key: string]: any} {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;    
    if (control.value && !emailRegexp.test(control.value)) {
        return {invalidEmail: true};
    }
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        let password= group.controls[passwordKey];
        let passwordConfirmation= group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({mismatchedPasswords: true})
        }
    }
}

export function numberLimits(prms : any) : ValidatorFn{
    return (control: FormControl): {[key: string]: any} => {
    let cantidad = control.value;
    if(cantidad !=null){
    let cadena: string = cantidad.toString();
    if(!isNaN(prms.max) && !isNaN(prms.min)){
        if(cadena.length > prms.max){
            return {maximoExedido : {prms}}
        }else{
            if(cadena.length < prms.min){
                return {minimoExedido : {prms}}
            }else{
                return null;
            }
        }
    }else{
    if(!isNaN(prms.max)){
        if(cadena.length > prms.max){
            return {maximoExedido : {prms}}
        }else{
            return null;
        }
    }else {
        if(!isNaN(prms.min)){
            if(cadena.length < prms.min){
                return {minimoExedido : {prms}}
            }else{return null;}
                    }
                }
            }
        }
    }
};