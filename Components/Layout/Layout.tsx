import React from 'react';
import cx from 'classnames';
import Head from 'next/head';
import { motion } from 'framer-motion';

const variants = {
  hidden: { y: 20, x: 0, opacity: 0 },
  enter: { y: 0, x: 0, opacity: 1 },
  exit: { y: 20, x: 0, opacity: 0 },
};

interface LayoutProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, title, className }) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      className={cx([className || null])}
      transition={{ duration: 0.4, type: 'easeInOut' }}
    >
      {title && (
        <Head>
          <title>{title} - Noted</title>
        </Head>
      )}
      {children}
    </motion.div>
  );
};

export default Layout;
