export type Post = {
    id: string,
    title: string,
    content: string,
    author: string,
}

export type User = {
    id: string,
    username: string,
    posts: Post[],
}

export type authStateType = {
    status: string,
    error: string | null,
    userToken: string | null,
    userInfo: User | null
}

export type authenticationDataType = {
    username: string,
    password: string,
}

export type loginPayloadType = {
    message: string,
    data?: any,
}