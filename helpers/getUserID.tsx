import { AuthUser } from '../interfaces'

export default function getUserId(user: AuthUser): string {
    return user?.sub?.slice(user?.sub.lastIndexOf('|') + 1)
}
