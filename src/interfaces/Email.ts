export interface VerifyEmail {
  userId: number,
  hash: string,
  expiration: number,
  signature: string,
}