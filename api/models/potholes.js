
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
