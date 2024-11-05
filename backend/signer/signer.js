require('dotenv').config();
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const bucketName = process.env.AWS_S3_BUCKET_NAME;

const {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
    ListObjectsCommand,
  } = require("@aws-sdk/client-s3");

  const s3Client = new S3Client({});

async function getSignedDownloadUrl(path) {
    let command = new GetObjectCommand({ Bucket: bucketName, Key: path })
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
}

async function getSignedUploadUrl(path) {
    let command = new PutObjectCommand({ Bucket: bucketName, Key: path })
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
}

module.exports = {
    getSignedDownloadUrl,
    getSignedUploadUrl
}


// Basically returns the sign.