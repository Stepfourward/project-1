var mongoose = require('mongoose');

const savedlistSchema = mongoose.Schema({
    companyTitle: String,
    jobTitle: String,
    location: String,
});

const saveSchema = module.exports = mongoose.model('saveSchema',savedlistSchema,'savedjobList');