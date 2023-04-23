const mongoCollections = require('../config/mongoCollections');
const potholesCollection = mongoCollections.potholes;
const { ObjectId } = require('mongodb');

const CreatePotHole = async (
    _id,
    user_id,
    status,
    photo_url,
    lat,
    long,
    assignedTo,
    zipcode,
    comments
) => {
    if (!_id || typeof _id !== 'string') {
        throw new Error('Invalid pothole ID');
    }

    if (!user_id || typeof user_id !== 'string') {
        throw new Error('Invalid user ID');
    }

    if (!status || typeof status !== 'string') {
        throw new Error('Invalid status');
    }

    if (!photo_url || typeof photo_url !== 'string') {
        throw new Error('Invalid photo URL');
    }

    if (!lat || typeof lat !== 'number') {
        throw new Error('Invalid latitude');
    }

    if (!long || typeof long !== 'number') {
        throw new Error('Invalid longitude');
    }

    if (assignedTo && typeof assignedTo !== 'string') {
        throw new Error('Invalid assignedTo');
    }

    if (!zipcode || typeof zipcode !== 'string') {
        throw new Error('Invalid zipcode');
    }

    if (comments && !Array.isArray(comments)) {
        throw new Error('Invalid comments');
    }

    const potholes = await potholesCollection();
    const newPothole = {
        _id,
        user_id,
        status,
        photo_url,
        location: {
            lat,
            long,
        },
        assignedTo: assignedTo || null,
        zipcode,
        comments: comments || [],
        created_at: new Date(),
        updated_at: new Date(),
    };

    const insertInfo = await potholes.insertOne(newPothole);
    if (insertInfo.insertedCount === 0) {
        throw new Error('Failed to create pothole');
    }

    return { insertedPothole: true };
};

const UpdatePotHoleStatus = async (_id, status) => {
    if (!_id || typeof _id !== 'string') {
        throw new Error('Invalid pothole ID');
    }

    if (!status || typeof status !== 'string') {
        throw new Error('Invalid status');
    }

    const potholes = await potholesCollection();

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
            throw new Error('Failed to find pothole');
        }

        if (updateInfo.modifiedCount === 0) {
            throw new Error('Failed to update pothole status');
        }
    } catch (error) {
        throw new Error('Invalid pothole ID format');
    }

    return { updatedPotholeStatus: true };
};

const GetAllPotholes = async (zipcode) => {
    if (!zipcode || typeof zipcode !== 'string') {
        throw new Error('Invalid zipcode');
    }

    const potholes = await potholesCollection();

    try {
        const allPotholes = await potholes.find({ zipcode }).toArray();

        if (!allPotholes) {
            throw new Error('Failed to retrieve potholes');
        }

        return allPotholes;
    } catch (error) {
        throw new Error('Error retrieving potholes');
    }
};

const GetPothole = async (_id) => {
    if (!_id || typeof _id !== 'string') {
        throw new Error('Invalid pothole ID');
    }

    const potholes = await potholesCollection();

    try {
        const parsedId = ObjectId(_id);
        const pothole = await potholes.findOne({ _id: parsedId });

        if (!pothole) {
            throw new Error('Failed to find pothole');
        }

        return pothole;
    } catch (error) {
        throw new Error('Invalid pothole ID format');
    }
};

const AssignPotHoles = async (_id, assignedTo) => {
    if (!_id || typeof _id !== 'string') {
        throw new Error('Invalid pothole ID');
    }

    if (!assignedTo || typeof assignedTo !== 'string') {
        throw new Error('Invalid user ID for assignment');
    }

    const potholes = await potholesCollection();

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
            throw new Error('Failed to find pothole');
        }

        if (updateInfo.modifiedCount === 0) {
            throw new Error('Failed to assign pothole');
        }
    } catch (error) {
        throw new Error('Invalid pothole ID format');
    }

    return { assignedPothole: true };
};

const DeletePothole = async (_id) => {
    if (!_id || typeof _id !== 'string') {
        throw new Error('Invalid pothole ID');
    }

    const potholes = await potholesCollection();

    try {
        const parsedId = ObjectId(_id);
        const deleteInfo = await potholes.deleteOne({ _id: parsedId });

        if (deleteInfo.deletedCount === 0) {
            throw new Error('Failed to delete pothole');
        }
    } catch (error) {
        throw new Error('Invalid pothole ID format');
    }

    return { deletedPothole: true };
};

const GetAllPotholeComments = async () => {
    const potholes = await potholesCollection();

    try {
        const allPotholes = await potholes.find({}, { projection: { comments: 1 } }).toArray();

        if (!allPotholes) {
            throw new Error('Failed to retrieve pothole comments');
        }

        const allComments = allPotholes.map(pothole => pothole.comments).flat();

        return allComments;
    } catch (error) {
        throw new Error('Error retrieving pothole comments');
    }
};

const UploadPhotoUrl = async (_id, photo_url) => {
    if (!_id || typeof _id !== 'string') {
        throw new Error('Invalid pothole ID');
    }

    if (!photo_url || typeof photo_url !== 'string') {
        throw new Error('Invalid photo URL');
    }

    const potholes = await potholesCollection();

    try {
        const parsedId = ObjectId(_id);
        const updateResult = await potholes.updateOne({ _id: parsedId }, { $set: { photo_url } });

        if (updateResult.matchedCount === 0) {
            throw new Error('Failed to find pothole');
        }

        if (updateResult.modifiedCount === 0) {
            throw new Error('Failed to update photo URL');
        }

        return { success: true };
    } catch (error) {
        throw new Error('Error updating photo URL');
    }
};

module.exports = {
    CreatePotHole,
    UpdatePotHoleStatus,
    GetAllPotholes,
    GetPothole,
    AssignPotHoles,
    DeletePothole,
    GetAllPotholeComments,
    UploadPhotoUrl
};