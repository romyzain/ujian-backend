const { db, query } = require('../database')
const { uploader } =require('../helper/uploader')
const fs = require('fs')

module.exports = {
    getProduct : (req, res) => {
        let sql = 
        `select p.nama, s.branch_name as 'tempat toko', i.inventory as 'stock' from 
        product p
        join store s on s.store_id = p.product_id
        join inventory i on i.product_id = s.store_id;`
        
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send(results)
        })
    },
    editStock : (req, res) => {
        let { id } = req.params
        let { inventory } = req.body
        let sql = `update inventory set inventory = '${inventory}' where inventory_id = ${id}`

        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send(results)
        })

    },
    addProduct : (req, res) => {
        const path = '/images'
        const upload  = uploader(path, 'INV').fields([{ name : 'image'}])
        upload(req, res, (err) => {
            const { image } = req.files
            const { nama } = req.body
            const imagePath = image ?`${path}/${image[0].filename}` : null
            let sql =`insert into product (nama, imagePath) values ('${nama}', '${imagePath}')`
    
            db.query(sql, (err, results) => {
                if(err){
                    fs.unlinkSync(`../public${imagePath}`)
                    res.status(500).send(err.message)
                }
                res.status(200).send({
                    status : 'created',
                    message : 'Added'
                })
        })
        })
    },
    deleteProduct : (req, res) => {
        let { id } = req.params
        let sql =`delete from product where product_id = ${id}`

        db.query(sql, (err,results) => {
            if(err){
                res.status(500).send(err.message)
                fs.unlinkSync(`../public${imagePath}`)
            }
            res.status(200).send({
                status : 'Deleted',
                message : 'Data Deleted'
            })
        })
    }
}