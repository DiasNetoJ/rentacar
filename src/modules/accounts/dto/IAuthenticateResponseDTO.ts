interface IAuthenticateResponse {
    user: {
        name: string;
        email: string;
    }
    token: string;
    refresh_token: string;
}

export { IAuthenticateResponse };