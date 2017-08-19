var loopback = require('loopback');
var config = require('../../server/config.json');
var dsConfig = require('../../server/datasources.json');
var path = require('path');

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = function(Tusers) {
    Tusers.afterRemote('login', function(context, accessToken, next) {
        let res = context.res;
        let req = context.req;
        if (accessToken != null) {
            if (accessToken.id != null) {
                res.cookie('access_token', accessToken.id, {
                    signed: req.signedCookies ? true : false,
                    maxAge: 1000 * accessToken.ttl
                });
                res.cookie('userId', accessToken.userId.toString(), {
                    signed: req.signedCookies ? true : false,
                    maxAge: 1000 * accessToken.ttl
                });
            }
        }
        return next();
    });

    Tusers.passwordReset = function(User, cb) {
     var credentials = dsConfig.emailDs.transports[0].auth;
       console.log(credentials , "credentials");
        console.log(User , "userrrrrrrrrrrrrr??>>>'");
        Tusers.findOne({ where: { email: User.email } }, function(err, obj) {
            if (err) cb(null,false);
            console.log("object" , obj);
            if(obj==null || obj==undefined){
                //logger.debug(User.email +'  not found'  );
                cb(null,false);
            }
            else{

                var newpassword=  Math.random().toString(36).slice(2);
                obj.password=newpassword;
                obj.updateAttribute('password', newpassword, function(err, user) {
                    if (err) cb(null,false);
                    logger.debug(User.email + '  password reset processed successfully');
                    var html = 'New Password: ' + newpassword;
                    var fs = require('fs');
                    var html1 = fs.readFileSync('./common/htmltemplate/activate-account.html', "utf8");
                    var replacements = {"%userpassword%":newpassword},
                        html1 = html1.replace(/%\w+%/g, function(all) {
                            return replacements[all] || all;
                        });
                    logger.debug('start sending email'  );
                    var transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: credentials.user,
                            pass: credentials.pass
                        }
                    });

                    transporter.sendMail({
                        from: credentials.user,
                        to: User.email,
                        subject: 'Password reset',
                        html: html1
                    });
                    logger.debug('Done sending email'  );
                    cb(null,true);
                });

                Tusers.app.models.Email.send({
                    to: User.email,
                    from: "suuport.transluminatrs@gmail.com",
                    password:"apple12345",
                    subject: 'Password reset',
                    html: html
                }, function(err) {
                    if (err) return console.log('> error sending password reset email' + err );
                    console.log('> sending password reset email to:', User.email);

                    cb(null,true);
                });
            }

        });
    };

    Tusers.remoteMethod('passwordReset', {
        description: 'Reset the password and send it on the email.',
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } } ,
        returns: {arg: 'isSuccess', type: 'object'},
        http: {path:'/passwordReset', verb: 'post'}
    });


};
