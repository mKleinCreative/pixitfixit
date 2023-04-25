const createComment = async (
  user_id,
  Pothole_id,
  Message
  // photo_url
) => {
  let newcomment = {
    user_id: user_id,
    Pothole_id: Pothole_id,
    Message: Message,
  };

  const commentcollection = await comment();
  const insertedcomment = await commentcollection.insertOne(newcomment);

  if (insertedcomment.acknowledged === true) {
    console.log(newcomment);
    return newcomment;
  } else {
    throw "this did not work!";
  }
};
