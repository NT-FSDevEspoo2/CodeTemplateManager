let express = require('express');
let bodyParser = require('body-parser');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs');

const templatesRouter = require('./routes/templates');
const userModel = require("./models/user");

let app = express();
app.use(bodyParser.json());

let mongoDbPath = "mongodb://localhost/code_template_manager";

mongoose.connect(mongoDbPath).then(() => {
    console.log("MongoDB Connected to " + mongoDbPath);
}, (error) => {
    console.error("MongoDB Connection Failed to " + mongoDbPath + ". Error: " + error);
});

const successResponse = createResponse("Success");
function createResponse(message) {
	return {"message": message};
}

let loggedUsers = [];

function createToken() {
    let token = "";
    let letters = "abcdefghijklmnpqrstuwvxyzABCDEFGHIJKLMNPQRSTUWVXYZ0123456789";
    
    for (let i = 0; i < 1028; i++) {
        let randomNum = Math.floor(Math.random() * 60);
        token += letters[randomNum];
    }
    
    return token;
}

function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

function isPasswordValid(password, hash) {
    return bcrypt.compareSync(password, hash);
}

function isUserLogged(req, res, next) {
    let token = req.headers.token;
    
    for (let i = 0; i < loggedUsers.length; i++) {
        let loggedUser = loggedUsers[i];
        if (token === loggedUser.token) {
            req.user = loggedUser.username;
            return next();
        }
    }
    
    return res.status(403).json(createResponse("Not Allowed"));
}

app.post("/register", function(req, res) {
    let user = new userModel({
        username: req.body.username,
        password: createHash(req.body.password)
    });
    
    if (user.username.length === 0 || user.password.length === 0) {
        return res.status(403).json(createResponse("Username or password must not be empty"));
    }
    
    user.save(function (err, user) {
        if (err) {
            return res.status(409).json(createResponse("Username already in use"));
        }
        
        console.log("Registered user: " + user.username);
        return res.status(200).json(successResponse);
    });
});

app.post("/login", function(req, res) {
    let user = {
        username: req.body.username,
        password: req.body.password
    };
    
    let failMessage = "Wrong username or password";
    
    if (user.username.length === 0 || user.password.length === 0) {
        return res.status(403).json(createResponse(failMessage));
    }
    
    userModel.findOne({username: user.username}, function (err, comparedUser) {
        if (!err && comparedUser && isPasswordValid(user.password, comparedUser.password)) {
            let token = createToken();
            loggedUsers.push({
                username: user.username,
                token: token
            });
            
            console.log("Logged in: " + user.username);
            return res.status(200).json({"token": token});
        } else {
            return res.status(403).json(createResponse(failMessage));
        }
    });
});

app.post("/logout", function(req, res) {
    let token = req.headers.token;
    
    for (let i = 0; i < loggedUsers.length; i++) {
        let loggedUser = loggedUsers[i];
        
        if (token === loggedUser.token) {
            loggedUsers.splice(i, 1);
            
            console.log("Logged out: " + loggedUser.username);
            
            return res.status(200).json(successResponse);
        }
    }
    
    res.status(404).json(createResponse("Not Found"));
});

app.post("/checktoken", function(req, res) {
    let token = req.headers.token;
    
    for (let i = 0; i < loggedUsers.length; i++) {
        let loggedUser = loggedUsers[i];
        
        if (token === loggedUser.token) {
            return res.status(200).json(createResponse("Session valid"));
        }
    }
    
    res.status(404).json(createResponse("Not Found"));
});

app.use("/api", isUserLogged, templatesRouter);

let port = 3001;
app.listen(port);
console.log("Running in port " + port);