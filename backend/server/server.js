/*
https://www.youtube.com/watch?v=DX15WbKidXY
https://www.youtube.com/watch?v=MIByvzueqHQ&t=615s
============================
export PATH=$PATH:/usr/local/mongodb/bin
mongo
============================
Open terminal
run => mongod
run => npm run dev
open => http://localhost:3002/category

open one more new terminal
run => mongo
-------------come like below-----------
---
>
-------------come like above-----------
run => show dbs
run => use <db name> => use ExpenseDb //if new then it will automatically created
run => show collections
run => db.<collection name>.find() => db.expense.find()
*/


const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');
const appPort = 3002;
const app = express();
const dbConst = require('./const/const');

const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient ;

const validation = require('./exp_util/validation');
const DUMMY_PRODUCTS = [{
    id: 1,
    category: "www",
    title: "rrr",
    exp_date: "",
    amount: ""
},{
    id: 2,
    category: "eee",
    title: "ttt",
    exp_date: "",
    amount: ""
}];
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
    );
    next();
});

app.get('/products', (req, res) => {
    const collectionName = 'products';
    mongoClient.connect(dbConst.mongoUrl, { useUnifiedTopology: true }, (err, client) => {
        if(err) {
            res.json({status: false, msg: 'DB cnn err'});
        } else {
            const db = client.db(dbConst.dbName);
            db.collection(collectionName).find({}).toArray(
                (err, result) => {
                    if(err) {
                        res.json({
                            status: false,
                            msg: 'Data Err'
                        });
                    } else {
                        res.json({
                            status: true,
                            msg: 'Success', 
                            products: result
                        });
                    }
                }
            )
        }
    });
});
app.post('/product', (req, res, next) => {
    const collectionName = 'products';
    const {
        category,
        title,
        exp_date,
        amount
    } = req.body;
    
    const createProduct = {
        id: uuid(),
        category,
        title,
        exp_date,
        amount
    };
    const isValid = validation.validateExpense(createProduct);

    if(isValid.status === false) {
        res.status(401).json({status: false, msg: isValid.msg});
    } else {
        mongoClient.connect(dbConst.mongoUrl, { useUnifiedTopology: true }, (err, client) => {
            if(err) {
                res.json({status: false, msg: 'DB cnn err'});
            } else {
                const db = client.db(dbConst.dbName);

                db.collection(collectionName).insertOne(createProduct,
                    (err, result) => {
                        if(err) {
                            res.json({
                                status: false,
                                msg: 'Insert Err'
                            });
                        } else {
                            //DUMMY_PRODUCTS.push(createProduct);
                            res.status(201).json({
                                status: true,
                                msg: 'Posted Success'
                            });
                        }
                    }
                )
            }
        });
    }
});
app.delete('/product/:id', (req, res, next) => {
    const collectionName = 'products';
    const doc = {};
    doc.id = req.params.id;
    const isValid = validation.validateExpense(doc);
    mongoClient.connect(dbConst.mongoUrl, { useUnifiedTopology: true }, (err, client) => {
        if(err) {
            res.json({status: false, msg: 'DB cnn err'});
        } else {
            const db = client.db(dbConst.dbName);

            db.collection(collectionName).deleteOne(doc,
                (err, result) => {
                    if(err) {
                        res.json({
                            status: false,
                            msg: 'Insert Err'
                        });
                    } else {
                        res.status(201).json({
                            status: true,
                            msg: 'Posted Success'
                        });
                    }
                }
            )
        }
    });
});

app.put('/product/put', (req, res, next) => {
    //console.log(req)
    const collectionName = 'products';
    const doc = {};
    doc.id = 'c567fb1f-0855-4992-ab2f-546afa153c65'//req.params.id;
    const isValid = validation.validateExpense(doc);
    mongoClient.connect(dbConst.mongoUrl, { useUnifiedTopology: true }, (err, client) => {
        if(err) {
            res.json({status: false, msg: 'DB cnn err'});
        } else {
            const db = client.db(dbConst.dbName);

            db.collection(collectionName).updateOne(
                doc,
                { $set: {
                    amount: "ttt611",
                    category: "www111"
                }},
                (err, result) => {
                    //console.log(err, result);
                    if(err) {
                        res.json({
                            status: false,
                            msg: 'Insert Err' + err
                        });
                    } else {
                        res.status(201).json({
                            status: true,
                            msg: 'Posted Success'
                        });
                    }
                }
            )
        }
    });
    /* return res.status(202).json({
        message: "resource put successfully"
    }); */
});

app.listen(appPort, () => {
    console.log("Expense APIs on 3002");
});