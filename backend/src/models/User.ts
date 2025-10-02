export interface User {
  id?: number;
  nombre: string;
  email: string;
  password: string;
  rol_id: number;
}
 export interface Equipment {
  id_usuario: number;
  nombre: string;
  marca: string;
  modelo: string;
  numero_serie: string;
  responsable_id: number;
  fecha_registro: Date;
}

export interface CreateEquipmentRequest {
  nombre: string;
  marca: string;
  modelo: string;
  numero_serie: string;
  responsable_id: number;
}

export interface UpdateEquipmentRequest {
  nombre?: string;
  marca?: string;
  modelo?: string;
  numero_serie?: string;
  responsable_id?: number;
}