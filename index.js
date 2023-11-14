const express = require("express");
const res = require("express/lib/response");
const app = express();
const port = 3000;
app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static("public"));


var mysql = require("mysql2");
const db = mysql.createConnection({
    host:'localhost',
    port:3308,
    user:'root',
    database:'labnodejs'
})
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
   });
// router
app.get("/",(req,res) =>{
    let sql ="select id, tenLoai from loai";
    db.query(sql, function(err, listLoai){
        if(err) throw err;
    let sqlsach = "select id, tenSach, moTa, urlHinh, gia from sach";

        db.query(sqlsach , (err, listSach) =>{
            // if(err) throw err;
            res.render("shop",{loaiSach:listLoai, listSach:listSach});
        })
    })

})
app.get("/cat/:cateId",(req,res)=>{
    let id = req.params.cateId;
    let sql = `select * from loai`; 
    let sqlsach = `select * from sach WHERE idLoai=${id}`; 
    db.query(sql, function(err, listLoai) { 
        db.query(sqlsach, function(err, listSach) { 
            if (err) throw err; 
            res.render('shop',{loaiSach:listLoai, listSach:listSach});
        });
    });
})

app.get("/sach/:id",(req,res)=>{
 
    let id = req.params.id;
    let sql = `select * from loai`; 
    let sqlsach = `select * from sach WHERE id=${id}`; 
    db.query(sql, function(err, listLoai) { 
        db.query(sqlsach, function(err, data) { 
            if (err) throw err; 
            res.render('shopDetail',{loaiSach:listLoai, sach:data[0]});
        });
    });
})


app.listen(port, ()=>{console.log(`ung dung dang chay ${port}`);})