"use client";

import { useEffect, useRef, useState } from "react";
import { getPosts } from "../../lib/mockData";
import styles from "../view.module.scss";
import { Post } from "@/app/lib/types";
import PostCard from "@/app/components/PostCard";
import { motion, useAnimation } from "framer-motion";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import LoadingBar from "@/app/components/LoadingBar";

interface PostViewerProps {
  overflowDirection?: "left" | "right";
  sortOrder?: "asc" | "desc";
  position?: "top" | "bottom";
}

function PostViewer({
  overflowDirection = "right",
  sortOrder = "asc",
  position = "top",
}: PostViewerProps) {
  const [posts, setPosts] = useState([]);
  const postContainerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [postWidth, setPostWidth] = useState(0);
  const [numOfPosts, setNumOfPosts] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [loading, setLoading] = useState(false);

  const initialPos = position === "top" ? "-100%" : "100%";

  useEffect(() => {
    const fetchPosts = async () => {
      let posts = await getPosts().then((res) => res);
      if (sortOrder == "desc") {
        // console.log(position, sortOrder, "sorting");
        posts = posts.sort((a: Post, b: Post) => (a.id < b.id ? 1 : -1));
      }
      setPosts(posts);
      setNumOfPosts(posts.length);
      // setLoading(false);
    };

    fetchPosts();
  }, [sortOrder, position]);

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
    const scrollSpace = numOfPosts * postWidth - postWidth * 1; //
    if (sortOrder === "desc") {
      scrollLeft = -scrollLeft;
    }

    if (scrollLeft >= scrollSpace - windowWidth) {
      console.log("end", "scrollLeft", scrollLeft, "scrollSpace", scrollSpace);
      setLoading(true);
    } else {
      console.log("scrollLeft", scrollLeft, "scrollSpace", scrollSpace);
    }

    // if (
    //   window.innerHeight + document.documentElement.scrollTop !==
    //   document.documentElement.offsetHeight
    // )
    //   return;
    // console.log("yo");
  };

  useEffect(() => {
    if (
      !postContainerRef.current ||
      numOfPosts == 0 ||
      postWidth == 0 ||
      windowWidth == 0
    )
      return;
    postContainerRef.current!.addEventListener("scrollend", handleScroll);
    return () => window.removeEventListener("scrollend", handleScroll);
  }, [numOfPosts, postWidth, postContainerRef.current, windowWidth]);

  useEffect(() => {
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
  }, [posts]);

  useEffect(() => {
    if (postWidth > 0) {
      controls.start((index) =>
        postWidth * (index + 1) > postContainerRef.current!.clientWidth * 2
          ? {
              opacity: 1,
              transition: { duration: 0 },
              y: 0,
            }
          : {
              opacity: 1,
              transition: { duration: 0.5, delay: index * 0.3 },
              y: 0,
            }
      );
    }
  }, [postWidth, controls]);

  useEffect(() => {
    const resiseContainer = () => {
      if (window.innerWidth) {
        setWindowWidth(window.innerWidth);
        console.log("resize", window.innerWidth);
      }
    };
    addEventListener("resize", resiseContainer);
    resiseContainer();

    return () => removeEventListener("resize", resiseContainer);
  }, []);

  return (
    <motion.div
      className={styles.postContainer}
      style={{ direction: overflowDirection === "left" ? "rtl" : "ltr" }}
      ref={postContainerRef}
    >
      {posts &&
        posts.map((post: Post, index: number) => {
          // console.log(postWidth, postContainerRef.current?.clientWidth);
          return (
            <motion.div
              className={styles.postCard}
              key={post.id}
              custom={index}
              animate={controls}
              initial={
                postWidth * (index + 1) < postContainerRef.current!.clientWidth
                  ? { opacity: 0, y: initialPos }
                  : { opacity: 0, y: 0 }
              }
            >
              <PostCard post={post} />
            </motion.div>
          );
        })}
      <LoadingBar direction={position == "top" ? "forwards" : "backwards"} />
    </motion.div>
  );
}

export default PostViewer;
