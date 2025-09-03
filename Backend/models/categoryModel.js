const db = require('../db');

module.exports={
        getAll:()=>{
        return db.query("select * from categories");
        },
    add:(name)=>{
        return db.query("insert into categories(name) values(?)",[name]);
    },
    update:(id,name)=>{
        return db.query("update categories set name=? where id=?",[name,id]);
    },
    delete:(id)=>{
        return db.query("delete from categories where id=?",[id]);
    }

}