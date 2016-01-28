'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var demoSchema = schema({
  title: String
});

mongoose.model('Demo', demoSchema);
