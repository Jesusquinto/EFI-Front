export class Usuario {


    constructor(usuario?: string, password?:string){
        this.usuario = usuario;
        this.password = password;
    }    


    id: number;
    documento: string;
    password: any;
    nombre: string;
    apellido: string;
    usuario: string;
    email: any;
    empresa: any;
    rol: number;
  }