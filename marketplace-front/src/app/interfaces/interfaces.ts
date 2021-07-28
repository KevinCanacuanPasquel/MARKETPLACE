

export interface RespuestaAgrupaciones {
  ok: boolean;
  pagina: number;
  agrupaciones: Agrupacion[];
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
}