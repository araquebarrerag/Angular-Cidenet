import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmpleadoService } from '../services/empleado.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var M: any;

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent {

    empleados: any;

    empleadoForm = new FormGroup({
        primer_nombre: new FormControl(''),
        segundo_nombre: new FormControl(''),
        primer_apellido: new FormControl(''),
        segundo_apellido: new FormControl(''),
        pais: new FormControl(''),
        ti: new FormControl(''),
        numero: new FormControl(''),
        fecha_ingreso: new FormControl(''),
        area: new FormControl(''),
    });

    constructor(
        public empleadoService: EmpleadoService,
        public router: Router,
        public route: ActivatedRoute
    ) {
        this.cargarForm();
        this.material();
        this.cargarEmpleados();
    }

    cargarForm() {
        this.empleadoForm = new FormGroup({
            primer_nombre: new FormControl(''),
            segundo_nombre: new FormControl(''),
            primer_apellido: new FormControl(''),
            segundo_apellido: new FormControl(''),
            pais: new FormControl(''),
            ti: new FormControl(''),
            numero: new FormControl(''),
            fecha_ingreso: new FormControl(''),
            area: new FormControl(''),
        });
    }

    cargarEmpleados() {
        this.empleadoService.GetAllEmpleados().subscribe(res => {
            const resp = res as any;
            this.empleados = resp;
        });
    }

    guardar() {
        var array = {};
        const date = new Date();
        const fecha = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        if (this.empleadoForm.value.primer_nombre != '' && this.empleadoForm.value.primer_apellido != '' && this.empleadoForm.value.segundo_apellido != ''
            && this.empleadoForm.value.pais != '' && this.empleadoForm.value.ti != '' && this.empleadoForm.value.numero != ''
            && this.empleadoForm.value.fecha_ingreso != '' && this.empleadoForm.value.area != '')
        {
            if ((/^[A-Z]+[A-Z]$/gm.test(this.empleadoForm.value.primer_nombre)) && (/^[A-Z]+[A-Z]$/gm.test(this.empleadoForm.value.primer_apellido)) && (/^[A-Z]+[A-Z]$/gm.test(this.empleadoForm.value.segundo_apellido))
                && (/^(([A-Z]|[a-z]|[0-9]|[-]){1,20})$/gm.test(this.empleadoForm.value.numero))) {
                const date2 = new Date(this.empleadoForm.value.fecha_ingreso);
                console.log(date2);
                const fecha2 = date2.getDate() + '/' + (date2.getMonth() + 1) + '/' + date2.getFullYear();
                const emp2 = this.empleados.filter(array2 => array2.identificacion == this.empleadoForm.value.numero);
                if (emp2 == 0) {
                    if (this.empleadoForm.value.segundo_nombre != '') {
                        if ((/^[A-Z]+[A-Z]$/gm.test(this.empleadoForm.value.segundo_nombre))) {
                            const emp = this.empleados.filter(array2 => array2.primerNombre == this.empleadoForm.value.primer_nombre, array2 => array2.primerApellido == this.empleadoForm.value.primer_apellido);
                            console.log(emp);
                            if (this.empleadoForm.value.pais == 'Colombia') {
                                if (emp.length == 0) {
                                    array = {
                                        primerNombre: this.empleadoForm.value.primer_nombre,
                                        segundoNombre: this.empleadoForm.value.segundo_nombre,
                                        primerApellido: this.empleadoForm.value.primer_apellido,
                                        segundoApellido: this.empleadoForm.value.segundo_apellido,
                                        pais: this.empleadoForm.value.pais,
                                        tipoId: this.empleadoForm.value.ti,
                                        identificacion: this.empleadoForm.value.numero,
                                        email: this.empleadoForm.value.primer_nombre + '.' + this.empleadoForm.value.primer_apellido + '@cidenet.com.co',
                                        fechaIngreso: fecha2,
                                        area: this.empleadoForm.value.area,
                                        estado: true,
                                        fechaRegistro: fecha
                                    }
                                    this.empleadoService.CreateEmpleado(array).subscribe(res => {
                                        console.log(res);
                                        this.router.navigate(['/home']);
                                    }, err => { console.log(err) });
                                } else {
                                    array = {
                                        primerNombre: this.empleadoForm.value.primer_nombre,
                                        segundoNombre: this.empleadoForm.value.segundo_nombre,
                                        primerApellido: this.empleadoForm.value.primer_apellido,
                                        segundoApellido: this.empleadoForm.value.segundo_apellido,
                                        pais: this.empleadoForm.value.pais,
                                        tipoId: this.empleadoForm.value.ti,
                                        identificacion: this.empleadoForm.value.numero,
                                        email: this.empleadoForm.value.primer_nombre + '.' + this.empleadoForm.value.primer_apellido + '' + emp.length + '@cidenet.com.co',
                                        fechaIngreso: fecha2,
                                        area: this.empleadoForm.value.area,
                                        estado: true,
                                        fechaRegistro: fecha
                                    }
                                    this.empleadoService.CreateEmpleado(array).subscribe(res => {
                                        console.log(res);
                                        this.router.navigate(['/home']);
                                    }, err => { console.log(err) });
                                }
                            } else {
                                if (emp.length == 0) {
                                    array = {
                                        primerNombre: this.empleadoForm.value.primer_nombre,
                                        segundoNombre: this.empleadoForm.value.segundo_nombre,
                                        primerApellido: this.empleadoForm.value.primer_apellido,
                                        segundoApellido: this.empleadoForm.value.segundo_apellido,
                                        pais: this.empleadoForm.value.pais,
                                        tipoId: this.empleadoForm.value.ti,
                                        identificacion: this.empleadoForm.value.numero,
                                        email: this.empleadoForm.value.primer_nombre + '.' + this.empleadoForm.value.primer_apellido + '@cidenet.com.us',
                                        fechaIngreso: fecha2,
                                        area: this.empleadoForm.value.area,
                                        estado: true,
                                        fechaRegistro: fecha
                                    }
                                    this.empleadoService.CreateEmpleado(array).subscribe(res => {
                                        console.log(res);
                                        this.router.navigate(['/home']);
                                    }, err => { console.log(err) });
                                } else {
                                    array = {
                                        primerNombre: this.empleadoForm.value.primer_nombre,
                                        segundoNombre: this.empleadoForm.value.segundo_nombre,
                                        primerApellido: this.empleadoForm.value.primer_apellido,
                                        segundoApellido: this.empleadoForm.value.segundo_apellido,
                                        pais: this.empleadoForm.value.pais,
                                        tipoId: this.empleadoForm.value.ti,
                                        identificacion: this.empleadoForm.value.numero,
                                        email: this.empleadoForm.value.primer_nombre + '.' + this.empleadoForm.value.primer_apellido + '' + emp.length + '@cidenet.com.us',
                                        fechaIngreso: fecha2,
                                        area: this.empleadoForm.value.area,
                                        estado: true,
                                        fechaRegistro: fecha
                                    }
                                    this.empleadoService.CreateEmpleado(array).subscribe(res => {
                                        console.log(res);
                                        this.router.navigate(['/home']);
                                    }, err => { console.log(err) });
                                }
                            }
                        }
                    } else {
                        const emp = this.empleados.filter(array => array.primerNombre == this.empleadoForm.value.primer_nombre, array => array.primerApellido == this.empleadoForm.value.primer_apellido);
                        if (this.empleadoForm.value.pais == 'Colombia') {
                            if (emp.length == 0) {
                                array = {
                                    primerNombre: this.empleadoForm.value.primer_nombre,
                                    segundoNombre: '',
                                    primerApellido: this.empleadoForm.value.primer_apellido,
                                    segundoApellido: this.empleadoForm.value.segundo_apellido,
                                    pais: this.empleadoForm.value.pais,
                                    tipoId: this.empleadoForm.value.ti,
                                    identificacion: this.empleadoForm.value.numero,
                                    email: this.empleadoForm.value.primer_nombre + '.' + this.empleadoForm.value.primer_apellido + '@cidenet.com.co',
                                    fechaIngreso: fecha2,
                                    area: this.empleadoForm.value.area,
                                    estado: true,
                                    fechaRegistro: fecha
                                }
                                this.empleadoService.CreateEmpleado(array).subscribe(res => {
                                    console.log(res);
                                    this.router.navigate(['/home']);
                                }, err => { console.log(err) });
                            } else {
                                array = {
                                    primerNombre: this.empleadoForm.value.primer_nombre,
                                    segundoNombre: '',
                                    primerApellido: this.empleadoForm.value.primer_apellido,
                                    segundoApellido: this.empleadoForm.value.segundo_apellido,
                                    pais: this.empleadoForm.value.pais,
                                    tipoId: this.empleadoForm.value.ti,
                                    identificacion: this.empleadoForm.value.numero,
                                    email: this.empleadoForm.value.primer_nombre + '.' + this.empleadoForm.value.primer_apellido + '' + emp.length + '@cidenet.com.co',
                                    fechaIngreso: fecha2,
                                    area: this.empleadoForm.value.area,
                                    estado: true,
                                    fechaRegistro: fecha
                                }
                                this.empleadoService.CreateEmpleado(array).subscribe(res => {
                                    console.log(res);
                                    this.router.navigate(['/home']);
                                }, err => { console.log(err) });
                            }
                        } else {
                            if (emp.length == 0) {
                                array = {
                                    primerNombre: this.empleadoForm.value.primer_nombre,
                                    segundoNombre: '',
                                    primerApellido: this.empleadoForm.value.primer_apellido,
                                    segundoApellido: this.empleadoForm.value.segundo_apellido,
                                    pais: this.empleadoForm.value.pais,
                                    tipoId: this.empleadoForm.value.ti,
                                    identificacion: this.empleadoForm.value.numero,
                                    email: this.empleadoForm.value.primer_nombre + '.' + this.empleadoForm.value.primer_apellido + '@cidenet.com.us',
                                    fechaIngreso: fecha2,
                                    area: this.empleadoForm.value.area,
                                    estado: true,
                                    fechaRegistro: fecha
                                }
                                this.empleadoService.CreateEmpleado(array).subscribe(res => {
                                    console.log(res);
                                    this.router.navigate(['/home']);
                                }, err => { console.log(err) });
                            } else {
                                array = {
                                    primerNombre: this.empleadoForm.value.primer_nombre,
                                    segundoNombre: '',
                                    primerApellido: this.empleadoForm.value.primer_apellido,
                                    segundoApellido: this.empleadoForm.value.segundo_apellido,
                                    pais: this.empleadoForm.value.pais,
                                    tipoId: this.empleadoForm.value.ti,
                                    identificacion: this.empleadoForm.value.numero,
                                    email: this.empleadoForm.value.primer_nombre + '.' + this.empleadoForm.value.primer_apellido + '' + emp.length + '@cidenet.com.us',
                                    fechaIngreso: fecha2,
                                    area: this.empleadoForm.value.area,
                                    estado: true,
                                    fechaRegistro: fecha
                                }
                                this.empleadoService.CreateEmpleado(array).subscribe(res => {
                                    console.log(res);
                                    this.router.navigate(['/']);
                                }, err => { console.log(err) });
                            }
                        }
                    }
                } else {
                    alert('Identificacion ya en uso');
                }
            }
        }
    }

    material() {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('select');
            var elems2 = document.querySelectorAll('.modal');
            var instances = M.FormSelect.init(elems);
            var instances2 = M.Modal.init(elems2);
        });
    }


}
