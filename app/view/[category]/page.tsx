import { Category, Categories } from "../../lib/types";
import styles from "../view.module.scss";
import { senseImageMap } from "../../lib/types";
import Main from "./Main";

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

  return <div className={styles.main}>{Sense && <Main sense={Sense} />}</div>;
}
