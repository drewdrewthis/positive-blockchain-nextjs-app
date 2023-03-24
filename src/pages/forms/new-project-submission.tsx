import Header from "../../components/Header";

export default function ApiApplication() {
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
          src="https://docs.google.com/forms/d/e/1FAIpQLSekFpZpdRC8mGFkDoJREahh9OTrwjwK0n2XU1uVkLwR7qQHsw/viewform?embedded=true"
          width="640"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}
