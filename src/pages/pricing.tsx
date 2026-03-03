import { Containers } from "@/components";
import { PricingPageContent } from "@/src/pagesShared/PricingPageContent";

export default function Pricing() {
  return (
    <Containers.Layout>
      <Containers.Section el={<PricingPageContent />} />
    </Containers.Layout>
  );
}

