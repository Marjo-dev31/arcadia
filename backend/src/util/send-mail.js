import { MailtrapClient } from "mailtrap";

export const sendEmailToNewUser = (req, res) => {
    // const email = req.body.email;
    const message = `${req.body.firstname}, votre compte a été crée. Pour connaître votre mot de passe, veuillez vous rapprocher de José. Pour connaître notre politique de confidentialité rendez-vous sur notre site internet /politiquedeconfidentialite`;

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
        },
    ];

    client
        .send({
            from: sender,
            to: recipients,
            subject: "Création de compte",
            text: message,
        })
        .then(console.log, console.error);
};
