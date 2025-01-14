const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");
const { User } = require("../models"); 
const bcrypt = require('bcryptjs');



// GET all users
// Example endpoint: http://localhost:8082/api/users
router.get("/", (req, res) => {
  Controllers.userController.getUsers(req, res);
});

router.get("/:id", (req, res) => {
  const userId = req.params.id; // Extracting the user ID from the request parameters

  User.findByPk(userId) // Using findByPk (Find by Primary Key) method to get a user by id
    .then((user) => {
      if (user) {
        res.json(user); // Sending back the user as JSON
      } else {
        res.status(404).send({ message: `User with id=${userId} not found.` }); // Handling case where user is not found
      }
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .send({ error: "An error occurred while retrieving user." });
    });
});

// Post create new user
// Example endpoint: http://localhost:8082/api/users/create
router.post("/create", (req, res) => {
  Controllers.userController.createUser(req, res);
});

// PUT update user by id
// Example endpoint: http://localhost:8082/api/users/<id>
router.put("/:id", (req, res) => {
  Controllers.userController.updateUser(req, res);
});

// DELETE user by id
// Example endpoint: http://localhost:8082/api/users/<id>
router.delete("/:id", (req, res) => {
  Controllers.userController.deleteUser(req, res);
});


// POST Sign In
router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Compare provided password with stored hashed password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Error comparing passwords" });
        }

        if (isMatch) {
          // Passwords match, login successful
          res.json({
            message: "Login successful",
            user: {
              email: user.email,
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              phoneNumber: user.phoneNumber,
              profilePicture: user.profilePicture,
              textNotifications: user.textNotifications,
              pushNotifications: user.pushNotifications,
              marketingEmails: user.marketingEmails
            },
          }); 
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "An error occurred while trying to log in" });
    });
});
module.exports = router;
