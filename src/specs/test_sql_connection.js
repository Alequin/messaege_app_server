var SQL = require('./../db/sql_connection')
var assert = require('assert')

describe('SqlConnection', function () {
  beforeEach(function () {});

  it(`can take an sql result object, map its values to the desired
    object and return an array where the elements are the desired
    object and their properties match the results`, () => {

    const fakeMapFunc = (options) => {
      return {
        name: options.name,
        height: options.height,
        age: options.age
      }
    }

    const fakeResults = {
      rows:
      [
        {
          name: "name1",
          height: 140,
          age: 25
        },
        {
          name: "name2",
          height: 150,
          age: 30
        },
        {
          name: "name3",
          height: 160,
          age: 40
        },
      ]
    }

    const expected = fakeResults.rows;
    const result = SQL.mapResults(fakeResults, fakeMapFunc);
    assert.deepEqual(result, expected);
  })

});
