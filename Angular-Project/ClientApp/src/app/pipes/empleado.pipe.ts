import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeEmpleado'
})
export class EmpleadoPipe implements PipeTransform {

    transform(value: any, args: any): any {
        console.log(value);
        const FilterTests = [];
        
        for (const test of value) {
            //Busqueda Por Primer Nombre
            if (test.primerNombre) {
                if (test.primerNombre.toLowerCase().indexOf(args.toLowerCase()) > -1) {
                    FilterTests.push(test);
                }
            }

            //Busqueda Por Segundo Nombre
            if (test.primerNombre) {
                if (test.primerNombre.toLowerCase().indexOf(args.toLowerCase()) > -1) {
                    FilterTests.push(test);
                }
            }

            //Busqueda Por Primer Nombre
            if (test.segundoNombre) {
                if (test.segundoNombre.toLowerCase().indexOf(args.toLowerCase()) > -1) {
                    FilterTests.push(test);
                }
            }

            //Busqueda Por Primer Apellido
            if (test.primerApellido) {
                if (test.primerApellido.toLowerCase().indexOf(args.toLowerCase()) > -1) {
                    FilterTests.push(test);
                }
            }

            //Busqueda Por Segundo Apellido
            if (test.segundoApellido) {
                if (test.segundoApellido.toLowerCase().indexOf(args.toLowerCase()) > -1) {
                    FilterTests.push(test);
                }
            }

            //Busqueda por Identificacion
            if (test.identificacion) {
                if (test.identificacion.toLowerCase().indexOf(args.toLowerCase()) > -1) {
                    FilterTests.push(test);
                }
            }

            //Busqueda por Email
            if (test.email) {
                if (test.email.toLowerCase().indexOf(args.toLowerCase()) > -1) {
                    FilterTests.push(test);
                }
            }
        }
        return FilterTests;
    }

}
