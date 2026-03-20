const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:********@cluster0.7pn1ltl.mongodb.net/?appName=Cluster0")
.then(() => console.log("Database Connected"))
.catch(err => console.log(err));
