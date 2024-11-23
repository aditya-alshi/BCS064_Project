require('dotenv').config();
const bucketName = process.env.AWS_S3_BUCKET_NAME;
const {
    S3Client,
    DeleteObjectCommand,
    GetObjectCommand,
  } = require("@aws-sdk/client-s3");

const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
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


async function getSignedDownloadUrl(imageKey) {
    let command = new GetObjectCommand({ Bucket: bucketName, Key: imageKey })
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
}

module.exports = {
    s3DeleteObject,
    getSignedDownloadUrl
}