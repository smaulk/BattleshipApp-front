import {
  apiAcceptInvite,
  apiCreateInvite,
  apiDeleteAllInvites,
  apiDeleteInvite,
  apiGetInInvites,
  apiGetOutInvites
} from "@/api/invite.ts";
import { PaginateInvites } from "@/interfaces/Invite.ts";
import NotifyService from "@/services/NotifyService.ts";

async function createInvite(friendId: number): Promise<boolean> {
  const response = await apiCreateInvite(friendId);
  if(response.status === 201) {
    NotifyService.success('Приглашение отправлено!');
    return true;
  }
  return false;
}

async function acceptInvite(friendId: number): Promise<boolean> {
  const response = await apiAcceptInvite(friendId);
  return response.status === 204;
}

async function deleteInvite(friendId: number): Promise<boolean> {
  const response = await apiDeleteInvite(friendId);
  return response.status === 204;
}

async function getOutInvites(startId: number | null): Promise<PaginateInvites | null> {
  const response = await apiGetOutInvites(startId);
  if (response.status === 200) {
    return response.data;
  }
  return null;
}

async function getInInvites(startId: number | null): Promise<PaginateInvites | null> {
  const response = await apiGetInInvites(startId);
  if (response.status === 200) {
    return response.data;
  }
  return null;
}

async function deleteAllInvites(): Promise<boolean> {
  const response = await apiDeleteAllInvites();
  return response.status === 204;
}

export {
  createInvite,
  acceptInvite,
  deleteInvite,
  getOutInvites,
  getInInvites,
  deleteAllInvites,
}