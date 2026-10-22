import Link from "next/link";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/modules/seo";
import { LegalPage } from "@/shared/layout/legal-page";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description: `Terms for using ${siteConfig.domain} and buying digital products from ${siteConfig.name}.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="October 22, 2026">
      <p>
        These terms apply to your use of {siteConfig.domain} (the &ldquo;site&rdquo;) and any digital products you buy
        from {siteConfig.name} (&ldquo;I&rdquo;, &ldquo;me&rdquo;). By using the site you agree to them.
      </p>

      <h2>Content on the site</h2>
      <p>
        Articles, guides and newsletters are provided for educational purposes. I share what has worked for me, but I
        can&apos;t guarantee specific results — technical, financial or otherwise. Nothing on the site is financial,
        legal or tax advice; check with a qualified professional for your situation.
      </p>
      <p>
        Code samples in articles may be used freely in your own projects. Please don&apos;t republish whole articles
        without permission; quoting with a link back is welcome.
      </p>

      <h2>Digital products</h2>
      <ul>
        <li>
          When you buy a product (such as an e-book or code template), you receive a personal, non-transferable licence
          to use it.
        </li>
        <li>
          You may use code templates in unlimited personal and client projects. You may not resell, share or
          redistribute the product files themselves, in original or modified form, as a competing template or product.
        </li>
        <li>
          Payments are processed by Lemon Squeezy, which acts as the merchant of record and handles applicable sales
          taxes.
        </li>
        <li>
          Refunds are covered by the <Link href="/refund-policy">Refund Policy</Link>.
        </li>
      </ul>

      <h2>Freelance services</h2>
      <p>
        Freelance and consulting work is agreed separately in writing (scope, price, timeline and payment terms). Those
        agreements take priority over these terms for that work.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Please don&apos;t misuse the site — for example by attempting to break its security, sending spam through its
        forms, or scraping it in a way that disrupts service.
      </p>

      <h2>Third-party links</h2>
      <p>
        The site links to other websites and tools, some through affiliate links. I&apos;m not responsible for their
        content or practices.
      </p>

      <h2>Liability</h2>
      <p>
        The site and products are provided &ldquo;as is&rdquo;. To the extent allowed by law, I&apos;m not liable for
        indirect or consequential losses arising from using the site or products. My total liability for any product is
        limited to the amount you paid for it.
      </p>

      <h2>Changes</h2>
      <p>
        I may update these terms; the date at the top shows the latest version. Questions? Email{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </LegalPage>
  );
}
