export interface ClaimInterface {
  t_documento: string;
  n_documento: number;
  nombres: string;
  apellidos: string;
  celular: number;
  email: string;
  direccion: string;
  m_edad: boolean;
  t_documento_tutor: string;
  n_documento_tutor: number;
  nombres_tutor: string;
  apellidos_tutor: string;
  celular_tutor: number;
  email_tutor: string;
  t_reclamo: string;
  t_consumo: string;
  n_pedido?: number;
  m_reclamado: number;
  descripcion: string;
  detalle: string;
  pedido: string;
  a_adjunto?: File;
  respuesta?: number;
  a_condiciones: number;
  estado?: number;
}
