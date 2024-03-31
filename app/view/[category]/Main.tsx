"use client";
import styles from "../view.module.scss";
import { SenseImage, senseImageMap, Post } from "../../lib/types";
import CategorySelect from "@/app/components/CategorySelect";
import { colours } from "@/app/colours";
import PostViewer from "./PostViewer";
import ClientEffects from "./ClientEffects";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function Main({ sense }: { sense: SenseImage }) {
  const controlsTop = useAnimation();
  const controlsBottom = useAnimation();
  const [senseState, setSense] = useState(sense);

  interface postObj {
    postsASC: Post[];
    postsDESC: Post[];
  }
  const postDataInit: postObj = {
    postsASC: [],
    postsDESC: [],
  };

  const [postData, setPostData] = useState<postObj>(postDataInit);
  const increment = 2;
  const [numOfPosts, setNumOfPosts] = useState(0);
  const [totalNumOfPosts, setTotalNumOfPosts] = useState(0);
  const [from, setFrom] = useState(0);
  const [count, setCount] = useState(increment);
  const [isFetching, setIsFetching] = useState(false);
  const [endOfPosts, setEndOfPosts] = useState(false);

  const category = senseState.text;

  const animateOut = async () => {
    await Promise.all([
      controlsTop.start({
        // opacity: 0,
        y: "-100%",
        transition: { duration: 0.5 },
      }),
      controlsBottom.start({
        // opacity: 0,
        y: "+100%",
        transition: { duration: 0.5 },
      }),
    ]);
    return true;
  };

  const setSenseState = (sense: SenseImage) => {
    setSense(sense);
    window.location.href = "/view/" + sense.text;
  };

  const fetchPosts = async () => {
    if (isFetching || endOfPosts) return; // If a fetch operation is in progress, exit the function
    setIsFetching(true);

    try {
      const response = await fetch(
        `/api/posts?from=${from}&count=${count}&category=${category}`
      );

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      await response.json().then((newPostsASC) => {
        if (newPostsASC.length < increment) {
          setEndOfPosts(true);
        }
        // console.log(position, sortOrder, "sorting");
        const newPostsDESC = [...newPostsASC].sort((a: Post, b: Post) =>
          a.id < b.id ? 1 : -1
        );

        setPostData((prevState) => ({
          postsASC: [...prevState.postsASC, ...newPostsASC],
          postsDESC: [...prevState.postsDESC, ...newPostsDESC],
        }));
        const newPostsLength = newPostsASC.length;

        setNumOfPosts(newPostsLength);
        setFrom(from + newPostsLength);
        setCount(count + increment);

        console.log(postData);
      });
    } catch (error) {
      console.log("Fetch Error: ", error);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchTotalPostCount = async () => {
    try {
      const response = await fetch(`/api/posts/total?category=${category}`);

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      await response
        .json()
        .then((data) => setTotalNumOfPosts(data.posts[0].uploads));
    } catch (error) {
      console.log("Fetch Error: ", error);
    } finally {
      fetchPosts();
    }
  };

  const onScrollEnd = () => {};

  useEffect(() => {
    fetchTotalPostCount();
  }, []);
  return (
    <div className={styles.main}>
      <motion.div className={styles.top} animate={controlsTop}>
        <PostViewer
          posts={postData.postsASC}
          numOfPosts={numOfPosts}
          endOfPosts={endOfPosts}
          onScrollEnd={onScrollEnd}
        />
      </motion.div>
      {senseState && (
        <CategorySelect
          sense={senseState}
          animateOut={() => animateOut()}
          setSense={setSenseState}
          hover={true}
        />
      )}
      <motion.div className={styles.bottom} animate={controlsBottom}>
        <PostViewer
          overflowDirection="left"
          sortOrder="desc"
          position="bottom"
          posts={postData.postsDESC}
          numOfPosts={numOfPosts}
          endOfPosts={endOfPosts}
          onScrollEnd={onScrollEnd}
        />
      </motion.div>
      <ClientEffects />
    </div>
  );
}
