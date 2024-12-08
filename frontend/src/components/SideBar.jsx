import '../sidebar.css'
import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { MenuToggle } from "./sideMenuBar/MenuToggle";
import { Navigation } from "./sideMenuBar/Navigation";
import { useSelector,useDispatch} from 'react-redux'

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

export const SideBar = () => {
  const isSideOpen=useSelector((state)=>state.isSideOpen.isSideOpen)
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);

  return (
    <motion.nav
      initial={false}
      animate={isSideOpen ? "open" : "closed"}
      ref={containerRef}
      className={`z-[2] h-[100vh] w-auto fixed -top-8 left-0 justify-center items-center`}
    >
      <motion.div className=" bottom-0 w-[300px] h-full absolute top-0 left-0 bg-black" variants={sidebar} />
      <Navigation />
      {/* <MenuToggle toggle={() => toggleOpen()} /> */}
    </motion.nav>
  );
};
export default SideBar