var DateTimeHandler = require('./../services/date_time_handler.js')
var assert = require('assert')

describe('DateTimeHandler', function () {
  beforeEach(function () {});

  it("can confirm date it is correct", () => {
    const longDate = "2017-08-31 14:00:00"
    assert(DateTimeHandler.validateFormat(longDate));
    const shortDate = "2017-08-31"
    assert(DateTimeHandler.validateFormat(shortDate));
  })

  it("can return date as string", () => {
    let date = new Date(2017, 11, 5);

    let expected = "2017-12-05";
    let result = DateTimeHandler.getDateString(date);
    assert.strictEqual(result, expected);
  })
});
