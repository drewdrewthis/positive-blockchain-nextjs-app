import Footer from "@/templates/partials/Footer";
import Header from "@/templates/partials/Header";
import { Button } from "@mui/material";
import {
  fetchLatestCsvInfoEnhanced,
  getLatestCsvInfo,
} from "../lib/google/drive";
import { GetServerSideProps } from "next";

export default function DownloadCsvPage(props: {
  id: string;
  name: string;
  parents: string[];
  downloadLink: string;
}) {
  const { downloadLink } = props;

  return (
    <div
      className="flex flex-col h-full"
      style={{
        height: "100vh",
      }}
    >
      <Header />
      <div className="h-full">
        <div className="container mx-auto text-center my-10 ">
          <div className="mb-5">
            <p className="text-2xl font-bold">
              Thank you for interest in PositiveBlockchain!
            </p>
            <p className="">
              Please click the button below to download the CSV file.
            </p>
          </div>
          <Button className="btn btn-blue bg-blue-500" variant="contained">
            <a download="positive-blockchain-database.csv" href={downloadLink}>
              Download CSV
            </a>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const info = await fetchLatestCsvInfoEnhanced();

  return {
    props: {
      ...info,
    },
  };
};
