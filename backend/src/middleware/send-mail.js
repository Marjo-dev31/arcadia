import { MailtrapClient } from "mailtrap";

export const sendEmailToNewUser = (req, res, next) => {

    const email = req.body.email;
    const message = `${req.body.firstname}, votre compte a été crée. Pour connaître votre mot de passe, veuillez vous rapprocher de José.`
    
    
    const TOKEN = "d508c20e9958a513857dcf7d7954bcce";
    const ENDPOINT = "https://send.api.mailtrap.io/";
    
    const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });
    
    const sender = {
      email: "mailtrap@demomailtrap.com",
      name: "Mailtrap Test",
    };
    const recipients = [
      {
        email: email,
      }
    ];
    
    client
      .send({
        from: sender,
        to: recipients,
        subject: "Création de compte",
        text: message,
      })
      .then(console.log, console.error);

      next()
    }