import Link from "next/link";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/modules/seo";
import { LegalPage } from "@/shared/layout/legal-page";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects your personal information.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="October 22, 2026">
      <p>
        This policy explains what personal information {siteConfig.name} (&ldquo;I&rdquo;, &ldquo;me&rdquo;) collects
        through {siteConfig.domain} (the &ldquo;site&rdquo;), why, and the choices you have. I keep data collection to the
        minimum needed to run the site.
      </p>

      <h2>What I collect</h2>
      <ul>
        <li>
          <strong>Newsletter signups:</strong> your email address (and first name if you provide it) when you join the
          newsletter or a product waitlist.
        </li>
        <li>
          <strong>Contact form:</strong> your name, email address, project type, budget range and message.
        </li>
        <li>
          <strong>Purchases:</strong> when you buy a product, payment is handled by the checkout provider. I receive your
          name, email address and order details, but never your full card number.
        </li>
        <li>
          <strong>Usage analytics:</strong> anonymous, aggregated page-view statistics (pages visited, referrer, country,
          device type). This analytics does not use cookies and does not identify you personally.
        </li>
      </ul>

      <h2>How I use it</h2>
      <ul>
        <li>To send the newsletter and the free resources you signed up for.</li>
        <li>To reply to your messages and enquiries.</li>
        <li>To deliver products you buy and provide support or refunds.</li>
        <li>To understand which content is useful and improve the site.</li>
      </ul>
      <p>I never sell or rent your personal information.</p>

      <h2>Services that process your data</h2>
      <p>I use trusted third-party services to run the site. They process data on my behalf:</p>
      <ul>
        <li>
          <strong>Vercel</strong> — website hosting and cookie-free analytics.
        </li>
        <li>
          <strong>Kit (ConvertKit)</strong> — newsletter and email delivery.
        </li>
        <li>
          <strong>Resend</strong> — delivering contact-form messages to my inbox.
        </li>
        <li>
          <strong>Lemon Squeezy</strong> — checkout, payments and product delivery (when products are available).
        </li>
      </ul>
      <p>These services may store data on servers outside your country.</p>

      <h2>Cookies</h2>
      <p>
        The site does not use advertising or tracking cookies. It stores your light/dark theme preference in your
        browser&apos;s local storage, which never leaves your device.
      </p>

      <h2>How long I keep data</h2>
      <p>
        Newsletter data is kept until you unsubscribe. Contact messages are kept as long as needed to handle your
        enquiry. Purchase records are kept as required for accounting and tax purposes.
      </p>

      <h2>Your choices and rights</h2>
      <ul>
        <li>Unsubscribe from the newsletter at any time using the link at the bottom of every email.</li>
        <li>
          Ask me to access, correct or delete your personal information by emailing{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </li>
      </ul>

      <h2>Children</h2>
      <p>The site is not directed at children under 13, and I do not knowingly collect their information.</p>

      <h2>Changes</h2>
      <p>
        If this policy changes, I&apos;ll update the date at the top of this page. Questions? Email{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or use the <Link href="/contact">contact form</Link>.
      </p>
    </LegalPage>
  );
}
