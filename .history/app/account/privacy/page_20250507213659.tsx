import { AccountLayout } from "../components/account/account-layout";

export default function PrivacyPolicyPage() {
  return (
    <AccountLayout activeTab="privacy">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold mb-6">Privacy Policy</h2>

        <div className="prose max-w-none">
          <p className="mb-4">Last updated: May 1, 2025</p>

          <h3 className="text-xl font-bold mb-4">1. Introduction</h3>

          <p className="mb-4">
            At Lawbie, we respect your privacy and are committed to protecting your personal data. This privacy policy
            will inform you about how we look after your personal data when you visit our website and tell you about
            your privacy rights and how the law protects you.
          </p>

          <h3 className="text-xl font-bold mb-4">2. The Data We Collect About You</h3>

          <p className="mb-4">
            Personal data, or personal information, means any information about an individual from which that person can
            be identified. We may collect, use, store and transfer different kinds of personal data about you which we
            have grouped together as follows:
          </p>

          <ul className="list-disc pl-6 mb-4">
            <li>Identity Data includes first name, last name, username or similar identifier.</li>
            <li>Contact Data includes billing address, delivery address, email address and telephone numbers.</li>
            <li>Financial Data includes payment card details.</li>
            <li>
              Transaction Data includes details about payments to and from you and other details of products you have
              purchased from us.
            </li>
            <li>
              Technical Data includes internet protocol (IP) address, browser type and version, time zone setting and
              location, browser plug-in types and versions, operating system and platform, and other technology on the
              devices you use to access this website.
            </li>
          </ul>

          <h3 className="text-xl font-bold mb-4">3. How We Use Your Personal Data</h3>

          <p className="mb-4">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data
            in the following circumstances:
          </p>

          <ul className="list-disc pl-6 mb-4">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>
              Where it is necessary for our legitimate interests and your interests and fundamental rights do not
              override those interests.
            </li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>
        </div>
      </div>
    </AccountLayout>
  )
}
