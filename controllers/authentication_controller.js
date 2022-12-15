var authentication_controller = module.exports
const passport = require("passport")


authentication_controller.passport_local_authenticate = async (req, res, next ) =>{
  passport.authenticate("local", async function(err, user, info){
    if (err) { return next(err) }
    if (!user) { return res.status(401).json(info) }
    req.logIn(user,async function(err){
      if (err) { return next(err); }
      return res.json({success: true, data: "Login Successfully!", user_info: user})
    });
  })(req, res, next)
}


authentication_controller.passport_google_authenticate = passport.authenticate("google", {scope: ["profile", "email"], prompt: 'select_account'})


authentication_controller.passport_google_authenticate_callback = async (req, res, next) =>{
  passport.authenticate("google", async function(err, user, info){
    if (err) { return next(err) }
    if (!user) { return res.status(401).json(info) }
    req.logIn(user,async function(err){
      if (err) { return next(err); }
      return res.json({success: true, data: "Login Successfully!", user_info: user})
  })
})(req, res, next)
}


authentication_controller.passport_facebook_authenticate = passport.authenticate("facebook",{scope: ["public_profile", "email"]})


authentication_controller.passport_facebook_authenticate_callback = async (req, res, next) =>{
  passport.authenticate("facebook", async function(err, user, info){
    if (err) { return next(err) }
    if (!user) { return res.status(401).json(info) }
    req.logIn(user,async function(err){
      if (err) { return next(err); }
      return res.json({success: true, data: "Login Successfully!", user_info: user})
  })
})(req, res, next)
}


authentication_controller.authenticate = async(req,res,next) =>{
  if(req.isAuthenticated())
  {
    next()
  }
  else
  {
    res.status(401).json({success: false, data: "You have not yet logged in!"})
  }
}