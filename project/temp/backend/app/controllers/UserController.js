const { User } = require('../models/User.js');

module.exports = {

    index(req, res) {
        User.findAll({})
            .then(users => res.json({
                error: false,
                data: users
            }))
            .catch(error => res.json({
                error:true,
                data: [],
                error: error
            }));
    },

    create(req, res) {
        const { name, surname, description, password, username } = req.body;
        User.create({
            name, username, surname, description, password
        })
        .then(user => res.status(201).json({
            error: false,
            data: user,
            message: "A new entry has been created successfully"
        }))
        .catch(error => res.json({
            error:true,
            data: [],
            error: error
        }));
    },

    update(req, res) {
        const user_id = req.params.id;

        const { name, surname, password, description, username } = req.body;

        User.update({
            name, username, surname, description, password
        }, {
            where: {
                id: user_id
            }
        })
        .then(user => res.status(201).json({
            error: false,
            data: user,
            message: 'The entry has been updated successfully'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
    },

    destroy(req, res) {
        const user_id = req.params.id;

        User.destroy({ where: {
            id: user_id
        }})
        .then(status => res.status(201).json({
            error: false,
            message: 'The entry has been deleted successfully'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
    }
}