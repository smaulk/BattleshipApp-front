export interface UpdatePassword {
  currentPassword: string,
  newPassword: string,
  newPasswordConfirmation: string,
}

export interface ResetPassword {
  token: string,
  email: string,
  password: string,
  passwordConfirmation: string,
}