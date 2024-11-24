export type Post = {
    id?: string,
    title: string,
    content: string,
    author: Author,
    createdAt?: string,
}

export type User = {
    id: string,
    username: string,
    posts: Post[],
}

export type Author = {
    _id: string,
    username: string,
}

export type authStateType = {
    status: string,
    error: string | null,
    userToken: string | null,
    userInfo: string | null
}

export type authenticationDataType = {
    username: string,
    password: string,
}

export type loginPayloadType = {
    message: string,
    data?: any,
}

export type postStateType = {
    status: string,
    error: string | null,
    posts: Post[] | null,
}

export type getPostsDataType = {
    token: string
}

export type createPostDataType = {
    title: string,
    content: string,
    author: string,
    token: string
}