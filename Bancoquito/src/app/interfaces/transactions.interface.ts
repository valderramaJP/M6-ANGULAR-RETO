// Interfaz para transacciones generales con cuenta y valor
export interface IGeneralTransaction {
    cuentaAsociada: string;
    valor: number;
  }
  
  // Interfaz para transferencias entre cuentas
  export interface ITransferTransaction {
    cuentaOrigen: string;
    cuentaDestino: string;
    valor: number;
  }
  
  // Interfaz para consultar últimas transacciones
  export interface ILast5Transactions {
    nroCuenta: string;
  }

  export interface IGeneralResponse {
    mensaje: string;
  }

  // Interfaz para las transacciones
  export interface IResponse5Transactions {
    tipoTransaccion: string;
    valor: number;
    comision: number;
    fecha: string;
    hora: string;

  }
