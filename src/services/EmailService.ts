import { VerifyEmail } from "@/interfaces/Email.ts";
import { apiSendEmailVerification, apiVerifyEmail } from "@/api/email.ts";
import { expValidation } from "@/services/ValidationService.ts";
import NotifyService from "@/services/NotifyService.ts";


async function verifyEmail(data: VerifyEmail): Promise<boolean> {
  if (!expValidation(data.expiration)) {
    return false;
  }
  const response = await apiVerifyEmail(data);
  return response.status === 204;
}

async function sendEmailVerification(): Promise<boolean> {
  const response = await apiSendEmailVerification();

  if (response.status === 204) {
    NotifyService.success('Письмо было отправлено на вашу почту');
    return true;
  }
  return false;
}

export {
  verifyEmail,
  sendEmailVerification
}