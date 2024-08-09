const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// DB
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');




app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');



app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user=user;
        next();
    })
    .catch(err=>console.log(err))
    
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
// Automatic table creation if already no table present
sequelize.sync().then(
    result =>{
        return User.findByPk(1);
        // console.log(result);
        
    }
)
.then(user=>{
    if(!user){
        return User.create({name:"Max", email:"max@gmail.com"});
    }
    else{
        return user;
    }
})
.then(user=>{
    console.log(user);
    app.listen(3000);
})
.catch(err=>{
    console.log(err)
});


