import { apiAcceptFriendship, apiCreateFriendship, apiDeleteFriendship } from "@/api/friendship.ts";


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

export {
  createFriendship,
  acceptFriendship,
  deleteFriendship,
}