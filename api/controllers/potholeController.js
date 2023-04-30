import { pothole } from "../db/collections.js";
import { ObjectId } from "mongodb";

let exportedMethods = {
  async CreatePotHole(
    user_id,
    status,
    photo_url,
    lat,
    long,
    assignedTo,
    zipcode,
    comments
  ) {
    if (!user_id || typeof user_id !== "string") {
      throw new Error("Invalid user ID");
    }

    if (!status || typeof status !== "string") {
      throw new Error("Invalid status");
    }

    if (!photo_url || typeof photo_url !== "string") {
      throw new Error("Invalid photo URL");
    }
    if (!lat || typeof lat !== "string") {
      throw new Error("Invalid latitude");
    }

    if (!long || typeof long !== "string") {
      throw new Error("Invalid longitude");
    }

    if (assignedTo && typeof assignedTo !== "string") {
      throw new Error("Invalid assignedTo");
    }

    if (!zipcode || typeof zipcode !== "string") {
      throw new Error("Invalid zipcode");
    }

    if (comments && !Array.isArray(comments)) {
      throw new Error("Invalid comments");
    }

    const potholes = await pothole();
    const newPothole = {
      user_id,
      status: "open",
      photo_url,
      lat,
      long,
      assignedTo: null,
      zipcode,
      comments: [],
      created_at: new Date(),
      updated_at: new Date(),
    };

    const insertInfo = await potholes.insertOne(newPothole);
    if (insertInfo.insertedCount === 0) {
      throw new Error("Failed to create pothole");
    }

    return { insertedPothole: true };
  },
  async UpdatePotHoleStatus(_id, status) {
    if (!_id || typeof _id !== "string") {
      throw new Error("Invalid pothole ID");
    }

    if (!status || typeof status !== "string") {
      throw new Error("Invalid status");
    }

    const potholes = await pothole();

    try {
      const parsedId = ObjectId(_id);
      const updateInfo = await potholes.updateOne(
        { _id: parsedId },
        {
          $set: {
            status,
            updated_at: new Date(),
          },
        }
      );

      if (updateInfo.matchedCount === 0) {
        throw new Error("Failed to find pothole");
      }

      if (updateInfo.modifiedCount === 0) {
        throw new Error("Failed to update pothole status");
      }
    } catch (error) {
      throw new Error("Invalid pothole ID format");
    }

    return { updatedPotholeStatus: true };
  },
  async GetAllPotholes(zipcode) {
    if (!zipcode || typeof zipcode !== "string") {
      throw new Error("Invalid zipcode");
    }

    const potholes = await pothole();

    try {
      const allPotholes = await potholes.find({ zipcode }).toArray();

      if (!allPotholes) {
        throw new Error("Failed to retrieve potholes");
      }

      return allPotholes;
    } catch (error) {
      throw new Error("Error retrieving potholes");
    }
  },
  async GetPothole(_id) {
    if (!_id || typeof _id !== "string") {
      throw new Error("Invalid pothole ID");
    }

    const potholes = await pothole();

    try {
      const parsedId = ObjectId(_id);
      const pothole = await potholes.findOne({ _id: parsedId });

      if (!pothole) {
        throw new Error("Failed to find pothole");
      }

      return pothole;
    } catch (error) {
      throw new Error("Invalid pothole ID format");
    }
  },
  async AssignPotHoles(_id, assignedTo) {
    if (!_id || typeof _id !== "string") {
      throw new Error("Invalid pothole ID");
    }

    if (!assignedTo || typeof assignedTo !== "string") {
      throw new Error("Invalid user ID for assignment");
    }

    const potholes = await pothole();

    try {
      const parsedId = ObjectId(_id);
      const updateInfo = await potholes.updateOne(
        { _id: parsedId },
        {
          $set: {
            assignedTo,
            updated_at: new Date(),
          },
        }
      );

      if (updateInfo.matchedCount === 0) {
        throw new Error("Failed to find pothole");
      }

      if (updateInfo.modifiedCount === 0) {
        throw new Error("Failed to assign pothole");
      }
    } catch (error) {
      throw new Error("Invalid pothole ID format");
    }

    return { assignedPothole: true };
  },
  async DeletePothole(_id) {
    if (!_id || typeof _id !== "string") {
      throw new Error("Invalid pothole ID");
    }

    const potholes = await pothole();

    try {
      const parsedId = ObjectId(_id);
      const deleteInfo = await potholes.deleteOne({ _id: parsedId });

      if (deleteInfo.deletedCount === 0) {
        throw new Error("Failed to delete pothole");
      }
    } catch (error) {
      throw new Error("Invalid pothole ID format");
    }

    return { deletedPothole: true };
  },
  async GetAllPotholeComments() {
    const potholes = await pothole();

    try {
      const allPotholes = await potholes
        .find({}, { projection: { comments: 1 } })
        .toArray();

      if (!allPotholes) {
        throw new Error("Failed to retrieve pothole comments");
      }

      const allComments = allPotholes.map((pothole) => pothole.comments).flat();

      return allComments;
    } catch (error) {
      throw new Error("Error retrieving pothole comments");
    }
  },
  async UploadPhotoUrl(_id, photo_url) {
    if (!_id || typeof _id !== "string") {
      throw new Error("Invalid pothole ID");
    }

    if (!photo_url || typeof photo_url !== "string") {
      throw new Error("Invalid photo URL");
    }

    const potholes = await pothole();

    try {
      const parsedId = ObjectId(_id);
      const updateResult = await potholes.updateOne(
        { _id: parsedId },
        { $set: { photo_url } }
      );

      if (updateResult.matchedCount === 0) {
        throw new Error("Failed to find pothole");
      }

      if (updateResult.modifiedCount === 0) {
        throw new Error("Failed to update photo URL");
      }

      return { success: true };
    } catch (error) {
      throw new Error("Error updating photo URL");
    }
  },
};

export default exportedMethods;
