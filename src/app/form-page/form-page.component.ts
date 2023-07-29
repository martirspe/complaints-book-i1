import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services & interfaces
import { ClaimInterface } from '../interfaces/claimInterface';
import { ClaimNumberService } from '../services/claimNumber.service';
import { ClaimsService } from '../services/claims.service';
import { EmailInterface } from '../interfaces/email/emailInterface';
import { SendEmailService } from '../services/email/email.service';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit {

  // Variables
  mEdad: boolean = false;
  cType: boolean = false;
  sSend: boolean = false;
  eSend: boolean = false;
  year = (new Date()).getFullYear();

  // Variables del servicio ClaimNumberService
  tableLength: number = 0; // El número que deseas convertir en una cadena con ceros a la izquierda
  desiredLength: number = 4; // La longitud total deseada de la cadena, incluidos los ceros a la izquierda
  stringWithZeros: string = '';

  // Variables para el envío de correos.
  fromMail: string = '"Alka Corp." <admin@alkacorp.com>';
  bbcMail: string = 'ventas@alkacorp.com';
  // bbcMail: string = '';

  constructor(
    private fb: FormBuilder,
    private claimNumberService: ClaimNumberService,
    private claimsService: ClaimsService,
    private sendEmailService: SendEmailService,
  ) { }

  ngOnInit(): void {
    // Obtén la cadena con ceros directamente desde el servicio
    this.claimNumberService.getTableLength().subscribe(length => {
      this.tableLength = length + 1;
      this.stringWithZeros = this.tableLength.toString().padStart(this.desiredLength, '0');
    });
  }

  public myForm: FormGroup = this.fb.group({
    t_documento: ['DNI', [Validators.required]],
    n_documento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]+')]],
    nombres: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
    apellidos: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
    celular: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]+')]],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    direccion: ['', [Validators.required, Validators.minLength(25)]],
    m_edad: [this.mEdad],
    t_documento_tutor: ['DNI', [Validators.required]],
    n_documento_tutor: ['', [Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]+')]],
    nombres_tutor: ['', [Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
    apellidos_tutor: ['', [Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
    celular_tutor: ['', [Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]+')]],
    email_tutor: ['', [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    t_reclamo: ['Queja', [Validators.required]],
    t_consumo: ['Producto', [Validators.required]],
    n_pedido: ['', [Validators.required]],
    a_adjunto: [''],
    m_reclamado: ['', [Validators.required]],
    descripcion: ['', [Validators.required, Validators.minLength(100)]],
    detalle: ['', [Validators.required, Validators.minLength(50)]],
    pedido: ['', [Validators.required, Validators.minLength(100)]],
    a_condiciones: ['', Validators.requiredTrue],
  });

  isYounger(value: boolean): void {
    this.mEdad = value;
    // console.log(this.menor);
  }

  claimType(): void {
    this.cType = !this.cType;
    // console.log(this.cType);
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }
  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es obligatorio.'
        case 'minlength':
          return `Se requiere ${errors['minlength'].requiredLength} carácteres como mínimo.`
        case 'maxlength':
          return `Se requiere ${errors['maxlength'].requiredLength} carácteres como máximo.`
        case 'pattern':
          return 'Este campo contiene carácteres no permitidos.'
        case 'email':
          return 'No cumple con la estructura de un correo válido.'
      }
      // console.log(key);
    }
    return 'Fuera de validación'
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    // Almacenando datos de los reclamos.
    const claims: ClaimInterface = {
      t_documento: this.myForm.get('t_documento')?.value,
      n_documento: this.myForm.get('n_documento')?.value,
      nombres: this.myForm.get('nombres')?.value,
      apellidos: this.myForm.get('apellidos')?.value,
      celular: this.myForm.get('celular')?.value,
      email: this.myForm.get('email')?.value,
      direccion: this.myForm.get('direccion')?.value,
      m_edad: this.myForm.get('m_edad')?.value,
      t_documento_tutor: this.myForm.get('t_documento_tutor')?.value,
      n_documento_tutor: this.myForm.get('n_documento_tutor')?.value,
      nombres_tutor: this.myForm.get('nombres_tutor')?.value,
      apellidos_tutor: this.myForm.get('apellidos_tutor')?.value,
      celular_tutor: this.myForm.get('celular_tutor')?.value,
      email_tutor: this.myForm.get('email_tutor')?.value,
      t_reclamo: this.myForm.get('t_reclamo')?.value,
      t_consumo: this.myForm.get('t_consumo')?.value,
      n_pedido: this.myForm.get('n_pedido')?.value,
      m_reclamado: this.myForm.get('m_reclamado')?.value,
      descripcion: this.myForm.get('descripcion')?.value,
      detalle: this.myForm.get('detalle')?.value,
      pedido: this.myForm.get('pedido')?.value,
      a_adjunto: this.myForm.get('a_adjunto')?.value,
      a_condiciones: this.myForm.get('a_condiciones')?.value,
    }

    // Guardar reclamo
    this.claimsService.postClaim(claims).subscribe(
      (response) => {
        if (response) {
          this.sSend = true;
        }
      },
      (error) => {
        if (error) {
          this.eSend = true;
        }
      }
    )

    // Setea los datos por defecto en el formulario.
    this.myForm.reset({ t_documento: 'DNI', t_documento_tutor: 'DNI', t_consumo: 'Producto', t_reclamo: 'Queja' });

    if (!this.mEdad) {
      // Datos para el correo
      const data: EmailInterface = {
        from: this.fromMail,
        to: claims.email,
        bcc: this.bbcMail,
        subject: 'Nuevo reclamo en Alka Corp. SAC',
        html: `<h2>Su reclamo #${this.stringWithZeros}-${this.year} ha sido registrado.</h2>
        <p>A continuación te mostramos los detalles de tu reclamo:</p>
        <h3>Identificación del Consumidor Reclamante</h3>
        <p><strong>Nombre:</strong> ${claims.nombres}</p>
        <p><strong>Apellidos:</strong> ${claims.apellidos}</p>
        <p><strong>Tipo de documento:</strong> ${claims.t_documento}</p>
        <p><strong>Número de documento:</strong> ${claims.n_documento}</p>
        <p><strong>Celular:</strong> ${claims.celular}</p>
        <p><strong>Correo electrónico:</strong> ${claims.email}</p>
        <p><strong>Dirección actual:</strong> ${claims.direccion}</p>
        <h3>Identificación del Bien Contratado</h3>
        <p><strong>Tipo de consumo:</strong> ${claims.t_consumo}</p>
        <p><strong>Número de pedido:</strong> ${claims.n_pedido}</p>
        <p><strong>Monto reclamado:</strong> S/${claims.m_reclamado}</p>
        <p><strong>Descripción:</strong> ${claims.descripcion}</p>
        <h3>Detalle de Reclamación y Pedido del Consumidor</h3>
        <p><strong>Tipo de reclamo:</strong> ${claims.t_reclamo}</p>
        <p><strong>Detalles:</strong> ${claims.detalle}</p>
        <p><strong>Pedido:</strong> ${claims.pedido}</p>
        <h3>¡Gracias por registrar su reclamo!</h3>
        <p>El tiempo de respuesta es no mayor a 15 días hábiles. Y este llegrá a la dirección de correo consignada en el reclamo o queja.</p>`,
        attachments: claims.a_adjunto,
      }

      // Enviar correo
      this.sendEmailService.sendMail(data).subscribe(
        res => {
          console.log(res);
        },
        err => console.error(err))
    } else {
      // Datos para el correo
      const data: EmailInterface = {
        from: this.fromMail,
        to: claims.email,
        bcc: this.bbcMail,
        subject: 'Nuevo reclamo en Alka Corp. SAC',
        html: `<h2>Su reclamo #${this.stringWithZeros}-${this.year} ha sido registrado.</h2>
        <p>A continuación te mostramos los detalles de tu reclamo:</p>
        <h3>Identificación del Consumidor Reclamante</h3>
        <p><strong>Nombres:</strong> ${claims.nombres}</p>
        <p><strong>Apellidos:</strong> ${claims.apellidos}</p>
        <p><strong>Tipo de documento:</strong> ${claims.t_documento}</p>
        <p><strong>Número de documento:</strong> ${claims.n_documento}</p>
        <p><strong>Celular:</strong> ${claims.celular}</p>
        <p><strong>Correo electrónico:</strong> ${claims.email}</p>
        <p><strong>Dirección actual:</strong> ${claims.direccion}</p>
        <h3>Identificación del Padre/Madre/Tutor</h3>
        <p><strong>Nombres:</strong> ${claims.nombres_tutor}</p>
        <p><strong>Apellidos:</strong> ${claims.apellidos_tutor}</p>
        <p><strong>Tipo de documento:</strong> ${claims.t_documento_tutor}</p>
        <p><strong>Número de documento:</strong> ${claims.n_documento_tutor}</p>
        <p><strong>Celular:</strong> ${claims.celular_tutor}</p>
        <p><strong>Correo electrónico:</strong> ${claims.email_tutor}</p>
        <h3>Identificación del Bien Contratado</h3>
        <p><strong>Tipo de consumo:</strong> ${claims.t_consumo}</p>
        <p><strong>Número de pedido:</strong> ${claims.n_pedido}</p>
        <p><strong>Monto reclamado:</strong> S/${claims.m_reclamado}</p>
        <p><strong>Descripción:</strong> ${claims.descripcion}</p>
        <h3>Detalle de Reclamación y Pedido del Consumidor</h3>
        <p><strong>Tipo de reclamo:</strong> ${claims.t_reclamo}</p>
        <p><strong>Detalles:</strong> ${claims.detalle}</p>
        <p><strong>Pedido:</strong> ${claims.pedido}</p>
        <h3>¡Gracias por registrar su reclamo!</h3>
        <p>El tiempo de respuesta es no mayor a 15 días hábiles. Y este llegrá a la dirección de correo consignada en el reclamo o queja.</p>`,
        attachments: claims.a_adjunto,
      }

      // Enviar correo
      this.sendEmailService.sendMail(data).subscribe(
        res => {
          console.log(res);
        },
        err => console.error(err))
    }

    // Ocultar mensaje de envío
    setTimeout(() => {
      this.sSend = false;
      this.eSend = false;
    }, 3500);
  }
}
