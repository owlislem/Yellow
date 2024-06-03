import nodemailer from "nodemailer" ;


export class Email {
  constructor(user , url) {
    this.to = user.email ;
    this.firstName = user.username ;
    this.url = url ;
    this.form = `Islem bouchehit <${process.env.EMAIL_FORM}>`
  }
  newTransport() {
    if (process.env.production  === "production") {
      return 1 ;
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
  }
  async send(template , subject) {
    const mailOptions = {
      from: this.form,
      to: this.to,
      subject
      // html
    };

      await this.newTransport().sendMail(mailOptions);

  }
  async sendResetPassword() {
    await this.send("PasswordReset" , "Your Password Reset token valid for 10 minutes");
  }
  async sendWelcome() {
    await this.send("Welcome" ,"Welcome to the yellow family site") ;
  }

}

 
 

