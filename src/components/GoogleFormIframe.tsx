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
    console.log("Google form load count:", loadCount);

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
        setLoadCount(0);
        clearInterval(interval);
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
