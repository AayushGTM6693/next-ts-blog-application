"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/app/components/LogoBanner";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import SimilarPosts from "@/app/components/SimilarPosts/page";
import Link from "next/link";
import postsData from "../../../../public/posts.json";
import { format } from 'date-fns'; 
import {
  TwitterShareButton,
  FacebookShareButton,
  EmailShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
} from "react-share";
import {
  TwitterIcon,
  FacebookIcon,
  EmailIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
} from "react-share";

interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  authorId: number;
  publishedDate: string;
  category: string;
}

export default function PostPage() {
  const pathName = usePathname();
  const parts = pathName.split("/post/");
  const postID = parseInt(parts[1]);
  const [post, setPost] = useState<Post | null>(null);
  const posts = postsData.posts;

  useEffect(() => {
    getPostInfo();
  }, []);

  const getPostInfo = () => {
    const selectedPost = posts.find((post) => post.id === postID);
    if (selectedPost) {
      setPost(selectedPost);
    } else {
      console.log("Post not found.");
    }
  };
  
  return (
    <>
      <Navigation />
      <Header />

      { post ? (
        <div className="container w-full rounded-xl bg-gray-100 mx-auto m-4 p-6 text-black flex flex-col shadow-lg">
          <p className="text-sm text-black-600">Category: {post.category}</p>
          <div className="container flex justify-between mx-auto items-center m-5">
            <h2 className="text-2xl font-bold mt-4 mb-4 capitalize">
              {post.title}
            </h2>
            <div>
              <p className="text-sm text-gray-600">Posted date: {format(new Date(post.publishedDate), 'MMM d, yyyy')}</p>
              <p className="text-sm text-gray-600">Author - 
                <Link href={`/author/${post.authorId}`} className="text-blue-950 font-bold hover:text-black"> {post.author}</Link></p>
            </div>
          </div>

          <p className="text-lg capitalize mb-5">
            {[...Array(10)].map((_, index) =>
              index === 0 ? post.description : ` ${post.description}`
            )}
          </p>

          <div className="container mx-auto m-4 justify-start items-start gap-2 mb-2">
            <h3 className="text-lg font-extrabold mb-2">
              Share on social media:{" "}
            </h3>
            <ul className="flex gap-4">
              <li>
                <TwitterShareButton url={pathName} title={post.title}>
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
              </li>
              <li>
                <FacebookShareButton url={pathName} title={post.title}>
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
              </li>
              <li>
                <EmailShareButton url={pathName} title={post.title}>
                  <EmailIcon size={32} round={true} />
                </EmailShareButton>
              </li>
              <li>
                <RedditShareButton url={pathName} title={post.title}>
                  <RedditIcon size={32} round={true} />
                </RedditShareButton>
              </li>
              <li>
                <TelegramShareButton url={pathName} title={post.title}>
                  <TelegramIcon size={32} round={true} />
                </TelegramShareButton>
              </li>
              <li>
                <TumblrShareButton url={pathName} title={post.title}>
                  <TumblrIcon size={32} round={true} />
                </TumblrShareButton>
              </li>
            </ul>
          </div>
        </div>
      ) : <p className="container w-full rounded-xl bg-gray-100 mx-auto m-4 p-6 text-black flex flex-col items-center">Post Not Found</p>}
      <SimilarPosts />
      <br />

      <Footer />
    </>
  );
}
