import { useAuth } from "../context/AuthContext"

export default function UserProfile() {
  const {user} = useAuth();
  return (
    <>
      <div>UserProfile</div>
      <div>{user.name}</div>
    </>
  )
}