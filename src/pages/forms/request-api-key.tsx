import { config } from "../../configuration/config";
import GoogleFormPageTemplate from "../../templates/GoogleFormPageTemplate";

const { api_request_key } = config.constants.google.forms;

export default function ApiApplication() {
  return (
    <GoogleFormPageTemplate
      iframeSrc={`https://docs.google.com/forms/d/e/${api_request_key.id}/viewform?embedded=true`}
    />
  );
}
