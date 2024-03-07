const bcrypt = require('bcrypt');
const postgre = require('../../database');

const loginController = {
    getOne: async (req, res) => {
        try {
            const { username, password } = req.body;
            const sql = 'SELECT * FROM usuarios WHERE username = $1';
            const { rows } = await postgre.query(sql, [username]);
            if (!rows) {
                return res.status(401).json({ msg: 'Usuário não encontrado' });
            }
            const passwordMatch = await bcrypt.compare(password, rows[0].password);
            if (!passwordMatch) {
                return res.status(401).json({ msg: 'Credenciais inválidas' });
            }
            res.json({ msg: 'Login bem-sucedido' });
        } catch (error) {
            res.status(500).json({ msg: 'Erro ao fazer login', error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const { username, password } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);
            const sql = 'INSERT INTO usuarios(username, password) VALUES($1, $2) RETURNING *';
            
            const { rows } = await postgre.query(sql, [username, hashedPassword]);
            
            res.json(rows);
        } catch (error) {
            res.json({ error });
        }
    },
};

module.exports = loginController;