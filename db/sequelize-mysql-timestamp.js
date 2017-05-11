'use strict';

const BaseTypes = require('sequelize/lib/data-types');
const util = require('util');

const TIMESTAMP = function() {
  if (!(this instanceof TIMESTAMP)) {
    return new TIMESTAMP();
  }

  BaseTypes.ABSTRACT.apply(this, arguments);
};

util.inherits(TIMESTAMP, BaseTypes.ABSTRACT);

TIMESTAMP.prototype.key = TIMESTAMP.key = 'TIMESTAMP';

exports.TIMESTAMP = TIMESTAMP;
