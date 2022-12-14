using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Angular_Project.Database
{
    public class MongoDbRepository
    {
        public MongoClient client;

        public IMongoDatabase database;

        public MongoDbRepository()
        {
            client = new MongoClient("mongodb://admin:kikio1020@cluster0-shard-00-00.2jay1.mongodb.net:27017," +
                "cluster0-shard-00-01.2jay1.mongodb.net:27017,cluster0-shard-00-02.2jay1.mongodb.net:27017/?ssl=true" +
                "&replicaSet=atlas-dbtd5j-shard-0" +
                "&authSource=admin&retryWrites=true&w=majority");

            database = client.GetDatabase("test");
        }
    }
}
