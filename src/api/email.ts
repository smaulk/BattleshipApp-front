import { handleApiResponse } from "@/api/response.ts";
import { request } from "@/axios.config.ts";
import { VerifyEmail } from "@/interfaces/Email.ts";
import { AxiosNoContent } from "@/interfaces/AxiosResponse.ts";

export async function apiVerifyEmail({ userId, hash, expiration, signature }: VerifyEmail): Promise<AxiosNoContent> {
  return handleApiResponse<AxiosNoContent>(request.put(
    `/api/v1/users/${userId}/email-verification`,
    { hash, expiration, signature }
  ));
}

export async function apiSendEmailVerification(): Promise<AxiosNoContent>
{
  return handleApiResponse<AxiosNoContent>(request.post(`/api/v1/users/me/email-verification/send`));
}