using Angular_Project.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular_Project.Database
{
    public class EmpleadoCollection : IEmpleadoCollection
    {
        internal MongoDbRepository _repository = new MongoDbRepository();
        private IMongoCollection<Empleado> collection;
        
        public EmpleadoCollection()
        {
            collection = _repository.database.GetCollection<Empleado>("Empleados");
        }
        public async Task DeleteEmpleado(string id)
        {
            var filter = Builders<Empleado>.Filter.Eq(s => s.Id, id);
            await collection.DeleteOneAsync(filter);
        }

        public async Task<List<Empleado>> GetAllEmpleados()
        {
            return await collection.FindAsync(new BsonDocument()).Result.ToListAsync();
        }

        public async Task<Empleado> GetEmpleadoById(string id)
        {
            return await collection.FindAsync(
                new BsonDocument { { "_id", new ObjectId(id) } }).Result.FirstAsync();
        }

        public async Task InsertEmpleado(Empleado empleado)
        {
            await collection.InsertOneAsync(empleado);
        }

        public async Task UpdateEmpleado(Empleado empleado)
        {
            var filter = Builders<Empleado>.Filter.Eq(s => s.Id, empleado.Id);
            await collection.ReplaceOneAsync(filter, empleado);
        }
    }
}
