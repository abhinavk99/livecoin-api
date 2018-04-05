'use strict';

const qs = require('qs');

function alphabeticalSort(a, b) {
  return a.localeCompare(b);
}

/**
 *  Return sorted parameter query string for options object
 */
function getParamString(options) {
  return qs.stringify(options, { sort: alphabeticalSort });
}

module.exports = getParamString;