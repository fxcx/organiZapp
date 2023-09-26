"use client";

import Room from "@/components/chat/Room-view";
import Message from "@/components/chat/message";
import User from "./user";

export default function ChatView() {
  return (
    <>
      <section>
        <Room />
      </section>
      <section className="flex h-screen">
        <User/>
        <Message  />
      </section>
    </>
  );
}
