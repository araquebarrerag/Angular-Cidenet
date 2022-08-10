using Angular_Project.Database;
using Angular_Project.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular_Project.Controllers
{   [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoController : Controller
    {
        private IEmpleadoCollection db = new EmpleadoCollection(); 

        [HttpGet]
        public async Task<IActionResult> GetAllEmpleados()
        {
            return Ok(await db.GetAllEmpleados());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmpleadoDetails(string id)
        {
            return Ok(await db.GetEmpleadoById(id));
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmpleado([FromBody] Empleado empleado)
        {
            if (empleado == null) {
                return BadRequest();
            }
            if (empleado.primerNombre == string.Empty)
            {
                ModelState.AddModelError("Primer Nombre", "El primer nombre no debe estar vacio");
            }
            if (empleado.segundoNombre == string.Empty)
            {
                ModelState.AddModelError("Primer Nombre", "El segundo nombre no debe estar vacio");
            }
            if (empleado.primerApellido == string.Empty)
            {
                ModelState.AddModelError("Primer Nombre", "El primer apellido no debe estar vacio");
            }
            if (empleado.segundoApellido == string.Empty)
            {
                ModelState.AddModelError("Primer Nombre", "El segundo apellido no debe estar vacio");
            }
            await db.InsertEmpleado(empleado);
            return Created("Empleado Creado", true);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmpleado([FromBody] Empleado empleado, string id )
        {
            if (empleado == null)
            {
                return BadRequest();
            }
            if (empleado.primerNombre == string.Empty)
            {
                ModelState.AddModelError("Primer Nombre", "El primer nombre no debe estar vacio");
            }
            if (empleado.segundoNombre == string.Empty)
            {
                ModelState.AddModelError("Primer Nombre", "El primer nombre no debe estar vacio");
            }
            if (empleado.primerApellido == string.Empty)
            {
                ModelState.AddModelError("Primer Nombre", "El primer nombre no debe estar vacio");
            }
            if (empleado.segundoApellido == string.Empty)
            {
                ModelState.AddModelError("Primer Nombre", "El primer nombre no debe estar vacio");
            }
                
            empleado.Id = id;
            await db.UpdateEmpleado(empleado);
            return Created("Empleado Actualizado", true);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmpleado(string id)
        {
            await db.DeleteEmpleado(id);
            return NoContent();
        }
    }
}
