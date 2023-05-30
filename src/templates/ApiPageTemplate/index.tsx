import Footer from "@/templates/partials/Footer";
import Header from "@/templates/partials/Header";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import spec from "./swagger";
import Link from "next/link";
import { Button } from "@mui/material";

export default function ApiPageTemplate() {
  return (
    <div
      className="flex flex-col"
      style={{
        minHeight: "100vh",
      }}
    >
      <Header />
      <div className="-z-10">
        <div className="container mx-auto text-center my-10">
          <div className="font-bold">
            Note: You will need to have a valid api key to access the api.
          </div>

          <Link href="/forms/request-api-key">
            <Button>Click here to request an api key.</Button>
          </Link>
        </div>
      </div>
      <SwaggerUI spec={spec} />
      <Footer />
    </div>
  );
}
