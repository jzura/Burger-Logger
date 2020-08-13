const orm = require("../config/orm.js");

const burger = {
    //select all burger function
    all: () => {
        return orm.selectAll({
            table: 'burgers'
        });
    },
    //create new burger function
    create: (burgerObject) => {
        const cols = [];
        const vals = [];
        for (const key in burgerObject) {
            const value = burgerObject[key];
            cols.push(key);
            vals.push(value);
        }
        return orm.insertOne({
            table: 'burgers',
            cols: cols,
            vals: vals
        });
    },
    //update existing burger function
    update: ({ burger, where }) => {
        return orm.updateOne({
            table: 'burgers',
            ColValsObj: burger,
            whereObj: where
        });
    }
}

module.exports = burger;