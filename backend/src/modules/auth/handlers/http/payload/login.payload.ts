import { IsNotEmpty, IsString } from 'class-validator'

export class LoginPayload {
  @IsNotEmpty()
  @IsString()
  email!: string

  @IsNotEmpty()
  @IsString()
  password!: string
}
