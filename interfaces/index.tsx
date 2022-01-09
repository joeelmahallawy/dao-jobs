export interface AuthUser {
    name: string
    nickname: string
    picture: string
    sub: string
    updated_at: string
    email?: string
    email_verified?: string
}

export interface EmployerAuthUser extends AuthUser {
    fullDiscordUsername: string
}
