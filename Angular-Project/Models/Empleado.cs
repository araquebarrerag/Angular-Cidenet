using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Angular_Project.Models
{
    public class Empleado
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
        public string primerNombre { get; set; }
        public string segundoNombre { get; set; }
        public string primerApellido { get; set; }
        public string segundoApellido { get; set; }
        public string pais { get; set; }
        public string tipoId { get; set; }
        public string identificacion { get; set; }
        public string email { get; set; }
        public string fechaIngreso { get; set; }
        public string area { get; set; }
        public Boolean estado { get; set; }
        public string fechaRegistro { get; set; }
        public string fechaEdicion { get; set; }
    }
}
