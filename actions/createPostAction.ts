"use server";

import { AddPostRequestBody } from "@/app/api/posts/route";
import { cloudinary } from "@/cloudinary/config";
import { Post } from "@/mongodb/models/post";
import { IUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server";

export default async function createPostAction(formData: FormData, img?: string) {
  const user = await currentUser();
  
  if (!user) {
    throw new Error("User not authenticated!");
  }

  const postInput = formData.get("postInput") as string;
  const image = formData.get("image") as File;
  let imageUrl: string | undefined;
  if (!postInput) {
    throw new Error("post input is required");
  }

  //define user
  const userDB: IUser = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  };

  try {
    if (img) {
      //1. Upload image if there is one - 
      //2. create post in database with image
   
        const uploadedResponse = await cloudinary.uploader.upload(img);
        console.log(uploadedResponse)
        imageUrl = uploadedResponse.secure_url;

      const body: AddPostRequestBody = {
        user: userDB,
        text: postInput,
        imageUrl: imageUrl,
      };
      console.log(body)
      await Post.create(body);

    } else {
      //create post in database without image
      const body: AddPostRequestBody = {
        user: userDB,
        text: postInput,
      };

      await Post.create(body);
    }
  } catch (error: any) {
    throw new Error("Failed to create post", error.message);
  }

  //revalidate path "/" - homepage
}
