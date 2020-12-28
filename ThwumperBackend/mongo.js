const Express = require('express');
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb://127.0.0.1:27017"
const DATABASE_NAME = "twonker";


var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, {useUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("users");
        console.log("Connected To `" + DATABASE_NAME + "`!")
    });
});

app.get("/api/allUsers", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/api/userById/:id", (request, response) => {
    console.log(request.params);
    collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/api/userByuName/:uName", (request, response) => {
    console.log("Get " + request.params.uName + "'s user data");
    collection.findOne({ "uName": request.params.uName }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.post("/api/replyPost/:id", (request,response) => {
    console.log("New reply at " + request.params.id );
    request.body._mid = new ObjectId();
    collection.updateOne({"timeline": {"$elemMatch": {"_mid": new ObjectId(request.params.id)} } },{"$push": {"timeline.$.replies": request.body}}, (error, result) => {
        if(error) {
            return response.status(500).send(error)
        }
        response.send(result.result)
    });
});

    app.post("/api/timelinePost/:uName", (request,response) => {
        console.log("New post by " + request.params.uName);
        request.body._mid = new ObjectId();
        collection.updateOne({"uName": request.params.uName},{"$push": {"timeline": request.body}}, (error, result) => {
            if(error) {
                return response.status(500).send(error)
            }
            response.send(result.result)
    });
});

