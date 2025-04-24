export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export const menuVariants = {
  open: { x: 0, transition: { duration: 0.3 } },
  closed: { x: '-100%', transition: { duration: 0.3 } },
};
