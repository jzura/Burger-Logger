//required packages
const express = require("express");
const burger = require("../models/burger.js");

const router = express.Router();

//get request to get all burger records
router.get("/", (request, response) => { 
    burger
        .all()
        .then(data => {
            const burgerObject = {
                burgers: data
            };
            response.render("index", burgerObject);
        })
        .catch(error => {
            console.log(error);
            response.status(500).end();
        });
});

//post request to create new burger

router.post("/api/burgers", (request, response) => {
    burger
        .create(request.body)
        .then(result => response.json({ id: result.insertId }))
        .catch(error => {
            console.log(error);
            response.status(500).end();
        });
});

/**
 * it exposes a put request to update entry for a specific existing burger in database.
 */
router.put("/api/burgers/:id", (request, response) => {
    console.log(request.body)
    burger
        .update({
            burger: request.body,
            where: {
                id: request.params.id
            }
        })
        .then(result => response.status(result.changedRows == 0 ? 404 : 204).end())
        .catch(error => {
            console.log(error);
            response.status(500).end();
        });

});


module.exports = router;