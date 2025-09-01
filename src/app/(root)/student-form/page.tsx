
import { redirect } from "next/navigation";

export default function StudentFormRoot() {
  //  dynamically decide userId (replace with real logic)
  const userId = 1; // e.g. from database, session, or API
  
  redirect(`/student-form/${userId}`);
}
