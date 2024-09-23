import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const IS_PRODUCTION = true;

const secrets = async () => {
    if (!IS_PRODUCTION) {
        return {
            DB_HOST: process.env.DB_HOST,
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

        const secret = response.SecretString;
        return {
            DB_HOST: secret.DB_HOST,
        };
    }
};

export default secrets;
