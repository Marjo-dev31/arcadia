import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

// to prod environment IS_PRODUCTION= true
const IS_PRODUCTION = false;

const secrets = async () => {
    if (!IS_PRODUCTION) {
        return {
            DB_HOST: process.env.DB_HOST,
            DB_PORT: process.env.DB_PORT,
            DB_USER: process.env.DB_USER,
            DB_PASSWORD: process.env.DB_PASSWORD,
            DB_NAME: process.env.DB_NAME,
            DB_CONNECTION_LIMIT: process.env.DB_CONNECTION_LIMIT,
            SERVER_PORT: process.env.SERVER_PORT,
            MONGODB_URI: process.env.MONGODB_URI,
            MONGO_INITDB_USERNAME: process.env.MONGO_INITDB_USERNAME,
            MONGO_INITDB_PASSWORD: process.env.MONGO_INITDB_PASSWORD,
            ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
        };
    } else {
        const secret_name = "prod-arcadia";

        const client = new SecretsManagerClient({
            region: "eu-west-3",
        });

        let response;

        try {
            response = await client.send(
                new GetSecretValueCommand({
                    SecretId: secret_name,
                    VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
                })
            );
        } catch (error) {
            throw error;
        }

        const secret = JSON.parse(response.SecretString);
        return {
            DB_HOST: secret.DB_HOST,
            DB_PORT: secret.DB_PORT,
            DB_USER: secret.DB_USER,
            DB_PASSWORD: secret.DB_PASSWORD,
            DB_NAME: secret.DB_NAME,
            DB_CONNECTION_LIMIT: secret.DB_CONNECTION_LIMIT,
            SERVER_PORT: secret.SERVER_PORT,
            MONGODB_URI: secret.MONGODB_URI,
            MONGO_INITDB_USERNAME: secret.MONGO_INITDB_USERNAME,
            MONGO_INITDB_PASSWORD: secret.MONGO_INITDB_PASSWORD,
            ACCESS_TOKEN_SECRET: secret.ACCESS_TOKEN_SECRET,
        };
    }
};

export default secrets;
