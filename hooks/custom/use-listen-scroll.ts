import React from "react";

export interface UseListenScroll {
  onScrollEvent: (e: Event) => void;
}

export const useListenScroll = ({ onScrollEvent }: UseListenScroll) => {
  React.useEffect(() => {
    window.addEventListener("scroll", onScrollEvent);
    return () => {
      window.removeEventListener("scroll", onScrollEvent);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
