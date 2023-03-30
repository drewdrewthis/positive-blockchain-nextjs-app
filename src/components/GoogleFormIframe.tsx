import { useEffect, useRef, useState } from "react";
import cx from "classnames";

export default function GoogleFormIframe(props: {
  iframeSrc: string;
  onSubmit?: () => void;
  className?: string;
}) {
  const [loadCount, setLoadCount] = useState(-1);
  const { iframeSrc, onSubmit } = props;

  useEffect(() => {
    console.log("loaded", loadCount);
    if (loadCount === 1) {
      onSubmit && onSubmit();
    }
  }, [loadCount, onSubmit]);

  const ref = useRef<HTMLIFrameElement>(null);

  // We use this to check to see if it the iframe has loaded
  // the onLoad event is not reliable for this,
  // but it *will* definitely fire on submit
  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current && loadCount < 0) {
        console.log("loaded", loadCount);
        setLoadCount(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div
      className={cx("overflow-y-auto", props.className)}
      style={{
        width: "100vw",
        height: "100%",
      }}
    >
      <iframe
        className="py-10"
        ref={ref}
        style={{
          width: "100vw",
          height: "100%",
        }}
        src={iframeSrc}
        width="640"
        onLoad={(event) => {
          if (loadCount === 0) {
            setLoadCount(loadCount + 1);
          }
        }}
      >
        Loading…
      </iframe>
    </div>
  );
}

// function observeDom() {
//   if (typeof window === "undefined") return;

//   var MutationObserver =
//     window.MutationObserver || window.WebKitMutationObserver;

//   return function (obj, callback) {
//     if (!obj || obj.nodeType !== 1) return;

//     if (MutationObserver) {
//       // define a new observer
//       var mutationObserver = new MutationObserver(callback);

//       // have the observer observe for changes in children
//       mutationObserver.observe(obj, { childList: true, subtree: true });
//       return mutationObserver;
//     }

//     // browser support fallback
//     else if (window.addEventListener) {
//       obj.addEventListener("DOMNodeInserted", callback, false);
//       obj.addEventListener("DOMNodeRemoved", callback, false);
//     }
//   };
// })();
