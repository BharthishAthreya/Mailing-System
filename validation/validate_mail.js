const Validate = require("validator");

module.exports = (data) => {
  let errors = {};

  if (data.sender_name) {
    if (!Boolean(data.sender_name)) {
      errors.name = "Sender name field cannot be empty";
    }
  } else {
    errors.name = "Sender name field[sender_name] is required";
  }

  if (data.to_email) {
    if (!Validate.isEmail(data.to_email)) {
      errors.to_email = "Email should be in format abc@xyz.com";
    }
  } else {
    errors.to_email = "Email field[to_email] is required.";
  }

  if (data.from_email) {
    if (!Validate.isEmail(data.from_email)) {
      errors.from_email = "Email should be in format abc@xyz.com";
    }
  } else {
    errors.from_email = "Email field[from_email] is required.";
  }

  if (data.subject) {
    if (!Boolean(data.subject)) {
      errors.subject = "Subject field cannot be empty";
    }
  } else {
    errors.subject = "Subject field[subject] is required";
  }

  if (data.text) {
    if (!Boolean(data.text)) {
      errors.text = "Text field cannot be empty";
    }
  } else {
    errors.text = "Text field[text] is required";
  }

  if (data.scheduled_time) {

    // Allowing user to create schedule only after current time.
    if (!Validate.isAfter(data.scheduled_time)) {
      errors.schedule = "Cannot schedule for past time";
    } else {

      // Making user to enter Date and Time in ISO format
      parsed_date = new Date(Date.parse(data.scheduled_time));
      if (!parsed_date.toISOString() == data.scheduled_time) {
        errors.schedule = "Date should be in ISO format [YYYY-MM-DDTHH:MM:SS]";
      }
    }
  } else {
    errors.scheduled_time =
      "Schedule time field is required in ISO format. [YYYY-MM-DDTHH:MM:SS]";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
