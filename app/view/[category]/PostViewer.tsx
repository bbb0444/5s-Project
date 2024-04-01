"use client";

import { useEffect, useRef, useState, memo } from "react";
import styles from "../view.module.scss";
import { Category, Post } from "@/app/lib/types";
import PostCard from "@/app/components/PostCard";
import { motion, useAnimation } from "framer-motion";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import LoadingBar from "@/app/components/LoadingBar";
import MovingText from "@/app/components/MovingText";

interface PostViewerProps {
  overflowDirection?: "left" | "right";
  sortOrder?: "asc" | "desc";
  position?: "top" | "bottom";
  posts: Post[];
  numOfPosts: number;
  endOfPosts: boolean;
  onScrollEnd: () => void;
}

function PostViewer({
  overflowDirection = "right",
  sortOrder = "asc",
  position = "top",
  posts,
  numOfPosts,
  endOfPosts,
  onScrollEnd,
}: PostViewerProps) {
  const postContainerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [postWidth, setPostWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const initialPos = position === "top" ? "-100%" : "100%";
  const MemoizedPostCard = memo(PostCard);

  // useEffect(() => {
  //   // disableBodyScroll(document.body);
  //   // controls.start((index) => ({
  //   //   opacity: 1,
  //   //   transition: { duration: 1, delay: index * 0.3 },
  //   //   y: 0,
  //   // }));
  //   // enableBodyScroll(document.body);

  //   const interval = setInterval(() => {
  //     if (postContainerRef.current) {
  //       const postWidth = (postContainerRef.current.firstChild as HTMLElement)
  //         .offsetWidth;
  //       postContainerRef.current.scrollBy({
  //         left: overflowDirection === "right" ? postWidth : -postWidth,
  //         behavior: "smooth",
  //       });
  //     }
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [overflowDirection, posts, controls]);

  const handleScroll = () => {
    let scrollLeft = postContainerRef.current!.scrollLeft;

    if (position === "bottom") {
      scrollLeft = -1 * scrollLeft;
    }
    const container = postContainerRef.current!;
    const scrollRight =
      container.scrollWidth - scrollLeft - container.clientWidth;

    if (scrollRight <= postWidth * 2) {
      console.log("Reached the end of the container, fetching more posts");
      onScrollEnd();
    }
  };

  useEffect(() => {
    if (!postContainerRef.current || postWidth == 0 || windowWidth == 0) return;
    postContainerRef.current!.addEventListener("scrollend", handleScroll);
    return () => window.removeEventListener("scrollend", handleScroll);
  }, [postWidth, postContainerRef.current, windowWidth]);

  useEffect(() => {
    const resiseContainer = () => {
      if (window.innerWidth) {
        setWindowWidth(window.innerWidth);
        // console.log("resize", window.innerWidth);
      }
    };
    addEventListener("resize", resiseContainer);
    resiseContainer();

    const updatePostWidth = () => {
      if (postContainerRef.current && postContainerRef.current.firstChild) {
        const width = (postContainerRef.current.firstChild as HTMLElement)
          .offsetWidth;
        if (width !== 0) {
          setPostWidth(width);
        }
      }
    };

    updatePostWidth();

    return () => removeEventListener("resize", resiseContainer);
  }, []);

  return (
    <motion.div
      className={styles.postContainer}
      style={{ direction: overflowDirection === "left" ? "rtl" : "ltr" }}
      ref={postContainerRef}
      initial="hidden"
      animate="show"
    >
      {posts &&
        posts.map((post: Post, index: number) => {
          // console.log(postWidth, postContainerRef.current?.clientWidth);
          return (
            <motion.div
              className={styles.postCard}
              key={`${post.id}-${index}`}
              custom={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }} // Set the delay here
            >
              <MemoizedPostCard post={post} />
            </motion.div>
          );
        })}
      {!endOfPosts && (
        <LoadingBar direction={position == "top" ? "forwards" : "backwards"} />
      )}
      {endOfPosts && numOfPosts == 0 && (
        <MovingText text={"nothing to see here"} />
      )}
    </motion.div>
  );
}

export default PostViewer;
