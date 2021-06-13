export interface Account {
  email: string,
  password: string
}

export interface AuthStatus {
  type: AuthStatusType,
  message: string
}

export enum AuthStatusType {
  Success = 'success',
  Fail = 'fail'
}
