var express = require('express');
var router = express.Router();
const userModel = require("./users");
const passport = require('passport');
const localStrategy = require('passport-local')
// const mongoosePaginate = require('mongoose-paginate');
passport.use(new localStrategy(userModel.authenticate()))

// userModel.plugin(mongoosePaginate);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/register', function(req,res,next){
  res.render('register')
})

router.get('/profile', isLoggedIn , function(req,res,next){
  res.render('profile')
})



router.post('/register', function(req,res,next){
  const data = new userModel({
    fullName : req.body.fullName,
    mobileNo : req.body.mobileNo,
    emailId : req.body.emailId,
    address : req.body.address,
    qualification : req.body.qualification,
    username : req.body.username,
    // password: req.body.passwords    
  })
  userModel.register(data,req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/")
    })
  })
})

router.post('/login',passport.authenticate("local",{
  failureRedirect: "/",
  successRedirect: "/userList",
}), function(req,res,next){

});

// router.get('/userList', function(req,res){
//   res.render('userList');
// })

router.get("/logout", function(req, res, next){
    req.logout(function(err){
      if(err){
        return next(err);
      }
      res.redirect('/')
    })
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/')
}

router.get('/userlist', isLoggedIn,async (req, res, next) => {
  try {
    // Retrieve the list of registered users from the database
    const users = await userModel.find({});

    // Render the user list page with the retrieved user data
    res.render('userList', { users });
  } catch (err) {
    next(err);
  }
});


router.get('/edit/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);

    if (!user) {
      // Handle user not found
      return res.status(404).render('error', { message: 'User not found' });
    }

    res.render('editUser', { user });
  } catch (err) {
    next(err);
  }
});

// Update user details
router.post('/edit/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedUser = {
      fullName: req.body.fullName,
      mobileNo: req.body.mobileNo,
      emailId: req.body.emailId,
      address: req.body.address,
      qualification: req.body.qualification,
      username: req.body.username,
    };

    await userModel.findByIdAndUpdate(userId, updatedUser);

    res.redirect('/userlist');
  } catch (err) {
    next(err);
  }
});

// Delete user
router.get('/delete/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    await userModel.findByIdAndDelete(userId);

    res.redirect('/userlist');
  } catch (err) {
    next(err);
  }
});
// router.get('/userlist', async (req, res, next) => {
//   try {
//     const page = parseInt(req.query.page, 10) || 1;
//     const limit = parseInt(req.query.limit, 10) || 10;

//     const users = await userModel.paginate({}, { page, limit });

//     res.render('userList', { users });
//   } catch (err) {
//     next(err);
//   }
// });


module.exports = router;
