const express = require("express");
const { connectToMongo, collection } = require("./mongo");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//is middleware that parses incoming requests with URL-encoded payloads. 
//This middleware is responsible for extracting data from the URL-encoded form 
//in the request body and making it available in the req.body object.

// Connect to MongoDB
connectToMongo();

app.get("/", cors(), (req,res) => {

})

//in login page with axios we are passing email and password using post
//we are getting it here
app.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const check = await collection.findOne({ email: email });

        if (check) {
            res.json({ status: "exists", message: "User already exists." });
        } else {
            res.json({ status: "notexist", message: "User does not exist." });
        }
    } catch (e) {
        console.error("Error in login route:", e);
        res.status(500).json({ status: "error", message: "Internal server error." });
    }
});



app.post("/signup", async(req,res) => {
    const{email,password} = req.body
    //creating a new user
    const data = {
        email: email,
        password: password
    }
    try {
        const check = await collection.findOne({email:email})

        if(check) {
            res.json("exists")
            //if it exists it gives response exists
        }
        else {
            res.json("notexist")
            await collection.insertMany([data]);
            //insertint to mongo
        }
    }
    catch(e) {
        res.json("notexist")
    }
})

app.listen(8000, () => {
    console.log("port connected")
})