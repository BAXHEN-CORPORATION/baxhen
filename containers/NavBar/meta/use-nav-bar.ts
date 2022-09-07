import React from "react";

export const useNavBar = () => {
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => {
    setOpen((old) => !old);
  };
  return { open, setOpen, toggleOpen };
};
