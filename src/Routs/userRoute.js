const { CatchAsync } = require('../Error/CatchAsync');

const cont = require('../Controller/UserController');
const { validateFields } = require('../Middleware/ValidateField');
const { validateId } = require('../Middleware/ValidateId');
const { validateUser } = require('../Middleware/VAlidateUsers');

const router = require('express').Router();

router
  .route('/')
  // Handle GET request for the root route
  .get(CatchAsync(cont.getUsers))
  // Handle POST request for the root route
  .post(validateUser, CatchAsync(cont.createUser));

router
  .route('/:id')
  // Handle GET request for the user id
  .get(validateId, CatchAsync(cont.getUserById))
  // Handle PUT request for the specified id
  .put(validateId, validateFields, CatchAsync(cont.updateUserById))
  // Handle DELETE request for the specified id
  .delete(validateId, CatchAsync(cont.deleteUser));

module.exports = router;
