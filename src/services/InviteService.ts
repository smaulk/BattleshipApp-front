import { apiAcceptInvite, apiCreateInvite, apiDeleteInvite } from "@/api/invite.ts";

async function createInvite(friendId: number): Promise<boolean> {
  const response = await apiCreateInvite(friendId);
  return response.status === 201;
}

async function acceptInvite(friendId: number): Promise<boolean> {
  const response = await apiAcceptInvite(friendId);
  return response.status === 204;
}

async function deleteInvite(friendId: number): Promise<boolean> {
  const response = await apiDeleteInvite(friendId);
  return response.status === 204;
}

export {
  createInvite,
  acceptInvite,
  deleteInvite
}