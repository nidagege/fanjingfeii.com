const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const pool = mysql.createPool({
	host:'localhost',   
	user:'root',		
	password:'123456',	
	database:'news',	
	port:3306			
})


 


router.post('/add',function(req,res){
	var user = req.body.user;
	var pass = req.body.pass;
	pool.getConnection(function(err,connection){
		if(err) throw err;
    connection.query(`SELECT * FROM user WHERE user='${user}'`,function(err,rows){
        if(err) throw err;
        var data=rows;
        if (rows.length == 0) {
            connection.query(`INSERT INTO user (user,pass) VALUES ('${user}','${pass}')`,function(err){ 
                if(err) throw err;

                connection.query('SELECT * FROM user',function(err,rows){
                    if(err) throw err;
			connection.release();
                    res.send('注册成功')
                })

            })
        }else {
            res.send('用户名已被注册')
        }
})
    })
    })
router.post('/login',function(req,res){
	var user = req.body.user;
	var pass = req.body.pass;
	pool.getConnection(function(err,connection){
		if(err) throw err;
    connection.query(`SELECT * FROM user WHERE user='${user}' AND pass='${pass}'`,function(err,rows){
        if(err) throw err;
	    connection.release();
        if(rows.length == 0){
            res.send('账号或者密码错误')
        }else{
            res.send('登录成功');

        }
        })
    })
 })








module.exports = router;
