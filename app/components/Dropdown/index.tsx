import React from "react";
import Image from "next/image";

import styles from "./Dropdown.module.scss";
import exp from "constants";

type DropDownItemProps = {
  name: string;
  imageSRC: string;
  imageALT: string;
  onClick: () => void;
};

type DropDownMenuProps = {
  name: string;
  children: React.ReactNode;
};

function DropDownMenu(props: DropDownMenuProps) {
  const [Open, setOpen] = React.useState(false);

  return (
    <div onClick={() => setOpen(!Open)}>
      <div className={styles.button}>
        <h1>{props.name}</h1>
      </div>

      {Open && props.children}
    </div>
  );
}

function DropDownItem(props: DropDownItemProps) {
  return (
    <div onClick={props.onClick} className={styles.item}>
      <h1>{props.name}</h1>
      <Image src={props.imageSRC} alt={props.imageALT} width={50} height={50} />
    </div>
  );
}

export { DropDownMenu, DropDownItem };
