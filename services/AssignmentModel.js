'use strict';


var mongoose = require('mongoose');
mongoose.set('debug','true');
var Schema = mongoose.Schema;

var RevisionSchema = new Schema({
	title: String, 
	timestamp:String, 
	user:String
});

module.exports = mongoose.model('Revisions', RevisionSchema);