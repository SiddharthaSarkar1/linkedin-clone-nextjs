import connectDB from "@/mongodb/db";
import { IPostBase, Post } from "@/mongodb/models/post";
import { IUser } from "@/types/user";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export interface AddPostRequestBody {
  user: IUser;
  text: string;
  imageUrl?: string | null;
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    auth().protect(); //Protect the route with clerk authentication
    const { user, text, imageUrl }: AddPostRequestBody = await request.json();

    const postData: IPostBase = {
      user,
      text,
      ...(imageUrl && { imageUrl }),
    };

    const post = await Post.create(postData);
    return NextResponse.json({ message: "Post create d successfully", post });
  } catch (error) {
    return NextResponse.json(
      { error: `An error occured while fetching post ${error}` },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const posts = await Post.getAllPosts();
    // console.log(posts);
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occured while fetching post" },
      {
        status: 500,
      }
    );
  }
}
