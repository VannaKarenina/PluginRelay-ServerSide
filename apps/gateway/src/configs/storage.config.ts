import {S3} from "aws-sdk";

const {
  AWS_KEYID,
  AWS_KEY ,
  AWS_ENDPOINT
} = process.env;

export const s3 = new S3({
  credentials: {
    accessKeyId: AWS_KEYID,
    secretAccessKey: AWS_KEY,
  },
  endpoint: 'http://localhost:9000',
  region: 'cdn-central'
})
