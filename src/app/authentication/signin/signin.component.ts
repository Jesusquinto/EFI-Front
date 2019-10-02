import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppService } from 'src/app/services/app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
declare const jQuery: any;

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

    public Toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
    public datos: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private appService: AppService,
        private authService: AuthService) {
        this.appService.closeSpinner();
        this.datos = this.formBuilder.group({
            username: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required])],
        });
    }

    ngOnInit() {


        (function ($) {
            "use strict";


            /*==================================================================
            [ Focus input ]*/
            $('.input100').each(function () {
                $(this).on('blur', function () {
                    if ($(this).val().trim() != "") {
                        $(this).addClass('has-val');
                    } else {
                        $(this).removeClass('has-val');
                    }
                })
            })


            /*==================================================================
            [ Validate ]*/
            const input = $('.validate-input .input100');

            $('.validate-form').on('submit', function () {
                var check = true;

                for (var i = 0; i < input.length; i++) {
                    if (validate(input[i]) == false) {
                        showValidate(input[i]);
                        check = false;
                    }
                }

                return check;
            });


            $('.validate-form .input100').each(function () {
                $(this).focus(function () {
                    hideValidate(this);
                });
            });

            function validate(input) {
                if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
                    if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                        return false;
                    }
                }
                else {
                    if ($(input).val().trim() == '') {
                        return false;
                    }
                }
            }

            function showValidate(input) {
                var thisAlert = $(input).parent();

                $(thisAlert).addClass('alert-validate');
                $(".erroe_dis").remove();
                $(".alert-validate").append('<i class="material-icons erroe_dis">error</i>');
            }

            function hideValidate(input) {
                var thisAlert = $(input).parent();

                $(thisAlert).removeClass('alert-validate');
                $(".erroe_dis").remove();
            }

            /*==================================================================
            [ Show pass ]*/
            var showPass = 0;
            $('.btn-show-pass').on('click', function () {
                if (showPass == 0) {
                    $(this).next('input').attr('type', 'text');
                    $(this).addClass('active');
                    showPass = 1;
                }
                else {
                    $(this).next('input').attr('type', 'password');
                    $(this).removeClass('active');
                    showPass = 0;
                }

            });


        })(jQuery);
    }


    public login() {
        if (this.datos.valid) {
            console.log(this.datos.value);
            this.appService.openSpinner();
            this.appService.login({username: this.datos.value.username, password: this.datos.value.password}).subscribe(
                result => {
                    console.log(result);
                    this.appService.closeSpinner();
                    this.Toast.fire({ type: 'success', title: `Bienvenido ${result.nombre}` });
                    this.authService.setToken(result.access_token);
                    this.appService.goTo('empresa');
                },
                error => {
                    this.appService.closeSpinner();
                    this.Toast.fire({ type: 'error', title: 'Credenciales incorrectas' });
                }
            );
        } else {
            this.Toast.fire({ type: 'error', title: 'Resvise los campos' });
            this.markFormGroupTouched(this.datos);
        }
    }

    private markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }

}
