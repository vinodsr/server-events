
const express = require("express");
const ServerEvent = require("./dist/bundle");
console.log(ServerEvent)
const app = express();

ServerEvent.setup();
app.use(express.static("public"));

app.get("/time", (req, res) => {
    res.send({
        time: new Date()
    })
})

app.get("/time/real", (req, res) => {
    console.log("headers", req.headers)
    // res.send({
    //     time: new Date()
    // })

    res.send(new ServerEvent(req, res).do((req, res) => {
        res.send({
            time: new Date()
        })
        setInterval(() => {
            console.log("Running time ");
            res.send({
                time: new Date()
            })

        }, 3000)
    }));
});

app.listen(3000);

console.log("App started");
