var DateTimeHandler = require('./../models/date_time_handler.js')
var assert = require('assert')

describe('DateTimeHandler', function () {
  beforeEach(function () {
  });

  it("can confirm date it is correct", () => {
    const longDate = "2017-08-31 14:00:00.123456+00"
    assert(DateTimeHandler.validateFormat(longDate));
    const shortDate = "2017-08-31"
    assert(DateTimeHandler.validateFormat(shortDate));
  })

});
