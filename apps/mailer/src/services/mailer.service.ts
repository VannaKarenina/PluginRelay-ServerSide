import {ISendEmailConfirmCodeInterface} from "../interfaces";
import {mailTransporter} from "../transporters";
import * as mjml from 'mjml'
const {
  NODEMAILER_SENDER
} = process.env;


export default class MailerService {

  async sendEmailConfirmCode(ctx: ISendEmailConfirmCodeInterface) {

    const {code, email, login} = ctx;

    const mjmlMessage = mjml(
      `<mjml>
        <mj-head>
          <mj-font name="Montserrat" href="https://fonts.googleapis.com/css?family=Montserrat" />
        </mj-head>
        <mj-body>
          <mj-section background-color="#000000">
            <mj-column>
              <mj-text align="center" color="#ffffff" container-background-color="#000000" font-family="Montserrat, Helvetica, Arial, sans-serif" font-size="34px" line-height="1.5" text-transform="uppercase">
                Plugin Relay
              </mj-text>
              <mj-text align="center" color="#ffffff" font-family="Montserrat, Helvetica, Arial, sans-serif">
                <h2>Account verification</h2>
              </mj-text>
              <mj-text align="center" color="#ffffff" font-size="10px" font-family="Montserrat, Helvetica, Arial, sans-serif">
                <h2>Use this code to verify account</h2>
              </mj-text>
              <mj-divider border-color="#ffffff"></mj-divider>
              <mj-text align="center" color="#ffffff" font-family="Montserrat, Helvetica, Arial, sans-serif">
                <h2> ${code} </h2>
              </mj-text>
              <mj-divider border-color="#ffffff"></mj-divider>
              <mj-text align="center" color="#f7f7f7" font-family="Montserrat, Helvetica, Arial, sans-serif">
                <h4>If you not reqiested email verification then ignore this message</h4>
              </mj-text>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>`
    )

    try {
      mailTransporter.sendMail({
        from: `"Noreply" ${NODEMAILER_SENDER}`,
        to: email,
        subject: 'PluginRelay Account verification',
        html: mjmlMessage.html
      })
    } catch (e) {
      console.log(e);
      return false;
    }

    return true;
  }

  async sendAccountRecoveryCode(ctx: ISendEmailConfirmCodeInterface) {
    const {code, email, login} = ctx;

    const mjmlMessage = mjml(
      `<mjml>
        <mj-head>
          <mj-font name="Montserrat" href="https://fonts.googleapis.com/css?family=Montserrat" />
        </mj-head>
        <mj-body>
          <mj-section background-color="#000000">
            <mj-column>
              <mj-text align="center" color="#ffffff" container-background-color="#000000" font-family="Montserrat, Helvetica, Arial, sans-serif" font-size="34px" line-height="1.5" text-transform="uppercase">
                Plugin Relay
              </mj-text>
              <mj-text align="center" color="#ffffff" font-family="Montserrat, Helvetica, Arial, sans-serif">
                <h2>Account recovery</h2>
              </mj-text>
              <mj-text align="center" color="#ffffff" font-size="10px" font-family="Montserrat, Helvetica, Arial, sans-serif">
                <h2>Use this code to recovery your account</h2>
              </mj-text>
              <mj-divider border-color="#ffffff"></mj-divider>
              <mj-text align="center" color="#ffffff" font-family="Montserrat, Helvetica, Arial, sans-serif">
                <h2> ${code} </h2>
              </mj-text>
              <mj-divider border-color="#ffffff"></mj-divider>
              <mj-text align="center" color="#f7f7f7" font-family="Montserrat, Helvetica, Arial, sans-serif">
                <h4>If you not reqiested recovery verification then ignore this message</h4>
              </mj-text>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>`
    )

    return await mailTransporter.sendMail({
      from: `"Noreply" ${NODEMAILER_SENDER}`,
      to: email,
      subject: 'PluginRelay Account recovery',
      html: mjmlMessage.html
    })
  }

}
