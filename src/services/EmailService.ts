import { VerifyEmail } from "@/interfaces/Email.ts";
import { apiSendEmailVerification, apiVerifyEmail } from "@/api/email.ts";
import { expValidation } from "@/services/ValidationService.ts";


async function verifyEmail(data: VerifyEmail): Promise<boolean> {
  if(!expValidation(data.expiration)){
    return false;
  }
  const response = await apiVerifyEmail(data);
  return response.status === 204;
}

async function sendEmailVerification(): Promise<boolean> {
  const response = await apiSendEmailVerification();
  return response.status === 204;
}

export {
  verifyEmail,
  sendEmailVerification
}