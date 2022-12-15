const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook')

const account_controller = require("../controllers/account_controller")


let local_strategy = new LocalStrategy(
  { 
    usernameField: 'email',    
    passwordField: 'password'
  },
  async function(email, password, done) 
  {
    try 
    {
      jsonstr = await account_controller.getUserByEmail(email)
      json = JSON.parse(jsonstr)

      if (json.success == false) 
      {
        return done(null, false, {success: false, data: json.data})
      }
      if (await account_controller.compare_password(password, json.data.password) == false) 
      {
        return done(null, false, {success: false, data: "Invalid Password!"});
      }
      return done(null, json.data)
    } 
    catch (err) 
    {
      return done(err)
    }
  }
)


let google_strategy = new GoogleStrategy({
  clientID: process.env.CLIENT_ID_GOOGLE,
  clientSecret: process.env.CLIENT_SECRET_GOOGLE,
  callbackURL: "http://localhost:3005/account/login_google/callback"
},
  async function(accessToken, refreshToken, profile, cb){
    try
    {
      console.log('Profile in google_strategy: ', profile)
      email = profile.emails[0].value
      jsonstr = await account_controller.getUserByEmail(email)
      json = JSON.parse(jsonstr)
      if (json.success == false) 
      {
        return cb(null, false, {success: false, data: json.data})
      }
      else
      {
        return cb(null,json.data)
      }
    }
    catch(err)
    {
      return cb(err)
    }
})


let facebook_strategy = new FacebookStrategy({
  clientID: process.env.CLIENT_ID_FACEBOOK,
  clientSecret: process.env.CLIENT_SECRET_FACEBOOK,
  callbackURL: "http://localhost:3005/account/login_facebook/callback",
  profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
},
  async function(accessToken, refreshToken, profile, cb){
    try
    {
      console.log('Profile in facebook_strategy: ', profile)
      email = profile.emails[0].value
      jsonstr = await account_controller.getUserByEmail(email)
      json = JSON.parse(jsonstr)
      if (json.success == false) 
      {
        return cb(null, false, {success: false, data: json.data})
      }
      else
      {
        return cb(null,json.data)
      }
    }
    catch(err)
    {
      return cb(err)
    }
})


passport.use(local_strategy)
passport.use(google_strategy)
passport.use(facebook_strategy)


passport.serializeUser( async (user, done) =>{
  done(null, user.user_id)
})


passport.deserializeUser( async (user_id, done) =>{
  try 
  {
    const jsonstr = await account_controller.getUserByUser_id(user_id)
    const json = JSON.parse(jsonstr)
    if (json.success == false) 
    {
      return done(new Error(json.data))
    }
    return done(null, json.data)
  } 
  catch (err) 
  {
    return done(err)
  }
})