import Header from "../components/Header";

export default function GoogleFormPageTemplate(props: { iframeSrc: string }) {
  const { iframeSrc } = props;

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
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}
