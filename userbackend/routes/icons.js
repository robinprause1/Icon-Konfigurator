const express = require('express');
const { verifyToken } = require('../middlewares/authJwt.js');
const User = require('../models/user.js');
const { ObjectId } = require("mongodb");
const router = express.Router();

/* POST Icon to Favorite/History, User HAS to be verified */
router.post('/saveFavorite', [verifyToken], (req, res) => {
    saveFavoritesOrHistory(req, res, true);
});
router.post('/saveHistory', [verifyToken], (req, res) => {
    saveFavoritesOrHistory(req, res, false);
});

/* GET All Favorite Icons, User HAS to be verified */
router.get('/getFavorites', [verifyToken], (req, res) => {
    User.findOne({_id: ObjectId(req.userId)})
    .exec((err, user) => {
        if(err){
            return res.status(500).json({
                message: 'Es ist ein Fehler aufgetreten'
            });
        }
        return res.status(200).json({
            icons: user.favorites
        });
    });
});
router.get('/getHistory', [verifyToken], (req, res) => {
    User.findOne({_id: ObjectId(req.userId)})
    .exec((err, user) => {
        if(err){
            return res.status(500).json({
                message: 'Es ist ein Fehler aufgetreten'
            });
        }
        return res.status(200).json({
            icons: user.history
        });
    });
});

/* PATCH User Favorite/History, User HAS to be verified */
router.patch('/editFavorite', [verifyToken], (req, res) => {
    patchFavoritesOrHistory(req, res, true);
});
/*
router.patch('/editHistory', [verifyToken], (req, res) => {
    patchFavoritesOrHistory(req, res, false);
});
*/

/* DELETE User Favorite/History, User HAS to be verified */
router.patch('/deleteFavorite', [verifyToken], (req, res) => {
    deleteFavoritesOrHistory(req, res, true);
});
router.patch('/deleteHistory', [verifyToken], (req, res) => {
    deleteFavoritesOrHistory(req, res, false);
});



function saveFavoritesOrHistory(req, res, saveFavorites){
    User.findOne({_id: ObjectId(req.userId)})
    .exec((err, user) => {
        if(err){
            return res.status(500).json({
                message: 'Es ist ein Fehler aufgetreten'
            });
        }

        let updateFavorites = [];
        let updateHistory = [];
        let updated = {};
        if(saveFavorites){
            updateFavorites = user.favorites;
            updateFavorites.push({
                icon: req.body.icon,
                weight: req.body.weight,
                color: req.body.color,
                fill: req.body.fill
            });
            updated = { favorites: updateFavorites };
        }else{
            updateHistory = user.history;
            updateHistory.push({
                icon: req.body.icon,
                weight: req.body.weight,
                color: req.body.color,
                fill: req.body.fill
            });
            updated = { history: updateHistory };
        }

        User.updateOne({_id: ObjectId(req.userId)}, {$set: updated})
        .then(() => {
            return res.status(200).json({
                message: 'gespeichert'
            })
        })
        .catch(() => {
            return res.status(500).json({
                message: 'Es ist ein Fehler aufgetreten'
            })
        });
    });
}

function patchFavoritesOrHistory(req, res, saveFavorites){
    User.findOne({_id: ObjectId(req.userId)})
    .exec((err, user) => {
        if(err){
            return res.status(500).json({
                message: 'Es ist ein Fehler aufgetreten'
            });
        }

        let updateFavorites = [];
        let updateHistory = [];
        let updated = {};
        if(saveFavorites){
            updateFavorites = user.favorites;
            updateFavorites[req.body.editIdx] = {
                icon: req.body.icon,
                weight: req.body.weight,
                color: req.body.color,
                fill: req.body.fill
            };
        
            updated = { favorites: updateFavorites };
        }else{
            updateHistory = user.history;
            updateHistory[req.body.editIdx] = {
                icon: req.body.icon,
                weight: req.body.weight,
                color: req.body.color,
                fill: req.body.fill
            };
        
            updated = { history: updateHistory };
        }
        User.updateOne({_id: ObjectId(req.userId)}, {$set: updated})
        .then(() => {
            return res.status(200).json({
                message: 'gespeichert'
            })
        })
        .catch(() => {
            return res.status(500).json({
                message: 'Es ist ein Fehler aufgetreten'
            })
        });
    });
}

function deleteFavoritesOrHistory(req, res, saveFavorites){
    User.findOne({_id: ObjectId(req.userId)})
    .exec((err, user) => {
        if(err){
            return res.status(500).json({
                message: 'Es ist ein Fehler aufgetreten'
            });
        }

        let updateFavorites = [];
        let updateHistory = [];
        let updated = {};
        if(saveFavorites){
            updateFavorites = user.favorites;
            updateFavorites.splice(req.body.editIdx, 1);
            updated = { favorites: updateFavorites };
        }else{
            updateHistory = user.history;
            updateHistory.splice(req.body.editIdx, 1);
            updated = { history: updateHistory };
        }
        User.updateOne({_id: ObjectId(req.userId)}, {$set: updated})
        .then(() => {
            return res.status(200).json({
                message: 'gespeichert'
            })
        })
        .catch(() => {
            return res.status(500).json({
                message: 'Es ist ein Fehler aufgetreten'
            })
        });
    });
}

module.exports = router;