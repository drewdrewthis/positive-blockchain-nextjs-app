import GoogleFormIframe from "../../components/GoogleFormIframe";
import Footer from "@/templates/partials/Footer";
import Header from "@/templates/partials/Header";

const BULK_IMPORT_REQUEST_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSddnEmIJzdzWyNU-EtlGFf2su-6lFUgg96okmgRL-hyp0Ofww/viewform?embedded=true";

export default function TestCSVDownloadPage() {
  return (
    <div
      className="flex flex-col h-full"
      style={{
        height: "100vh",
      }}
    >
      <Header />
      <div className="h-full">
        <GoogleFormIframe iframeSrc={BULK_IMPORT_REQUEST_FORM_URL} />
      </div>
      <Footer />
    </div>
  );
}
