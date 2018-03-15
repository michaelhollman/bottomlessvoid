# bottemlessvoid

This is a remarkably stupid and simple "API." (It's not really even deserving of being called an API.) All it does is take in `content-type:text` requests and log them to a file. That simple.

Usage:

 - `GET` `/log.txt` returns the raw log file
 - `POST` `/log` saves the `content-type:text` request body to the log file
 - `POST` `/line` returns a specific line from the log file. Request data should be a JSON Array with a single integer as the parameter. "[4]" will return line 4.
 - `DELETE` `/log` wipes the log file

*Note: `content-type:text` is required. Why? Being bad-ass-ly robust and flexible was not one of the goals for thing. Maybe someday. Maybe.*

### Running locally

 - This uses [Node.js](http://nodejs.org/), so you'll need that.
 - Clone/download the project
 - Go get all crazy and get into the main directory with your command line of choice
 - `npm install`
 - `npm start`

### Heroku

This project is ready to be deployed to Heroku. If you've never done that before and are crazy enough to want to try it, I'd recommend going through [this tutorial](https://devcenter.heroku.com/articles/getting-started-with-nodejs), and use this repo (or preferably your fork of it, please) instead of the repo they have you clone in the tutorial.

---

Made with <3 by @michaelhollman
