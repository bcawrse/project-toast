import React from "react";

function useEscapeKey(callback) {
  React.useEffect(() => {
    function handleEscapeKeydown(e) {
      if (e.key === "Escape") {
        callback();
      }
    }
    window.addEventListener("keydown", handleEscapeKeydown);
    return () => {
      window.removeEventListener("keydown", handleEscapeKeydown);
    };
  }, [callback]);
}

export default useEscapeKey;
