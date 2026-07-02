const { pool } = require('../database/connection');

async function getItems(req, res) {
    try {
        const [products] = await pool.query('SELECT * FROM produtos;');
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error getting products"
        });
    }
};

async function getItemById(req, res) {
    try {
        const [products] = await pool.query('SELECT * FROM produtos WHERE id = ?', [req.params.id]);
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error getting product"
        });
    }
};

async function createItem(req, res) {
    try {
        const [products] = await pool.query('INSERT INTO produtos (nome, descricao, preco, estoque) VALUES (?, ?, ?, ?)',
            [req.body.name, req.body.description, req.body.price, req.body.stock]);
        return res.status(201).json({
            massage: "Product created successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error creating product"
        });
    }
};

async function updateItem(req, res) {
    try {
        const [products] = await pool.query('UPDATE produtos SET nome = ?, descricao = ?, preco = ?, estoque = ? WHERE id = ?',
            [req.body.name, req.body.description, req.body.price, req.body.stock, req.params.id]);
        return res.status(200).json({
            massage: "Product updated successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error updating product"
        });
    }
};

async function deleteItem(req, res) {
    try {
        const [products] = await pool.query('DELETE FROM produtos WHERE id = ?', [req.params.id]);
        return res.status(200).json({
            massage: "Product deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error deleting product"
        });
    }
};

module.exports = {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
};