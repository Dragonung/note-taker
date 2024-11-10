//express dependency
const express = require('express');
const app = express();

//environment var port
const PORT = process.env.PORT || 3001;

//create route for every file in 'public' folder and give it '/' route
app.use(express.static('public'));

//handle data parser, middleware create req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//route to route files
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

//app listener - start server
app.listen(PORT, () => {
    console.log(`Server available at localhost${PORT}`);
});