//interface para crear cuenta
export interface IAccount {
    nroCuenta: number;
    tipoCuenta: string;
    saldo: number;
    titular: string;
    documentoTitular: string;
    telefono: string;
    direccion: string;
    email: string;
  }
  
  // Interfaz para crear cuenta respuesta
  export interface IAccountCreate {
    nroCuenta: number;
  }

  // Interfaz para consultar cuenta
  export interface IAccountConsulted {
    titular: string;
    saldo: number;
    tipoCuenta: string;
  }

