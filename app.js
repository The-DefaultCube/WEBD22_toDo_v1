const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path");
const date = require(path.join(__dirname , "/date.js"));

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

let newItems = ["buy milk", "sleep tight", "read more"];
let workItems = ["do work"];

app.listen(3000, function() {
    console.log("Server running at port 3000");
})

app.get("/", function (req, res) {
    const day = date.getDay();
    res.render("list",{
        listTitle: day,
        newItems: newItems
    })

});
app.get("/work", (req,res)=>{
    res.render("list", {
        listTitle: "Work List",
        newItems: workItems
    })
});
app.get("/about", (req,res)=>{
    res.render("about");
});



//dont add empty list items
app.post("/", function (req, res) {
    let newItem = req.body.newItem;

    if(newItem !== "")
    {
        if(req.body.submit === "Work List")
        {
            workItems.push(newItem);
            res.redirect("/work");
        }
        else
        {
            newItems.push(newItem);
            res.redirect("/");
        }
    }
    // console.log(req.body);
})











//app.get("/", function (req , res) {
    // let dateData = new Date();
    // if (dateData.getDay() === 0 || dateData.getDay() === 1) {
    //     res.write("sun or sat");
    // }else {
    //     res.write("work");
    // }
    // console.log(path.join(__dirname + "/index.html"));
    // res.sendFile(path.join(__dirname + "/index.html"));
    
    // let dayCode = dateData.getDay();
    // let dayName = "";
    // switch (dayCode) {
    //     case 0:
    //         dayName = "SUNDAY";
    //         break;
    //     case 1:
    //         dayName = "Monday";
    //         break;
    //     case 2:
    //         dayName = "Tuesday";
    //         break;
    //     case 3:
    //         dayName = "Wednesday";
    //         break;
    //     case 4:
    //         dayName = "Thursday";
    //         break;
    //     case 5:
    //         dayName = "Friday";
    //         break;
    //     case 6:
    //         dayName = "Saturday";
    //         break;
    //     default:
    //         console.log(dayCode);
    //         break;
    // }
    // res.render("list", {
    //     kindOfDay: dayName
    // })
//})
