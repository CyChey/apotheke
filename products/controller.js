const Products = require('./model');

module.exports = {
    async patchUpdate(id, fields) {
        const update = { $set: {} };
        for (const key in fields) {
            const value = fields[key];
            if (key && value) {
                update.$set[key] = value;
            }
        }
        return Products.updateOne({ _id: id }, update);
    }
}