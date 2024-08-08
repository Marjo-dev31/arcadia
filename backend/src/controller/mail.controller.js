import { MailtrapClient } from "mailtrap";
import database from "../config/mysql.config.js";
import QUERYUSERS from "../query/user.query.js";
import httpStatus from "../domain/httpstatus.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import generatedAccessToken from "../util/jwt.js";

export const sendEmail = (req, res) => {
    const title = req.body.title;
    const text = req.body.text;
    const emailToResponse = req.body.emailToResponse;
    const message = `${title}, mon message: ${text}, mon email: ${emailToResponse}`;

    const TOKEN = "d508c20e9958a513857dcf7d7954bcce";
    const ENDPOINT = "https://send.api.mailtrap.io/";

    const client = new MailtrapClient({
        endpoint: ENDPOINT,
        token: TOKEN,
    });

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
            subject: "Demande de contact",
            text: message,
            category: "Integration Test",
        })
        .then(console.log, console.error);
    res.status(httpStatus.OK.code).send(
        new Response(httpStatus.OK.code, httpStatus.OK.status, `Email sent`)
    );
};

export const sendEmailToNewPassword = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching user`);
    database.query(
        QUERYUSERS.SELECT_USER,
        [req.body.email],
        (error, results) => {
            if (!results[0]) {
                res.status(httpStatus.OK.code).send(
                    new Response(
                        httpStatus.OK.code,
                        httpStatus.OK.status,
                        `No user found`
                    )
                );
            } else {
                const user = results[0];
                const accessToken = generatedAccessToken(user.email, user.name);

                const email = req.body.email;
                const message = `Vous avez demandé un nouveau mot de passe ? Pour changer de mot de passe cliquer sur le lien suivant :
            http://localhost:4200/changermdp/${accessToken} `;

                const TOKEN = "d508c20e9958a513857dcf7d7954bcce";
                const ENDPOINT = "https://send.api.mailtrap.io/";

                const client = new MailtrapClient({
                    endpoint: ENDPOINT,
                    token: TOKEN,
                });

                const sender = {
                    email: "mailtrap@demomailtrap.com",
                    name: "Mailtrap Test",
                };

                const recipients = [
                    {
                        email: email,
                    },
                ];

                client
                    .send({
                        from: sender,
                        to: recipients,
                        subject: "Mot de passe oublié ?",
                        text: message,
                    })
                    .then(console.log, console.error);
                res.status(httpStatus.OK.code).send(
                    new Response(
                        httpStatus.OK.code,
                        httpStatus.OK.status,
                        `Email sent`
                    )
                );
            }
        }
    );
};
