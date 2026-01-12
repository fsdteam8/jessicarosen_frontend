import React from 'react';
import { UserPlus, UploadCloud, CreditCard, CheckCircle2, Wallet, Scale, Clock, Lock, Search, Zap, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';

const SellOnLawbie = () => {
  const gradientStyle = {
    background: 'linear-gradient(180deg, #65ACE4 0%, #3A719D 50%, #23547B 100%)'
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Hero Section with Custom Gradient */}
      <header style={gradientStyle} className="text-white py-20 px-4 text-center">
        <h1 className="text-5xl font-serif mb-6">Sell Your Legal Work on Lawbie</h1>
        <p className="text-2xl text-blue-50 mb-6">Turn the documents you&apos;ve already created into a new source of income.</p>
        <p className="max-w-4xl mx-auto text-blue-100 leading-relaxed text-lg">
          Lawbie allows lawyers to monetize their legal documents and precedents by selling them to other legal professionals — with no subscriptions, no recurring fees.
        </p>
      </header>

      <main className="max-w-6xl mx-auto py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-blue-900 border-b-2 border-blue-200 inline-block pb-2">How Selling Works</h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="border border-slate-100 shadow-sm">
            <CardContent className="pt-10 text-center">
              <UserPlus className="w-16 h-16 text-blue-700 mb-6 mx-auto" />
              <h3 className="text-xl font-bold text-blue-900 mb-4">Create or Log Into Your Account</h3>
              <p className="text-slate-600">Sign up or log in to your Lawbie account and activate your seller profile.</p>
            </CardContent>
          </Card>

          <Card className="border border-slate-100 shadow-sm">
            <CardContent className="pt-10">
              <UploadCloud className="w-16 h-16 text-blue-700 mb-6 mx-auto" />
              <h3 className="text-xl font-bold text-center text-blue-900 mb-4">Upload Your Documents</h3>
              <p className="text-slate-600 text-center mb-6">Upload original legal documents or precedents you&apos;ve drafted.</p>
              <ul className="space-y-3 text-sm font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> Add a clear description</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> Select practice area and jurisdiction</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> Set your own price</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-slate-100 shadow-sm">
            <CardContent className="pt-10">
              <CreditCard className="w-16 h-16 text-blue-700 mb-6 mx-auto" />
              <h3 className="text-xl font-bold text-center text-blue-900 mb-4">Connect Stripe & Get Paid</h3>
              <p className="text-slate-600 text-center mb-6">Connect Stripe to receive payouts.</p>
              <ul className="space-y-3 text-sm font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> Secure payment processing</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> Earn money each time your work is sold</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> Funds paid directly to you</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div>
            <h3 className="text-2xl font-serif text-blue-900 mb-8 border-b border-slate-200 pb-2">What You Can Sell</h3>
            <ul className="space-y-6">
              <li className="flex gap-4"><Scale className="w-6 h-6 text-blue-800 shrink-0" /> <span className="text-slate-700 font-medium">Precedents and legal templates</span></li>
              <li className="flex gap-4"><FileText className="w-6 h-6 text-blue-800 shrink-0" /> <span className="text-slate-700 font-medium">Agreements and contracts</span></li>
              <li className="flex gap-4"><FileText className="w-6 h-6 text-blue-800 shrink-0" /> <span className="text-slate-700 font-medium">Adapted internal firm documents suitable for reuse</span></li>
              <li className="flex gap-4"><Zap className="w-6 h-6 text-blue-800 shrink-0" /> <span className="text-slate-700 font-medium">Practice-ready documents that can be customized by other lawyers</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-serif text-blue-900 mb-8 border-b border-slate-200 pb-2">Why Sell on Lawbie</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 text-slate-700 font-medium"><Wallet className="w-6 h-6 text-blue-800" /> Monetize work you&apos;ve already created</li>
              <li className="flex items-center gap-4 text-slate-700 font-medium"><CreditCard className="w-6 h-6 text-blue-800" /> Set your own prices — no commission surprises</li>
              <li className="flex items-center gap-4 text-slate-700 font-medium"><Clock className="w-6 h-6 text-blue-800" /> No subscriptions or monthly fees</li>
              <li className="flex items-center gap-4 text-slate-700 font-medium"><Search className="w-6 h-6 text-blue-800" /> Reach lawyers actively searching for documents</li>
              <li className="flex items-center gap-4 text-slate-700 font-medium"><Zap className="w-6 h-6 text-blue-800" /> Earn passive income from your legal expertise</li>
              <li className="flex items-center gap-4 text-slate-700 font-medium"><Lock className="w-6 h-6 text-blue-800" /> Payments handled securely through Stripe</li>
            </ul>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="bg-slate-50 border-l-4 border-blue-900 p-8 mb-16 rounded-r-lg">
          <p className="text-slate-700 leading-relaxed">
            <strong className="text-blue-900">Important:</strong> All documents must be your original work and comply with Lawbie&apos;s seller guidelines. Sellers remain responsible for the accuracy of their documents. Buyers understand that all documents must be reviewed and adapted to their specific matter and jurisdiction. Lawbie is a marketplace, not a law firm.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">

          <Link href="/products" className="w-full sm:w-auto">
            <Button className="bg-[#D4A017] hover:bg-[#B8860B] text-white font-bold h-14 px-12 text-lg">Browse Legal Documents</Button>
          </Link>

          <Link href="/sign-up " className="w-full sm:w-auto">
            <Button variant="outline" className="border-blue-900 text-blue-900 font-bold h-14 px-12 text-lg">Sign Up to Sell</Button>
          </Link>
        </div>
      </main>

      <footer className="py-12 text-center text-slate-500 text-sm">
        Questions? Contact <a href="mailto:support@lawbie.com" className="font-bold">support@lawbie.com</a>
      </footer>
    </div>
  );
};

export default SellOnLawbie;