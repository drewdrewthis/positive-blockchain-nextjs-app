import { useEffect, useState } from "react";
import cx from "classnames";

export default function GoogleFormIframe(props: {
  iframeSrc: string;
  onSubmit?: () => void;
  className?: string;
}) {
  const [loadCount, setLoadCount] = useState(0);
  const { iframeSrc, onSubmit } = props;

  useEffect(() => {
    if (loadCount === 2) {
      onSubmit && onSubmit();
    }
  }, [loadCount, onSubmit]);

  return (
    <div
      className={cx("flex-1 overflow-y-auto", props.className)}
      style={{
        width: "100vw",
        height: "100%",
      }}
    >
      <iframe
        className="py-10"
        style={{
          width: "100vw",
          height: "100%",
        }}
        src={iframeSrc}
        width="640"
        onLoad={() => setLoadCount(loadCount + 1)}
      >
        Loading…
      </iframe>
    </div>
  );
}
