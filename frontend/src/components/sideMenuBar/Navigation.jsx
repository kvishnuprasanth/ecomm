import * as React from "react";
import { motion } from "framer-motion";
import {MenuItem} from './MenuItem'

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export const Navigation = () => (
  <motion.ul variants={variants} className="absolute top-[70px] h-[100%] overflow-scroll no-scrollbar">
    {itemIds.map((name,index) => (
      <MenuItem name={name} key={index} />
    ))}
  </motion.ul>
);

const itemIds = ['All products','men','women','smart watches','wall clocks','alarm clock'];
// ,'$ 0-20','$ 21-40','$ 41-60','$ 61-80','$ >80'


export default Navigation
