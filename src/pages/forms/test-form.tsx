import { useEffect, useState } from "react";
import GoogleFormPageTemplate from "../../templates/GoogleFormPage";

export default function ApiApplication() {
  return (
    <GoogleFormPageTemplate
      iframeSrc="https://docs.google.com/forms/d/e/1FAIpQLSfvtpox9rUMEaodUGVzBYUxu--un-1JF_HuH-mVnC8PkLhIzQ/viewform?embedded=true"
      onSubmit={() => alert("Is submitted!")}
    />
  );
}
