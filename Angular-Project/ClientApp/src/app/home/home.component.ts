import { Component } from '@angular/core';
import { EmpleadoService } from '../services/empleado.service';
import { FormGroup, FormControl } from '@angular/forms';

declare var M: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

    public empleados: any;
    public pageActual: number = 1;
    public total: number;
    public load = false;

    homeForm = new FormGroup({
        FilterTests: new FormControl('')
    })

    modalForm = new FormGroup({
        primer_nombre: new FormControl(''),
        segundo_nombre: new FormControl(''),
        primer_apellido: new FormControl(''),
        segundo_apellido: new FormControl(''),
        pais: new FormControl(''),
        ti: new FormControl(''),
        numero: new FormControl(''),
        fecha_ingreso: new FormControl(''),
        area: new FormControl(''),
        id: new FormControl('')
    })

    constructor(private empleadoService: EmpleadoService) {
        this.cargarEmpleados();
        this.cargarForm();
        this.material();
    }

    public cargarEmpleados() {
        this.empleadoService.GetAllEmpleados().subscribe(res => {
            const resp = res as any;
            this.empleados = resp;
            this.load = true;
            console.log(resp);
        }, err => { console.log(err) });
    }

    public cargarForm() {
        this.homeForm = new FormGroup({
            FilterTests: new FormControl('')
        })
        this.modalForm = new FormGroup({
            primer_nombre: new FormControl(''),
            segundo_nombre: new FormControl(''),
            primer_apellido: new FormControl(''),
            segundo_apellido: new FormControl(''),
            pais: new FormControl(''),
            ti: new FormControl(''),
            numero: new FormControl(''),
            fecha_ingreso: new FormControl(''),
            area: new FormControl(''),
            id: new FormControl('')
        })
    }

    eliminarEmpleado(id: string) {
        var opcion = confirm('Esta seguro que desea eliminar el Empleado ?');
        if (opcion) {
            this.empleadoService.DeleteEmpleado(id).subscribe(res => {
                console.log(res);
                alert("Empleado Eliminado");
                this.cargarEmpleados();
            }, err => { console.log(err) });
        }
    }

    seleccionarEmpleado(empleado) {
        console.log(empleado);
        const fecha = new Date(empleado.fechaIngreso);
        console.log(fecha)
        this.modalForm = new FormGroup({
            primer_nombre: new FormControl(empleado.primerNombre),
            segundo_nombre: new FormControl(empleado.segundoNombre),
            primer_apellido: new FormControl(empleado.primerApellido),
            segundo_apellido: new FormControl(empleado.segundoApellido),
            pais: new FormControl(empleado.pais),
            ti: new FormControl(empleado.tipoId),
            numero: new FormControl(empleado.identificacion),
            fecha_ingreso: new FormControl(fecha),
            area: new FormControl(empleado.area),
            id: new FormControl(empleado.id)
        })
    }

    actualizar() {
        var array = {};
        const date = new Date();
        const fecha = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        if (this.modalForm.value.primer_nombre != '' && this.modalForm.value.primer_apellido != '' && this.modalForm.value.segundo_apellido != ''
            && this.modalForm.value.pais != '' && this.modalForm.value.ti != '' && this.modalForm.value.numero != ''
            && this.modalForm.value.fecha_ingreso != '' && this.modalForm.value.area != '') {
            if ((/^[A-Z]+[A-Z]$/gm.test(this.modalForm.value.primer_nombre)) && (/^[A-Z]+[A-Z]$/gm.test(this.modalForm.value.primer_apellido)) && (/^[A-Z]+[A-Z]$/gm.test(this.modalForm.value.segundo_apellido))
                && (/^(([A-Z]|[a-z]|[0-9]|[-]){1,20})$/gm.test(this.modalForm.value.numero))) {
                const date2 = new Date(this.modalForm.value.fecha_ingreso);
                console.log(date2);
                const fecha2 = date2.getDate() + '/' + (date2.getMonth() + 1) + '/' + date2.getFullYear();
                const emp2 = this.empleados.filter(array2 => array2.identificacion == this.modalForm.value.numero);
                console.log(emp2);
                if (emp2.length <= 1) {
                    if (this.modalForm.value.segundo_nombre != '') {
                        if ((/^[A-Z]+[A-Z]$/gm.test(this.modalForm.value.segundo_nombre))) {
                            const emp = this.empleados.filter(array2 => array2.primerNombre == this.modalForm.value.primer_nombre, array2 => array2.primerApellido == this.modalForm.value.primer_apellido);
                            console.log(emp);
                            if (this.modalForm.value.pais == 'Colombia') {
                                if (emp.length == 0) {
                                    array = {
                                        primerNombre: this.modalForm.value.primer_nombre,
                                        segundoNombre: this.modalForm.value.segundo_nombre,
                                        primerApellido: this.modalForm.value.primer_apellido,
                                        segundoApellido: this.modalForm.value.segundo_apellido,
                                        pais: this.modalForm.value.pais,
                                        tipoId: this.modalForm.value.ti,
                                        identificacion: this.modalForm.value.numero,
                                        email: this.modalForm.value.primer_nombre + '.' + this.modalForm.value.primer_apellido + '@cidenet.com.co',
                                        fechaIngreso: fecha2,
                                        area: this.modalForm.value.area,
                                        estado: true,
                                        fechaEdicion: fecha
                                    }
                                    this.empleadoService.UpdateEmpleado(array, this.modalForm.value.id).subscribe(res => {
                                        console.log(res);
                                        this.cargarEmpleados();
                                    }, err => { console.log(err) });
                                } else {
                                    array = {
                                        primerNombre: this.modalForm.value.primer_nombre,
                                        segundoNombre: this.modalForm.value.segundo_nombre,
                                        primerApellido: this.modalForm.value.primer_apellido,
                                        segundoApellido: this.modalForm.value.segundo_apellido,
                                        pais: this.modalForm.value.pais,
                                        tipoId: this.modalForm.value.ti,
                                        identificacion: this.modalForm.value.numero,
                                        email: this.modalForm.value.primer_nombre + '.' + this.modalForm.value.primer_apellido + '' + emp.length + '@cidenet.com.co',
                                        fechaIngreso: fecha2,
                                        area: this.modalForm.value.area,
                                        estado: true,
                                        fechaEdicion: fecha
                                    }
                                    this.empleadoService.UpdateEmpleado(array, this.modalForm.value.id).subscribe(res => {
                                        console.log(res);
                                        this.cargarEmpleados();
                                    }, err => { console.log(err) });
                                }
                            } else {
                                if (emp.length == 0) {
                                    array = {
                                        primerNombre: this.modalForm.value.primer_nombre,
                                        segundoNombre: this.modalForm.value.segundo_nombre,
                                        primerApellido: this.modalForm.value.primer_apellido,
                                        segundoApellido: this.modalForm.value.segundo_apellido,
                                        pais: this.modalForm.value.pais,
                                        tipoId: this.modalForm.value.ti,
                                        identificacion: this.modalForm.value.numero,
                                        email: this.modalForm.value.primer_nombre + '.' + this.modalForm.value.primer_apellido + '@cidenet.com.us',
                                        fechaIngreso: fecha2,
                                        area: this.modalForm.value.area,
                                        estado: true,
                                        fechaEdicion: fecha
                                    }
                                    this.empleadoService.UpdateEmpleado(array, this.modalForm.value.id).subscribe(res => {
                                        console.log(res);
                                        this.cargarEmpleados();
                                    }, err => { console.log(err) });
                                } else {
                                    array = {
                                        primerNombre: this.modalForm.value.primer_nombre,
                                        segundoNombre: this.modalForm.value.segundo_nombre,
                                        primerApellido: this.modalForm.value.primer_apellido,
                                        segundoApellido: this.modalForm.value.segundo_apellido,
                                        pais: this.modalForm.value.pais,
                                        tipoId: this.modalForm.value.ti,
                                        identificacion: this.modalForm.value.numero,
                                        email: this.modalForm.value.primer_nombre + '.' + this.modalForm.value.primer_apellido + '' + emp.length + '@cidenet.com.us',
                                        fechaIngreso: fecha2,
                                        area: this.modalForm.value.area,
                                        estado: true,
                                        fechaEdicion: fecha
                                    }
                                    this.empleadoService.UpdateEmpleado(array, this.modalForm.value.id).subscribe(res => {
                                        console.log(res);
                                        this.cargarEmpleados();
                                    }, err => { console.log(err) });
                                }
                            }
                        }
                    } else {
                        const emp = this.empleados.filter(array => array.primerNombre == this.modalForm.value.primer_nombre, array => array.primerApellido == this.modalForm.value.primer_apellido);
                        if (this.modalForm.value.pais == 'Colombia') {
                            if (emp.length == 0) {
                                array = {
                                    primerNombre: this.modalForm.value.primer_nombre,
                                    segundoNombre: '',
                                    primerApellido: this.modalForm.value.primer_apellido,
                                    segundoApellido: this.modalForm.value.segundo_apellido,
                                    pais: this.modalForm.value.pais,
                                    tipoId: this.modalForm.value.ti,
                                    identificacion: this.modalForm.value.numero,
                                    email: this.modalForm.value.primer_nombre + '.' + this.modalForm.value.primer_apellido + '@cidenet.com.co',
                                    fechaIngreso: fecha2,
                                    area: this.modalForm.value.area,
                                    estado: true,
                                    fechaEdicion: fecha
                                }
                                this.empleadoService.UpdateEmpleado(array, this.modalForm.value.id).subscribe(res => {
                                    console.log(res);
                                    this.cargarEmpleados();
                                }, err => { console.log(err) });
                            } else {
                                array = {
                                    primerNombre: this.modalForm.value.primer_nombre,
                                    segundoNombre: '',
                                    primerApellido: this.modalForm.value.primer_apellido,
                                    segundoApellido: this.modalForm.value.segundo_apellido,
                                    pais: this.modalForm.value.pais,
                                    tipoId: this.modalForm.value.ti,
                                    identificacion: this.modalForm.value.numero,
                                    email: this.modalForm.value.primer_nombre + '.' + this.modalForm.value.primer_apellido + '' + emp.length + '@cidenet.com.co',
                                    fechaIngreso: fecha2,
                                    area: this.modalForm.value.area,
                                    estado: true,
                                    fechaEdicion: fecha
                                }
                                this.empleadoService.UpdateEmpleado(array, this.modalForm.value.id).subscribe(res => {
                                    console.log(res);
                                    this.cargarEmpleados();
                                }, err => { console.log(err) });
                            }
                        } else {
                            if (emp.length == 0) {
                                array = {
                                    primerNombre: this.modalForm.value.primer_nombre,
                                    segundoNombre: '',
                                    primerApellido: this.modalForm.value.primer_apellido,
                                    segundoApellido: this.modalForm.value.segundo_apellido,
                                    pais: this.modalForm.value.pais,
                                    tipoId: this.modalForm.value.ti,
                                    identificacion: this.modalForm.value.numero,
                                    email: this.modalForm.value.primer_nombre + '.' + this.modalForm.value.primer_apellido + '@cidenet.com.us',
                                    fechaIngreso: fecha2,
                                    area: this.modalForm.value.area,
                                    estado: true,
                                    fechaEdicion: fecha
                                }
                                this.empleadoService.UpdateEmpleado(array, this.modalForm.value.id).subscribe(res => {
                                    console.log(res);
                                    this.cargarEmpleados();
                                }, err => { console.log(err) });
                            } else {
                                array = {
                                    primerNombre: this.modalForm.value.primer_nombre,
                                    segundoNombre: '',
                                    primerApellido: this.modalForm.value.primer_apellido,
                                    segundoApellido: this.modalForm.value.segundo_apellido,
                                    pais: this.modalForm.value.pais,
                                    tipoId: this.modalForm.value.ti,
                                    identificacion: this.modalForm.value.numero,
                                    email: this.modalForm.value.primer_nombre + '.' + this.modalForm.value.primer_apellido + '' + emp.length + '@cidenet.com.us',
                                    fechaIngreso: fecha2,
                                    area: this.modalForm.value.area,
                                    estado: true,
                                    fechaEdicion: fecha
                                }
                                this.empleadoService.UpdateEmpleado(array, this.modalForm.value.id).subscribe(res => {
                                    console.log(res);
                                    this.cargarEmpleados();
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
        const options = {
            inDuration: 750
        }
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems, options);
        });
    }
}
