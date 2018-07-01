var mongoose=require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://formdetails:1234@ds117539.mlab.com:17539/formdetails');

module.exports={mongoose};
