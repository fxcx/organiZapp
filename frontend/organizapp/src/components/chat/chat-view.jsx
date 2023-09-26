"use client";

import Room from "@/components/chat/Room-view";
import UserMessage from "@/components/chat/user-view";

export default function ChatView() {
  return (
    <>
      <section>
        <Room />
      </section>
      <section className="flex h-screen">
        <UserMessage  />
      </section>
    </>
  );
}
