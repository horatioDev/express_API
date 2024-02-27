const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars').engine;
const members = require('./Members')
const logger = require('./middleware/logger');
const PORT = process.env.PORT || 5000

// Init middleware
app.use(logger);

// Body Parser Middleware
app.use(express.json());

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Handle Forms
app.use(express.urlencoded({ extended: false }))

// Route to index view (handlebar)
app.get('/', logger, (req, res) => res.render('index', {
  title: "ExpressJS Members App",
  members
}));

// Route to get member for edit/update
app.get('/update/:id', logger, (req, res) => res.render('update', {
  title: "Update Member",
  member: members.find(m => m.id === parseInt(req.params.id))
}));

// Submit edits and update the list of members
app.put('/:id', logger, (req, res) => {
  console.log('appPUT')
  res.redirect(`/updated/${req.params.id}`)
});

// Route to update member
app.get('/updated/:id', logger, (req, res) => res.render('updated', {
  title: `Updated Member`,
  message: `Member ${req.params.id} has been updated!`,
  member: members.find(m => m.id === parseInt(req.params.id))
}));

// Route to delete member
app.delete('/:id', (req, res) => {
  console.log('appDel:ID');
  res.redirect(`/delete/${parseInt(req.params.id)}`);
});

app.get('/delete/:id', logger, (req, res) => {
  const deletedMember = members.find(m => m.id === parseInt(req.params.id));
  console.log('appGETDel:ID')
  res.render('deleted', {
    title: `Delete Member`,
    message: `Member ${req.params.id} has been deleted successfully!`,
  })
});

// Static Folder: Serve Static files
app.use(express.static(path.join(__dirname, 'public')));

// 
app.use('/api/members', require('./routers/api/members'));



app.listen(PORT, () => {
  console.log(`Express API Server running on port:${PORT}`)
})