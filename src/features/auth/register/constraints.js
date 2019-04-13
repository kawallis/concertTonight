
import validate from "validate.js"
import moment from 'moment'

validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function(value, options) {
    return +moment.utc(value);
  },
  // Input is a unix timestamp
  format: function(value, options) {
    var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    return moment.utc(value).format(format);
  }
});

export const constraints = {
    firstName: {
      presence: {
        allowEmpty: false
      },
    },
    lastName: {
      presence: {
        allowEmpty: false
      },
    },
    email: {
      presence: {
        allowEmpty: false
      },
      email: true
    },
    password: {
      presence: {
        allowEmpty: false
      },
    }
  };