import { pothole } from "../_db/collection.js";

const createPothole = async (
    User_id,
    status,
    photo_url,
    Lat,
    Long,
    comment
  ) => {
    let newcomment = {
      User_id: User_id,
      status: status,
      photo_url:  photo_url,
      Lat: Lat,
      Long: Long,
      Role: Role,
      comment: [{User_id,
                comment}]
    };
  
    const poteHolecollection = await pothole();
    const insertedPotHole = await poteHolecollection.insertOne(newcomment);
  
    if (insertedPotHole.acknowledged === true) {
      console.log(newcomment);
      return newcomment;
    } else {
      throw "this did not work!";
    }
  };
  export default createPothole;