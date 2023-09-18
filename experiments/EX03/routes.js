const { Router } = require('express')

const router = Router()

router.use('/users', router)

// Create user 
router.post('/', userController.createUser)
router.get('/', userController.getUsers)

module.exports = router