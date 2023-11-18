import { useRouter } from "next/navigation";
import React from "react";

import Footer from "@/templates/partials/Footer";
import Header from "@/templates/partials/Header";

function ProjectSubmissionSuccess() {
  const router = useRouter();

  const handleContinue = () => {
    router.replace("/");
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center mt-10 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-5">
          Thank you for your submission
        </h1>
        <p className="text-lg mb-10 text-center">
          We have recorded your information for review and will update the
          database promptly. If you have any questions, please don&apos;t
          hesitate to reach out to us at&nbsp;
          <a
            href="mailto:hello@positiveblockchain.io"
            className="text-brand-link"
          >
            hello@positiveblockchain.io
          </a>
          .
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default ProjectSubmissionSuccess;
