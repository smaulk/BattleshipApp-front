import {
  apiAcceptFriendship,
  apiCreateFriendship,
  apiDeleteFriendship,
  apiGetFriends, apiGetInRequests,
  apiGetOutRequests
} from "@/api/friendship.ts";
import { PaginateUsers } from "@/interfaces/User.ts";
import { PaginateUsersParams } from "@/interfaces/Paginate.ts";


async function createFriendship(friendId: number): Promise<boolean> {
  const response = await apiCreateFriendship(friendId);
  return response.status === 201;
}

async function acceptFriendship(friendId: number): Promise<boolean> {
  const response = await apiAcceptFriendship(friendId);
  return response.status === 204;
}

async function deleteFriendship(friendId: number): Promise<boolean> {
  const response = await apiDeleteFriendship(friendId);
  return response.status === 204;
}

async function getFriends(data: PaginateUsersParams): Promise<PaginateUsers | null> {
  const response = await apiGetFriends(data);
  if (response.status === 200) {
    return response.data;
  }
  return null;
}

async function getOutRequests(data: PaginateUsersParams): Promise<PaginateUsers | null> {
  const response = await apiGetOutRequests(data);
  if (response.status === 200) {
    return response.data;
  }
  return null;
}

async function getInRequests(data: PaginateUsersParams): Promise<PaginateUsers | null> {
  const response = await apiGetInRequests(data);
  if (response.status === 200) {
    return response.data;
  }
  return null;
}

export {
  createFriendship,
  acceptFriendship,
  deleteFriendship,
  getFriends,
  getOutRequests,
  getInRequests,
}