"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ImageIcon } from "lucide-react";

const PostForm = () => {
  const { user } = useUser();

  return (
    <div>
      <form action="">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <input
            type="text"
            name="postInput"
            placeholder="Start writing a post...."
            className="flex-1 outline-none rounded-full py-3 px-4 border"
          />
          {/* Only image will be picked because of accept="image/*" */}
          <input type="file" name="image" accept="image/*" hidden />
          <button type="submit" hidden>
            Post
          </button>
        </div>

        {/* Preview Conditional Check */}

        <div className="">
            <Button>
                <ImageIcon className="mr-2" size={26} color="currentColor" />
                Add
            </Button>
        </div>

        {/* Add a remove preview button */}
      </form>
    </div>
  );
};

export default PostForm;
