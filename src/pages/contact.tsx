import { Containers } from "@/components";
import { ContactPageContent } from "@/src/pagesShared/ContactPageContent";

export default function Contact() {
  return (
    <Containers.Layout>
      <Containers.Section el={<ContactPageContent />} />
    </Containers.Layout>
  );
}

