const validate_mail = require("../validation/validate_mail");
const users         = require("../models/Mail");
const express       = require("express");
const router        = express.Router();
// Load input validation.

/**
 * POST method to schedeule emails.
 */
router.post("/schedule", async (req, res) => {
  try {
    const { errors, isValid } = validate_mail(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    if (req.body) {
      users.insertMany(req.body);
      res
        .status(201)
        .json(`Scheduled email successfully at ${req.body.scheduled_time} `);
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * GET method to list all schedeuled emails.
 */
router.get("/schedule", async (req, res) => {
  try {
    if (req) {
      get_all_email = await users.find();
      res.status(201).json(get_all_email);
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * PATCH method to Update schedeuled emails by ID.
 */
router.patch("/schedule/:id", async (req, res) => {
  try {
    if (req.params.id) {
      console.log(req.params.id)
      await users.findByIdAndUpdate(req.params.id, req.body);
      res.status(201).json(`Rescheduled email successfully`);
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * DELETE method to delete schedeuled emails by ID.
 */
router.delete("/schedule/:id", async (req, res) => {
  try {
    if (req.params.id) {
      let deleted_value = await users.findByIdAndDelete(req.params.id);
      if (deleted_value !== null) {
        res
          .status(200)
          .json(`Deleted scheduled email of content ${deleted_value}`);
      } else {
        res.status(404).json(`${req.params.id} id not found`);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
