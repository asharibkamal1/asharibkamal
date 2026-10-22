import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/modules/seo";
import { LegalPage } from "@/shared/layout/legal-page";

export const metadata = pageMetadata({
  title: "Refund Policy",
  description: `14-day money-back guarantee on digital products from ${siteConfig.name}.`,
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund Policy" updated="October 22, 2026">
      <p>
        I want every product to be genuinely useful. If it isn&apos;t right for you, you can get your money back.
      </p>

      <h2>14-day money-back guarantee</h2>
      <p>
        If you&apos;re not happy with a digital product (e-book, template, guide or course), email{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> within <strong>14 days of purchase</strong> with
        your order email address, and I&apos;ll refund you in full. A short note on what didn&apos;t work is appreciated
        but not required.
      </p>

      <h2>How refunds are processed</h2>
      <ul>
        <li>Refunds go back to the original payment method through the checkout provider.</li>
        <li>Banks usually show the refund within 5–10 business days.</li>
        <li>After a refund, your licence to use the product ends.</li>
      </ul>

      <h2>Exceptions</h2>
      <p>
        Refunds may be declined for requests made after 14 days, or where there&apos;s clear abuse of the policy (for
        example, repeated purchase-and-refund of the same product).
      </p>

      <h2>Freelance work</h2>
      <p>Refunds for freelance or consulting work follow the written agreement for that project.</p>
    </LegalPage>
  );
}
