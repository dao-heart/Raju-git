var mongoose = require('mongoose');
var DoctorDetails =mongoose.model('DoctorDetails',{
  name: String,
  gender: String,
  field:  String
});


module.exports = {
  DoctorDetails
};
