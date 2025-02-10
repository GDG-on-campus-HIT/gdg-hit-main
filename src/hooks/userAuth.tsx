import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useSelector } from "react-redux";

export default function UserAuth() {
  const { user } = useSelector((state: any) => state.auth);
  
  if (user && Object.keys(user).length) {
    return true 
  } else {
    return false;
  }
}
