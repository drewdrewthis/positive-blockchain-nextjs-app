import { useState } from "react";
import GoogleFormIframe from "../../components/GoogleFormIframe";
import Footer from "@/templates/partials/Footer";
import Header from "@/templates/partials/Header";
import { Button } from "@mui/material";

export default function TestCSVDownloadPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div
      className="flex flex-col h-full"
      style={{
        height: "100vh",
      }}
    >
      <Header />
      <div className="h-full">
        {!isSubmitted && (
          <GoogleFormIframe
            iframeSrc="https://docs.google.com/forms/d/e/1FAIpQLSfvtpox9rUMEaodUGVzBYUxu--un-1JF_HuH-mVnC8PkLhIzQ/viewform?embedded=true"
            onSubmit={() => {
              console.log("loaded");
              setIsSubmitted(true);
            }}
          />
        )}
        {isSubmitted && (
          <div className="container mx-auto text-center my-10 ">
            <div className="mb-5">
              <p className="text-2xl font-bold">
                Thank you for your submission!
              </p>
              <p className="">
                Please click the button below to download the CSV file.
              </p>
            </div>
            <Button className="btn btn-blue bg-blue-500" variant="contained">
              <a
                download="positive-blockchain-database.csv"
                href="/nextjs-app/api/download-csv"
              >
                Download CSV
              </a>
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
