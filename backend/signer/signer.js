require('dotenv').config();
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const fs = require('fs');
const util = require('util');
const unLinkFile = util.promisify(fs.unlink)

const bucketName = process.env.AWS_S3_BUCKET_NAME;

const {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand,
  } = require("@aws-sdk/client-s3");

  const s3Client = new S3Client({});

async function getSignedDownloadUrl(path) {
    let command = new GetObjectCommand({ Bucket: bucketName, Key: path })
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
}

async function s3Uploader(productFileObj) {
    const productImage = fs.createReadStream(productFileObj.path);

    const uploadParams = { 
        Bucket: bucketName,
        Body: productImage,
        Key: productFileObj.filename
    }
    let command = new PutObjectCommand(uploadParams)
    try {
        const result = await s3Client.send(command)
        
        if(result.$metadata.httpStatusCode === 200) {
            await unLinkFile(productFileObj.path)
            return {
                message: "Successfully Uploaded to S3 Bucket"
            }
        }else {
            throw new Error("Upload to S3 failed")
        }
    } catch (error) {
        return {
            error: error.message
        }
    }
    // return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
}

module.exports = {
    getSignedDownloadUrl,
    s3Uploader,
}


// Basically returns the sign.