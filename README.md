# Mailing-System

## This App allows user to create, update, delete and list the scheduled emails.

## How to run?

### 1. Clone the project
### 2. run ```npm install``` command in root folder [/MAILING-SYSTEM]
### 3. Update the sendgrid **API_KEY** in .env file residing in environment_variables folder.
### 4. [How to get sendgrid API_KEY?](https://docs.sendgrid.com/ui/account-and-settings/api-keys)
### 5. run ```npm start ``` to run the application.
### 6. Application should be running in http://localhost:8000
### 7. Take a look at check_local.rest file inside utils folder to know the usage of APIs.
### 8. Now you can create, update, list and delete mail schdeules through APIs :)


## Implementation
- Current implementation is such a way that app looks for the mails scheduled in DB for every 30 minutes.
- Any record which is schdeuled to mail in next 30 minutes (current_time + 30minutes ) will be sent.


### TODO
- Mail should be sent at exact time.
- Test cases in mocha.

