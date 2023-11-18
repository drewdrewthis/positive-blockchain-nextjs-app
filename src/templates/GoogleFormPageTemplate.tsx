import { useEffect, useState } from "react";

import Footer from "./partials/Footer";
import Header from "./partials/Header";

export default function GoogleFormPageTemplate(props: {
  iframeSrc: string;
  onSubmit?: () => void;
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
      className="flex flex-col h-full"
      style={{
        height: "100vh",
      }}
    >
      <Header />
      <div
        className="flex-1 overflow-y-auto"
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
      <Footer />
    </div>
  );
}
