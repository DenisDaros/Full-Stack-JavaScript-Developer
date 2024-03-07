const postgre = require('../../database');

const productController = {
    getAll: async (req, res) => {
        try {
            const { rows } = await postgre.query('select * from products');
            console.log('teste');
            res.json({ rows });
        } catch (error) {
            res.json({ msg: error.msg });
        }
    },
    create: async (req, res) => {
        try {
                const { name, brand, model, price, color } = req.body;
                const sql = 'INSERT INTO products(name, brand, model, price, color) VALUES($1, $2, $3, $4, $5) RETURNING *';
                const { rows } = await postgre.query(sql, [name, brand, model, price, color]);
                res.json(rows);    
        } catch (error) {
            res.json({ error });
        }
    },
    updateByName: async (req, res) => {
        try {
            const { name, brand, model, price, color } = req.body;
            const sql = 'UPDATE products set name = $1, brand = $2, model = $3, price = $4, color = $5 where id = $6 RETURNING *';

            const { rows } = await postgre.query(sql, [name, brand, model, price, color, req.params.id]);
            console.log({ rows });
            res.json({ rows });
        } catch (error) {
            res.json({ msg: error.msg });
        }
    },
    deleteByName: async (req, res) => {
        try {
            const sql = 'DELETE FROM products where id = $1 RETURNING *';

            const { rows } = await postgre.query(sql, [req.params.id]);

            if (rows[0]) {
                return res.json({ rows });
            }

            return res.status(404).json({ msg: 'not found' });
        } catch (error) {
            res.json({ msg: error.msg });
        }
    },
};

module.exports = productController;