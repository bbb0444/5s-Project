import { Category, Categories } from "../../lib/types";
import styles from "../view.module.scss";
import Image from "next/image";
import { SenseImage, senseImageMap, Post } from "../../lib/types";
import SVGLoader from "../../components/SVGLoader";
import Middle from "./MiddleMotion";
import { colours } from "@/app/colours";
import PostViewer from "./PostViewer";
import ClientEffects from "./ClientEffects";

interface params {
  category: Category;
}
export async function generateStaticParams() {
  // force static server side generation of dynamic page routes
  return Categories.map((category) => {
    return {
      params: {
        category,
      },
    };
  });
}

export default function Search({ params }: { params: params }) {
  const Sense = senseImageMap.get(params.category);

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <PostViewer />
      </div>
      {Sense && <Middle sense={Sense} />}
      <div className={styles.bottom}>
        <PostViewer
          overflowDirection="left"
          sortOrder="desc"
          position="bottom"
        />
      </div>
      <ClientEffects />
    </div>
  );
}
