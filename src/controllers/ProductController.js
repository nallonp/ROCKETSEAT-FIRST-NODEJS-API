const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {
    async index(req, res) {
        //primeiro parâmetro é o filtro, pagina atual, página solicitada.
        const { page = 1 } = req.query;
        const products = await Product.paginate({}, { page, limit: 10 });
        return res.json(products);
    },
    async store(req, res) {
        const product = await Product.create(req.body);
        res.status(201);
        return res.json(product);
    },
    async show(req, res) {
        const product = await Product.findById(req.params.id);
        if (product === null) {
            res.status(404)
            return res.send();
        } else {
            return res.json(product);
        }
    },
    async update(req, res) {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(product);
    },
    async destroy(req, res) {
        await Product.findByIdAndRemove(req.params.id);
        return res.send();
    }
}