import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <div className="flex gap-4 mt-4">
          <Link href="/profile" className="text-blue-500 hover:underline">Profile</Link>
          <Link href="/chat" className="text-blue-500 hover:underline">Chat</Link>
        </div>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
      <div className="flex flex-col items-center text-center">
        <h2 className="font-bold text-2xl mb-4">Profile Attempt</h2>
        <Image
           alt="default_pfp"
           src="/placeholder-user-icon.png"
           height={100}
           width={100}
        />
        <h3 className="">Arutha conDoin</h3>
      </div>
    </div>
  );
}
