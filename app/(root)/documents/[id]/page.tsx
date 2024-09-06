import React from "react";
import CollaborativeRoom from "@/components/CollaborativeRoom";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDocument } from "@/lib/actions/room.actions";

async function Document({ params: { id } }: SearchParamProps) {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");
  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  });
  if (!room) redirect("/");

  return (
    <main className="flex w-full flex-col items-center">
      {/* <Editor/> */}

      <CollaborativeRoom roomId={id} roomMetadata={room.metadata} />
    </main>
  );
}

export default Document;
