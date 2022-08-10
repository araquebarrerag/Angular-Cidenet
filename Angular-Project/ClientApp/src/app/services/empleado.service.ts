import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

    constructor(private http: HttpClient) { }

    public url = window.location.hostname;
    public port = window.location.port;

    public GetAllEmpleados() {
        return this.http.get('https://' + this.url + ':' + this.port + '/api/empleado');
    }

    public GetEmpleadoDetails(id: string) {
        return this.http.get('https://' + this.url + ':' + this.port + '/api/empleado/'+id);
    }

    public CreateEmpleado(array: any) {
        return this.http.post('https://' + this.url + ':' + this.port + '/api/empleado', array);
    }

    public UpdateEmpleado(array: any, id: string) {
        return this.http.put('https://' + this.url + ':' + this.port + '/api/empleado/' + id, array);
    }

    public DeleteEmpleado(id: string) {
        return this.http.delete('https://' + this.url + ':' + this.port + '/api/empleado/' + id);
    }
    
}
