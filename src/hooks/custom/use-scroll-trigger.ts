import React from "react";
import { useListenScroll } from "./use-listen-scroll";

export const useScrollTrigger = () => {
  const [trigger, setTrigger] = React.useState(false);
  const [, setScrollY] = React.useState(0);

  const onScrollEvent = () => {
    setScrollY((old) => {
      if (old > window.scrollY) {
        setTrigger(false);
      }
      if (old < window.scrollY) {
        setTrigger(true);
      }
      return window.scrollY;
    });
  };

  useListenScroll({ onScrollEvent });

  return trigger;
};
