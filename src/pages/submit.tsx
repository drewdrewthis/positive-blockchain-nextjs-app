import UploadCSV from "../components/UploadCSV";

async function uploadFile(file: File): Promise<any> {
  const data = new FormData();
  data.append("files", file, file.name);

  return fetch("/api/upload-csv", {
    method: "POST",
    body: data,
  }).then((data) => data.json());
}

function SubmitPage() {
  return (
    <div>
      <h1>Submit</h1>
      <UploadCSV
        onImageUpload={(file: Blob) => {
          uploadFile(file as File).then((data) => {
            console.log(data);
          });
        }}
      />
    </div>
  );
}

export default SubmitPage;
