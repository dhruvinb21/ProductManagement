const db = require('../db');
const Category = require('../models/categoryModel');

module.exports = {
    getAllCategories: async (req, res) => {
        try {
            const [data] = await Category.getAll();
            if (data.length === 0) {
                return res.status(404).json({ message: "No Categories Found" });
            }
            return res.json(data);
        } catch (error) {
            res.status(500).json({ message: "Server Error" });
        }
    },
    addCategory: async (req, res) => {
        const { name } = req.body;
        try {
            const [data] = await Category.add(name);
            if (data.rowAffected === 0) {
                return res.status(400).json({ message: "Category not added" });
            }
            return res.status(200).json({ id: data.insertId, name });

        } catch (error) {
            return res.status(500).json({ message: "Server Error" });
        }
    },
    updateCategory: async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const [data] = await Category.update(id, name);
            if (data.affectedRows === 0) {
                return res.status(400).json({ message: "Category not updated" });
            }
            return res.status(200).json({ id, name });

        } catch (error) {
            return res.status(500).json({ message: "Server Error" });
        }

    },

    deleteCategory: async (req, res) => {
        const { id } = req.params;
        try {

            const [products] = await db.query("select * from products where c_id = ?", [id]);
            if (products.length > 0) {
                return res.status(400).json({ message: "Cannot delete category. Products exist under this category." });
            }

            const [data] = await Category.delete(id);
            if (data.affectedRows === 0) {
                return res.status(400).json({ message: "Category not Deleted" });
            }
            return res.status(200).json({ message: "Category Deleted" });
        } catch (error) {
            return res.status(500).json({ message: "Server Error" });
        }
    }
}