const db = require('../db');
module.exports = {
    getAll: () => {
        return db.query("select * from products");
    },
    getProducts: (pagesize, offset) => {
        return db.query(`select p.id as productId,p.name as productName,
            c.name as categoryName, c.id as 
            categoryId from products p join categories c on p.c_id=c.id limit ? offset ?`,[pagesize,offset]);
    },
    count: () => {
        return db.query("select count(*) as count from products");
    },
    add: (name, c_id) => {
        return db.query("insert into products(name,c_id) values(?,?)", [name, c_id]);
    },
    update: (id, name, c_id) => {
        return db.query("update products set name=?,c_id=? where id=?", [name, c_id, id]);
    },
    delete: (id) => {
        return db.query("delete from products where id=?", [id]);
    }
}