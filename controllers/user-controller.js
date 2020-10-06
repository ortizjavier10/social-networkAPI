const { User, Thought } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
        // .populate({
        //     path: 'thoughts',
        //     select: '-__v'
        // })
        .select('-__v')
        .sort({ _id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendSatus(400);
        });
    },

    //get one user by id
    getUserById({ params}, res) {
        User.findOne({ _id: params.userId })
        .populate({
            path: 'thoughts friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
        })
        .catch(err => {
        console.log(err);
        res.status(400).json(err);
        }); 
    },

    // create user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })
            .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete user
    deleteUser({ params }, res) {
        User.findByIdAndDelete({ _id: params.userId })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ mesage: 'No user found wit this id! '});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { friends: params.friendId },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that id'})
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err))
    },

    // delete friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId }},
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that id'})
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err))
    }

};

module.exports = userController;