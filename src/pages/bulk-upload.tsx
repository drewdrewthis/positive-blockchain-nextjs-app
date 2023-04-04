import Footer from "@/templates/partials/Footer";
import Header from "@/templates/partials/Header";
import { getLatestCsvInfo } from "../lib/google/drive";
import { GetServerSideProps } from "next";
import UploadCSV from "../components/UploadCSV";

async function uploadFile(file: File): Promise<any> {
  const data = new FormData();
  data.append("files", file, file.name);

  return fetch("/api/upload-csv", {
    method: "POST",
    body: data,
  }).then((data) => data.json());
}

export default function BulkUpload(props: {
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
              Please upload your CSV file below. We will review your request and
              integrate it with our database.
            </p>
          </div>
          <UploadCSV
            onImageUpload={(file: Blob) => {
              uploadFile(file as File).then((data) => {
                console.log(data);
              });
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const info = await getLatestCsvInfo();
  const parsedInfo = parseFileContents(info);

  return {
    props: {
      ...parsedInfo,
    },
  };
};

function parseFileContents(
  fileInfo: {
    id: string;
    name: string;
    parents: string[];
  } | void
) {
  if (!fileInfo) return {};

  const timestamp = fileInfo?.name
    ?.split("pb_database_download-")[1]
    .split(".csv")[0];

  return {
    ...fileInfo,
    timestamp,
    downloadLink: createDownloadLink(fileInfo?.id),
  };
}

function createDownloadLink(id: string) {
  return `https://drive.google.com/uc?id=${id}&export=`;
}
