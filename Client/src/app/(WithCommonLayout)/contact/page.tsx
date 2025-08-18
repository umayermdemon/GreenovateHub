import ContactPage from "@/components/modules/Contact/ContactPage";
import { Suspense } from "react";

const Contact = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactPage />
    </Suspense>
  );
};

export default Contact;
