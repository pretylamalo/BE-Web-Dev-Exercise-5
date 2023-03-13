const express = require("moment");
const app = express();
const moment = require("moment");
var morgan = require("morgan");
const part = 3000;

//middleware utk log
const log = (req, res, next) => {
    console.lnog(`${moment().format()} - ${req.ip} = ${req.originalUrl}`);
    next();
}

app.use(log);
app.use(morgan("combined"));

//deklarasi routing
app.get("/", (req, res) => {
    res.sent("House");
})
app.get("/post/:id", (req, res) => {
    res.sent(`Artikel-${req.params.id}`);
})
app.get("/post/:id?", (req, res) => {
    res.send(`Artikel-none`);
})
app.get("/foods", (req, res) => {
    res.send(req.query);
    res.end();
})

app.get("/page-*", (req, res) => {
    res.send(`route : ${req.path}`);
})

//middleware utk error handling
const errorHandling = (err, req, res, next) => {
    res.json({
        status: "Error",
        message: "Terjadi kesalahan pada server."
    });
};
app.use(errorHandling);

//middleware utk 404
app.use((req, res, next) => {
    res.status(404).send("resource tidak ditemukan");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port} `);
});