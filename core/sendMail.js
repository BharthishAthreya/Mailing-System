const { SG_KEY }    = require("../environment_variables/environment_variables");
const users         = require("../models/Mail");
const sgMail        = require("@sendgrid/mail");

sgMail.setApiKey(SG_KEY);

const sendMail = async () => {

    // Get all scheduled emails list.
    const getSchedule  = await users.find();
    const current_time = new Date();
    const end_time     = new Date(new Date().setMinutes(new Date().getMinutes() + 30));
    var list_of_scheduled_mails     = [];
    var list_of_mails_to_be_sent    = [];
    var template = {};
  
    console.log(current_time.toISOString());
    console.log(end_time.toISOString());
    
    var getAllScheduledMails = new Promise((resolve, reject) => {
      getSchedule.filter((item) => {
        if (
          item.scheduled_time > current_time &&
          item.scheduled_time < end_time
        ) {
          list_of_scheduled_mails.push(item);
        }
        if (!list_of_scheduled_mails) {
          reject("No schedule");
        } else {
          resolve(list_of_scheduled_mails);
        }
      });
    });
  
    var constructTemplate = new Promise((resolve, reject) => {
      getAllScheduledMails
        .then((resp) => {
          resp.map((each) => {
            template["to"] = each.to_email;
            template["from"] = each.from_email;
            template["subject"] = each.subject;
            template["text"] = each.text;
            list_of_mails_to_be_sent.push(template);
          });
          if (list_of_mails_to_be_sent) {
            resolve(list_of_mails_to_be_sent);
          } else {
            reject(err);
          }
        })
        .catch((err) => console.log(err));
    });
  
    Promise.all([getAllScheduledMails, constructTemplate]).then(([_, result2]) => {
      result2.map((each_mail) => {
        sgMail
          .send(each_mail)
          .then((resp) => console.log(`email sent`))
          .catch((err) => console.log(err));
      });
    });
  };

  module.exports = sendMail