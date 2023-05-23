export interface ClaimDetailsInterface {
  monto_reclamado: number,
  descripcion: string,
  detalles_reclamo: string,
  pedido: string,
  documento_adjunto?: string,
  respuesta?: string
  correo_enviado?: boolean
  id_reclamo: number
}
