
// const createPothole = async (
//   users_id,
//   status,
//   photo_url,
//   Lat,
//   Long,
//   comment
// ) => {
//     // check to see of if the user_id is present in DB!!! --> low priotiry! 

//   let newPothole = {
//     users_id: users_id,
//     status: status,
//     photo_url: photo_url,
//     Lat: Lat,
//     Long: Long,
//     Role: Role,
//     comment: comment,
//   };

//   const poteHolecollection = await pothole();
//   const insertedPotHole = await poteHolecollection.insertOne(newPothole);

//   if (insertedPotHole.acknowledged === true) {
//     console.log(newPothole);
//     return newPothole;
//   } else {
//     throw "this did not work!";
//   }
// };
// export default createPothole;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const potholeSchema = new Schema({
    _id: {
        type: mongodb.ObjectId,
        required: true,
        unique: true
    },
    user_id: {
        type: mongodb.ObjectId,
        required: true 
    },
    status: {
        type: String,
        required: true
    },
    photo_url: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    assignedTo: {
        type: mongodb.ObjectId,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    comments: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Pothole', potholeSchema);
