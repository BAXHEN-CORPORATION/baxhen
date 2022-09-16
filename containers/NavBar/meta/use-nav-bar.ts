import { useListenScroll } from "hooks/custom";
import React from "react";

export const useNavBar = () => {
  const [open, setOpen] = React.useState(false);

  const [isOnPageTop, setIsOnPageTop] = React.useState(true);

  const toggleOpen = () => {
    setOpen((old) => !old);
  };

  const onScrollEvent = () => {
    setIsOnPageTop((old) => {
      if (window.scrollY === 0) {
        return true;
      }

      return false;
    });
  };

  //* Effects */

  useListenScroll({ onScrollEvent });

  return { open, setOpen, toggleOpen, isOnPageTop };
};
