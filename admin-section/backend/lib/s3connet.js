require('dotenv').config();
const bucketName = process.env.AWS_S3_BUCKET_NAME;
const {
    S3Client,
    DeleteObjectCommand,
  } = require("@aws-sdk/client-s3");
const s3Client = new S3Client({});

async function s3DeleteObject(Key) {
    
    const deleteParams = {
        Bucket: bucketName,
        Key: Key
    }

    try {
        
        const command = new DeleteObjectCommand(deleteParams);
        const result = await s3Client.send(command);
        
        return result;
    } catch(error) {
        return {
            error: error.message
        }
    }
}

module.exports = {
    s3DeleteObject
}