import * as nodemailer from 'nodemailer'

const {
  NODEMAILER_HOST,
  NODEMAILER_PORT,
  NODEMAILER_SECURE,
  NODEMAILER_USER,
  NODEMAILER_USER_PASSWORD
} = process.env;
export const mailTransporter = nodemailer.createTransport({
  host: NODEMAILER_HOST,
  port: parseInt(NODEMAILER_PORT),
  secure: NODEMAILER_SECURE === 'true',
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_USER_PASSWORD
  }
})
