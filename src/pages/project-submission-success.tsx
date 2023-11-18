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
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-4xl font-bold mb-5">
          Project Submission Successful!
        </h1>
        <p className="text-lg mb-10">
          Thank you for submitting your project information.
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
