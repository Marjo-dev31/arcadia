import { MailtrapClient } from "mailtrap";


export const sendEmail = (req, res) => {

const title = req.body.title;
const text = req.body.text;
const email = req.body.emailToResponse;
const message = `${title}, mon message: ${text}, mon email: ${email}`


const TOKEN = "d508c20e9958a513857dcf7d7954bcce";
const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: "marjory.bravo.dev@gmail.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "Demande de contact",
    text: message,
    category: "Integration Test",
  })
  .then(console.log, console.error);
}

