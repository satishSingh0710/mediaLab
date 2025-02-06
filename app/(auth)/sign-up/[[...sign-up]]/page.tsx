import { SignUp } from '@clerk/nextjs'


export default function Page() {
  const clerk_key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  console.log("The clerk key is: ",clerk_key); // This will alert the Clerk key 
  return <SignUp />
}