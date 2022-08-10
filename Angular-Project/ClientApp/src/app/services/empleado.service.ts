import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

    constructor(private http: HttpClient) { }

    public GetAllEmpleados() {
       return this.http.get('https://localhost:44353/api/empleado');
    }

    public GetEmpleadoDetails(id: string) {
        return this.http.get('https://localhost:44353/api/empleado/'+id);
    }

    public CreateEmpleado(array: any) {
        return this.http.post('https://localhost:44353/api/empleado', array);
    }

    public UpdateEmpleado(array: any, id: string) {
        return this.http.put('https://localhost:44353/api/empleado/' + id, array);
    }

    public DeleteEmpleado(id: string) {
        return this.http.delete('https://localhost:44353/api/empleado/' + id);
    }
    
}
