import { UserRole } from "../../entities/user/model"
import {JwtPayload} from 'jsonwebtoken'

export interface CustomJwtPayload extends JwtPayload {
    email: string,
    roles: UserRole[],
    iat: number
}
