

export interface RespuestaAgrupaciones {
  ok: boolean;
  pagina: number;
  agrupaciones: Agrupacion[];
}

export interface RespuestaActividades {
  ok: boolean;
  actividades: Actividad[];
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

export interface Actividad {
  nombre?: string;
  arte? : string;
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

export interface Servicio {
  nombre: string;
  descripcion : string;
  valorEstimado: string;
  fotos: any;
  agrupacion: any;
  actividad: any;
  estado : string; 
}