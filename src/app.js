
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const Register = require("./models/register"); // Ensure the correct path to your model
const conn = require("./Database/conn");

const port = 5001;

// Set paths
const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

// Routes
app.get('/', (req, res) => {
    res.render('register');
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.Confirmpassword;
        if (password === cpassword) {
            const registerEmployee = new Register({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                password: req.body.password,
                confirmpassword: req.body.Confirmpassword
            })
            await registerEmployee.save();
            res.status(201).redirect('/')
        } else {
            return res.render('register', { msg: "password and confirm password should be same" })
        }

    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
