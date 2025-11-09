import express from 'express'
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb'
import bodyParser from 'body-parser' 
import cors from 'cors';

dotenv.config();

const app = express()
const port = process.env.PORT
app.use(cors());
app.use(bodyParser.json())

const client = new MongoClient(process.env.MONGO_URI);
const dbName = 'secPass';
await client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);

app.get('/', async(req,res)=>{
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

app.post('/', async(req,res)=>{
    const { _id, ...passwordData } = req.body;
    const collection = db.collection('passwords');
    try {
    if (passwordData.id) {
      
      const updateResult = await collection.updateOne(
        { id: passwordData.id },
        { $set: passwordData },
        { upsert: true } 
      );
      res.send({ success: true, result: updateResult, action: "updated" });
    } else {
 
      const insertResult = await collection.insertOne(passwordData);
      res.send({ success: true, result: insertResult, action: "inserted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Database error" });
  }
})

app.delete('/', async(req,res)=>{
    const password = req.body
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({sucess:true, result:findResult})
})

app.listen(port,()=>{
      console.log(`App listening on http://localhost:${port}`)
})
