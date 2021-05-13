export interface Credentials {
    username: string;
    password: string;
}

export interface Config {
    domains: string[];
    credentials: Credentials;
}
