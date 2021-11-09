

export interface RespuestaAgrupaciones {
  ok: boolean;
  pagina: number;
  agrupaciones: Agrupacion[];
}


export interface RespuestaUsuario {
  ok: boolean;
  usuario: Usuario;
}

export interface Agrupacion {
  fotos?: string[];
  _id?: string;
  nombre?: string;
  descripcion?: string;
  numintegrantes?: number;
  tiempoexistente?: string;
  estasuscrito?: number;
  usuario?: Usuario;
}

export interface Usuario {
  estado?: number;
  _id?: string;
  nombres?: string;
  apellidos?: string;
  correo?: string;
  fecha_nacimiento?: string;
  contrasena?: string;
  repContrasena? : string;
  foto? :any;
}


export interface DataUpload {
  name: string;
  ext: string;
  fecha: Date;
  fileBase64: string;
 
}