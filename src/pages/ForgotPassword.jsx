import { useState } from "react";
import { Link } from "react-router-dom";

import PublicHeader from "../components/PublicHeader";
import PublicFooter from "../components/PublicFooter";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen w-screen flex flex-col font-sans bg-[#f0f0f0]">

      <PublicHeader />

      <main className="flex-1 flex items-center justify-center p-4">
        {/* BODY CONTENT UNCHANGED */}
      </main>

      <PublicFooter />
    </div>
  );
}
