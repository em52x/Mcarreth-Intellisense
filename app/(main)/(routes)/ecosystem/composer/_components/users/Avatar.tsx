import React from "react";
import styles from "./Avatar.module.css";
import Image from "next/image";

const IMAGE_SIZE = 48;

export function Avatar({ name, otherStyles }: { otherStyles: string; name: string }) {
  const avatarUrl = `https://avatar.iran.liara.run/username?username=[firstname+lastname]`;
  
  return (
    <div className={`${styles.avatar} ${otherStyles} h-9 w-9`} data-tooltip={name}>
      <Image
        src={avatarUrl}
        fill
        className={styles.avatar_picture}
        alt={name}
      />
    </div>
  );
}
