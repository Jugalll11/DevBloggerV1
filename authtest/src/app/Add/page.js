"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useSession } from "next-auth/react";

async function upload(title, content, id) {
  

  if (title !== "" && content !== "") {
    await axios.post('http://localhost:4452/api/post/addPost', {
      title: title,
      authorID: id,
      content: content
    })
  }
}

export default function Home() {
  const session = useSession();
  const nav = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div className="m-auto p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Add Post</Button>
        </DialogTrigger>
        <DialogContent className="text-accent-foreground sm:max-w-[425px]">
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-y-1 flex-center">
              <h1>Title:</h1>
              <Input
                id="title"
                className="col-span-3"
                onChange={(e) => {
                  setTitle(e.target.value);
                  console.log("Title: ", e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-y-1 flex-center">
              <h1>Content:</h1>
              <Input
                id="content"
                className="col-span-3 h-40 break-words"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => {
              upload(title, content, session.data.user.id)
              nav.push('/home');
            }}>Upload</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}