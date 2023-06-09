import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services & interfaces
import { ClaimNumberService } from '../services/claimNumber.service';
import { ClaimsService } from '../services/claims.service';
import { ClaimInterface } from '../interfaces/claimInterface';
import { UsersService } from '../services/users.service';
import { UserInterface } from '../interfaces/userInterface';
import { ClaimDetailsInterface } from '../interfaces/claimDetailsInterface';
import { ClaimsDetailsService } from '../services/claimDetails.service';
import { SendEmailService } from '../services/email/email.service';
import { EmailInterface } from '../interfaces/email/emailInterface';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent {
  nClaim: number = 1;
  mEdad: boolean = false;
  cType: boolean = false;
  fSend: boolean = false;
  eSend: boolean = false;
  // eClaim: string = 'ventas@alkacorp.com';
  eClaim: string = '';
  tReclamo: string = '';
  tBien: string = '';

  constructor(
    private fb: FormBuilder,
    private claimNumberService: ClaimNumberService,
    private claimsService: ClaimsService,
    private claimDetailsService: ClaimsDetailsService,
    private usersService: UsersService,
    private sendEmailService: SendEmailService,
  ) { }

  // public myForm: FormGroup = this.fb.group({
  //   tipo_doc: ['DNI', [Validators.required]],
  //   num_doc: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]+')]],
  //   nombres: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
  //   apellidos: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
  //   celular: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]+')]],
  //   email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
  //   direccion: ['', [Validators.required, Validators.minLength(25)]],
  //   apoderado: ['', [Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
  //   tipo_bien: [1, [Validators.required]],
  //   monto: ['', [Validators.required]],
  //   descripcion: ['', [Validators.required, Validators.minLength(100)]],
  //   tipo_reclamo: [1, [Validators.required]],
  //   detalles: ['', [Validators.required, Validators.minLength(50)]],
  //   pedido: ['', [Validators.required, Validators.minLength(100)]],
  //   adjunto: [''],
  //   terminos: ['', Validators.requiredTrue],
  // });

  public myForm: FormGroup = this.fb.group({
    tipo_doc: ['DNI', [Validators.required]],
    num_doc: ['70555248', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]+')]],
    nombres: ['Noé Martín', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
    apellidos: ['Rojas Soplín', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
    celular: ['938360044', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]+')]],
    email: ['rosonoem@gmail.com', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    direccion: ['Av. Marginal 145, Salamanca, Ate', [Validators.required, Validators.minLength(25)]],
    apoderado: ['', [Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
    tipo_bien: [1, [Validators.required]],
    monto: ['100', [Validators.required]],
    descripcion: ['It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', [Validators.required, Validators.minLength(100)]],
    tipo_reclamo: [1, [Validators.required]],
    detalles: ['It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', [Validators.required, Validators.minLength(50)]],
    pedido: ['It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', [Validators.required, Validators.minLength(100)]],
    adjunto: [''],
    terminos: ['', Validators.requiredTrue],
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

    // Almacenando datos de usuarios.
    const users: UserInterface = {
      tipo_documento: this.myForm.get('tipo_doc')?.value,
      num_documento: this.myForm.get('num_doc')?.value,
      nombres: this.myForm.get('nombres')?.value,
      apellidos: this.myForm.get('apellidos')?.value,
      email: this.myForm.get('email')?.value,
      celular: this.myForm.get('celular')?.value,
      direccion: this.myForm.get('direccion')?.value,
      menor_edad: this.mEdad,
      apoderado: this.myForm.get('apoderado')?.value,
      id_tipo_usuario: 2,
    }

    // Almacenando Ids para los reclamos.
    const claims: ClaimInterface = {
      id_tipo_reclamo: this.myForm.get('tipo_reclamo')?.value,
      id_detalle: this.nClaim,
      id_usuario: this.nClaim,
      id_tipo_bien: this.myForm.get('tipo_bien')?.value,
    }

    // Almacenando detalles de los reclamos.
    const claimDetails: ClaimDetailsInterface = {
      monto_reclamado: this.myForm.get('monto')?.value,
      descripcion: this.myForm.get('descripcion')?.value,
      detalles_reclamo: this.myForm.get('detalles')?.value,
      pedido: this.myForm.get('pedido')?.value,
      documento_adjunto: this.myForm.get('adjunto')?.value,
      id_reclamo: this.nClaim,
      correo_enviado: !this.eSend
    }

    //Insertar usuario
    this.usersService.postUser(users).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    )

    // Guardar reclamo
    this.claimsService.postClaim(claims).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    )

    // Guardar detalle del reclamo
    this.claimDetailsService.postClaimDetails(claimDetails).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    )

    // console.log(this.myForm.value);

    // Setea los datos por defecto en el formulario.
    this.myForm.reset({ tipo_doc: 'DNI', tipo_bien: 1, tipo_reclamo: 1 });
    this.fSend = true;
    this.claimNumberService.nClaim = this.nClaim++;

    // Cambiar los ID del tipo de bien, por su descripción.
    if (claims.id_tipo_bien === 1) {
      this.tBien = "Producto"
    } else {
      this.tBien = "Servicio"
    }

    // Cambiar los ID del tipo de reclamo, por su descripción.
    if (claims.id_tipo_reclamo === 1) {
      this.tReclamo = "Queja"
    } else {
      this.tReclamo = "Reclamo"
    }

    if (!this.mEdad) {
      // Datos para el correo
      const data: EmailInterface = {
        from: 'admin@alka.cloud',
        to: users.email,
        bcc: this.eClaim,
        subject: 'Nuevo reclamo en Alka Corp. SAC',
        html: `<h2>¡Su reclamo #000${this.nClaim}-2023 ha sido registrado!</h2>
        <p>A continuación te mostramos los detalles de tu reclamo:</p>
        <h3>Identificación del Consumidor Reclamante</h3>
        <p><strong>Nombre:</strong> ${users.nombres}</p>
        <p><strong>Apellidos:</strong> ${users.apellidos}</p>
        <p><strong>Tipo de documento:</strong> ${users.tipo_documento}</p>
        <p><strong>Número de documento:</strong> ${users.num_documento}</p>
        <p><strong>Celular:</strong> ${users.celular}</p>
        <p><strong>Correo electrónico:</strong> ${users.email}</p>
        <p><strong>Dirección actual:</strong> ${users.direccion}</p>
        <h3>Identificación del Bien Contratado</h3>
        <p><strong>Tipo del bien:</strong> ${this.tBien}</p>
        <p><strong>Monto reclamado:</strong> ${claimDetails.monto_reclamado}</p>
        <p><strong>Descripción:</strong> ${claimDetails.descripcion}</p>
        <h3>Detalle de Reclamación y Pedido del Consumidor</h3>
        <p><strong>Tipo de reclamo:</strong> ${this.tReclamo}</p>
        <p><strong>Detalles:</strong> ${claimDetails.detalles_reclamo}</p>
        <p><strong>Pedido:</strong> ${claimDetails.pedido}</p>`,
        attachments: claimDetails.documento_adjunto,
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
        from: 'admin@alka.cloud',
        to: users.email,
        bcc: this.eClaim,
        subject: 'Nuevo reclamo en Alka Corp. SAC',
        html: `<h2>¡Su reclamo #000${this.nClaim}-2023 ha sido registrado!</h2>
        <p>A continuación te mostramos los detalles de tu reclamo:</p>
        <h3>Identificación del Consumidor Reclamante</h3>
        <p><strong>Nombre:</strong> ${users.nombres}</p>
        <p><strong>Apellidos:</strong> ${users.apellidos}</p>
        <p><strong>Tipo de documento:</strong> ${users.tipo_documento}</p>
        <p><strong>Número de documento:</strong> ${users.num_documento}</p>
        <p><strong>Celular:</strong> ${users.celular}</p>
        <p><strong>Correo electrónico:</strong> ${users.email}</p>
        <p><strong>Dirección actual:</strong> ${users.direccion}</p>
        <p><strong>Apoderado:</strong> ${users.apoderado}</p>
        <h3>Identificación del Bien Contratado</h3>
        <p><strong>Tipo del bien:</strong> ${this.tBien}</p>
        <p><strong>Monto reclamado:</strong> ${claimDetails.monto_reclamado}</p>
        <p><strong>Descripción:</strong> ${claimDetails.descripcion}</p>
        <h3>Detalle de Reclamación y Pedido del Consumidor</h3>
        <p><strong>Tipo de reclamo:</strong> ${this.tReclamo}</p>
        <p><strong>Detalles:</strong> ${claimDetails.detalles_reclamo}</p>
        <p><strong>Pedido:</strong> ${claimDetails.pedido}</p>`,
        attachments: claimDetails.documento_adjunto,
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
      this.fSend = false;
    }, 3500);
  }
}
