/* eslint-disable react/no-unescaped-entities */
import { AccountLayout } from "@"

export default function TermsAndConditionsPage() {
  return (
    <AccountLayout activeTab="terms">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold mb-6">Terms & Conditions</h2>

        <div className="prose max-w-none">
          <p className="mb-4">Last updated: May 1, 2025</p>

          <h3 className="text-xl font-bold mb-4">1. Introduction</h3>

          <p className="mb-4">
            These terms and conditions govern your use of our website and the purchase of products from our online
            store. By accessing our website or placing an order, you agree to be bound by these terms and conditions.
          </p>

          <h3 className="text-xl font-bold mb-4">2. Definitions</h3>

          <p className="mb-4">
            "Company", "we", "us" or "our" refers to Lawbie. "Customer", "you" or "your" refers to the person accessing
            this website and/or placing an order. "Products" refers to the legal documents and templates available for
            purchase on our website.
          </p>

          <h3 className="text-xl font-bold mb-4">3. Products</h3>

          <p className="mb-4">
            All Products are digital downloads. We make every effort to display as accurately as possible the content of
            our Products, but we cannot guarantee that your computer's display accurately reflects the content of our
            Products.
          </p>

          <h3 className="text-xl font-bold mb-4">4. Ordering</h3>

          <p className="mb-4">
            When you place an order, you are offering to purchase a Product. We will confirm our acceptance of your
            order by sending you an email. The contract between us will be formed when we send you this confirmation.
          </p>

          <h3 className="text-xl font-bold mb-4">5. Price and Payment</h3>

          <p className="mb-4">
            The price of any Product will be as quoted on our website, except in cases of obvious error. Prices are
            liable to change at any time, but changes will not affect orders for which we have already sent you a
            confirmation email.
          </p>

          <p className="mb-4">
            Payment for all Products must be made by credit or debit card or other payment method specified on the
            website. We will not charge your credit or debit card until we dispatch your order.
          </p>
        </div>
      </div>
    </AccountLayout>
  )
}
