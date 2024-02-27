const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../Members');

// POST: Create a Member - '/api/members'
router.post('/', (req, res) => {
  // Create a new member object with a generated UUID and provided request body
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };
  console.log('rtrPOST:')

  // Check if name and email are provided in the request body
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ message: 'Please include a name and email' });
  }

  // Add the new member to the members array
  members.push(newMember);

  // Send a response with status code 201 (Created) and the newly created member object
  // res.status(201).json(members);

  // Redirect to same page
  res.redirect('/');
});

// GET: All members route handler - '/api/members' to serve the index page
router.get('/', (req, res) => res.json(members));

// GET: Single Member - '/api/members/:id'
router.get('/:id', (req, res) => {
  console.log('rtrGET:ID')
  // Check if any member matches the provided ID
  const found = members.some(member => member.id === parseInt(req.params.id));
  
  if (found) {
    // Send a response with the member object if found
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
    // res.json(found);
  } else {
    // Send a 404 Not Found error response if no member is found
    res.status(404).json({ message: `Member with id of ${req.params.id} not found` });
  }
});

// PUT: Update a Member - '/api/members/:id'
router.put('/:id', (req, res) => {
  console.log("rtrPUT");
  // Check if any member matches the provided ID
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    const updatedMember = req.body;
    // Update the member with the provided ID
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updatedMember.name ? updatedMember.name : member.name;
        member.email = updatedMember.email ? updatedMember.email : member.email;
        res.json(member);
      }
    });
  } else {
    // Send a 404 Not Found error response if no member is found
    res.status(404).json({ message: `Member with id ${req.params.id} not found` });
  }
});

// DELETE: Single Member - '/api/members/:id'
router.delete('/:id', (req, res) => {
  const found = members.some(m => m.id === parseInt(req.params.id));
  console.log("rtrDEL")
  const idx = members.findIndex(m => m.id ===  parseInt(req.params.id));
  
  if (found && idx !== -1) {
    members.splice(idx, 1)
    res.json({
      message: `Member ${req.params.id} deleted`,
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});



module.exports = router;