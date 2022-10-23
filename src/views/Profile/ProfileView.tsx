import React from "react";
import { Profile } from "../../components/Profile/Profile"
import { useGetInfoUser } from "../../hooks/useGetInfoUser";

export const ProfileView = () => {
  const { user } = useGetInfoUser()
  return(
    <Profile username={user.username} address={user.endereco} />
  )
}