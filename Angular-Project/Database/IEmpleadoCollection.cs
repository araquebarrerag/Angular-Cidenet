using Angular_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular_Project.Database
{
    public interface IEmpleadoCollection
    {
        Task InsertEmpleado(Empleado empleado);
        Task UpdateEmpleado(Empleado empleado);
        Task DeleteEmpleado(string id);
        Task<List<Empleado>> GetAllEmpleados();
        Task<Empleado> GetEmpleadoById(string id);
    }
}
