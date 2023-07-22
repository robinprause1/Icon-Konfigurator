const User = require("../models/user.js");
const { ObjectId } = require("mongodb");
const config = require("../auth.config.js");

let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        prename: req.body.prename,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10)
      });
      user.save(err => {
        if(err){
            res.status(500).json({message: 'Serverfehler'});
            return;
        }else{
            res.status(200).json({
                message: 'Erfolgreich registriert!'
            });
        }
      });
}

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
    .exec(async (err, user) => {
        if(err){ //Serverfehler
            return res.status(500).send({message: err})
        }
        if(!user){ //Nutzer nicht gefunden
            return res.status(404).send({message: "Nutzername oder Passwort nicht korrekt"})
        }

        //Passwort nicht korrent
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!passwordIsValid){
            return res.status(401).json({
                accessToken: null,
                message: "Nutzername oder Passwort nicht korrekt"
            });
        }

        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.jwtExpiration,
        });

        res.status(200).send({
            username: user.username,
            name: user.name,
            prename: user.prename,
            accessToken: token,
            expiresIn: config.jwtExpiration
        });
    });
}

exports.edit = (req, res) => {
    User.findOne({_id: ObjectId(req.userId)})
    .exec((err, user) => {
        if(err){
            return res.status(500).json({
                message: 'Es ist ein Fehler aufgetreten'
            });
        }
        let newPw;
        if(!req.body.oldpw && !req.body.newpw && !req.body.newpwrp){
            newPw = user.password;
        }
        else if(req.body.newpw || req.body.newpwrp){
            //if old pw isn't set or only one filled of new pw input
            if(!req.body.oldpw || !req.body.newpw || !req.body.newpwrp){
                return res.status(404).json({
                    message: 'Bitte fülle alle Felder aus'
                })
            }
            const pwMatching = bcrypt.compareSync(req.body.oldpw, user.password);
            if(!pwMatching){
                return res.status(401).json({
                    message: 'Altes Passwort nicht korrekt'
                });
            }
            if(req.body.newpw != req.body.newpwrp){
                return res.status(401).json({
                    message: 'Passwörter stimmen nicht überein'
                });
            }
            newPw = bcrypt.hashSync(req.body.newpw, 10);
        }
        
        const updated = {
            username: req.body.username,
            prename: req.body.prename,
            name: req.body.name,
            password: newPw
        }

        User.updateOne({_id: ObjectId(req.userId)}, {$set: updated})
        .then(() => {
            return res.status(200).json({
                message: 'Nutzer verändert',
                username: updated.username,
                prename: updated.prename,
                name: updated.name
            })
        })
        .catch(() => {
            return res.status(500).json({
                message: 'Es ist ein Fehler aufgetreten'
            })
        });
    });
}

exports.delete = (req, res) => {
    User.deleteOne({_id: ObjectId(req.userId)})
    .then(result => {
        res.status(200).json(result);
    })
    .catch(() => {
        res.status(500).json({message: 'Nutzer konnte nicht gelöscht werden'});
    })
}