export type { IUser } from '~/server/database/schema'

export interface IApiResponse<T> {
  success: boolean
  data?: T
  error?: IAppError
}

export interface IAppError {
  code?: string
  message: string
  status?: number
}

export interface IFirebaseToken {
  name: string;
  picture: string;
  iss: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  iat: number;
  exp: number;
  email: string;
  email_verified: boolean;
  firebase: {
    identities: {
      email: string[];
    };
    sign_in_provider: string;
  };
  uid: string;
}

export enum UserRole {
  Admin = 'admin',
  Member = 'member',
}