import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { ChangeEvent, useState } from "react";

interface Props {
  onImageUpload(file: Blob): void;
}
function useController(props: Props) {
  const { onImageUpload } = props;
  const [imgSrc, setImageSrc] = useState<string | void>();

  return {
    handleUpload(event: ChangeEvent<HTMLInputElement>) {
      if (!event.target.files) return;
      onImageUpload(event.target.files?.[0]);
      setImageSrc(URL.createObjectURL(event.target.files[0]));
    },
    imgSrc,
  };
}
export default function UploadCSV(props: Props) {
  const { handleUpload, imgSrc } = useController(props);

  return imgSrc ? (
    <div>image uploaded</div>
  ) : (
    <>
      <Box
        component="span"
        sx={{ p: 2, border: "1px dashed grey", minHeight: "30vh" }}
        className="w-full flex-1 flex justify-center"
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* consider a complex upload with image
            https://mui.com/material-ui/react-button/#complex-button
             */}
          <Button variant="contained" component="label">
            Upload CSV
            <input
              hidden
              accept=".csv"
              multiple={false}
              type="file"
              onChange={handleUpload}
            />
          </Button>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
        </Stack>
      </Box>
      <div className="text-xs" style={{ marginTop: -20 }}>
        Max: 4.5MB
      </div>
    </>
  );
}
