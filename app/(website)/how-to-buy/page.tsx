import React from 'react';
import { Search, FileText, ShieldCheck, Download, CheckCircle2, Star, Globe, CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';

const BuyOnLawbie = () => {
    const gradientStyle = {
        background: 'linear-gradient(180deg, #65ACE4 0%, #3A719D 50%, #23547B 100%)'
    };

    const steps = [
        {
            icon: <Search className="w-12 h-12 text-blue-800" />,
            title: "Browse & Search",
            desc: "Explore thousands of professionally drafted legal documents and templates. Use practice area, jurisdiction, and keyword filters to narrow your search."
        },
        {
            icon: <FileText className="w-12 h-12 text-blue-800" />,
            title: "Review & Choose",
            desc: "Preview document excerpts written by vetted legal professionals. Read full summaries and details to ensure the document suits your needs."
        },
        {
            icon: <ShieldCheck className="w-12 h-12 text-blue-800" />,
            title: "Secure Payment",
            desc: "Payments are processed through Stripe for a secure, fast checkout. No subscriptions, hidden fees, or account credits; only pay for what you need."
        },
        {
            icon: <Download className="w-12 h-12 text-blue-800" />,
            title: "Download & Use",
            desc: "Immediately download your Word document after payment is complete. Review and adapt for your specific matter and jurisdiction."
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* Hero Section with Custom Gradient */}
            <header style={gradientStyle} className="text-white py-20 px-4 text-center">
                <h1 className="text-5xl font-serif mb-6">How to Buy on Lawbie</h1>
                <p className="text-xl text-yellow-400 font-semibold mb-4">
                    Get quality legal documents drafted by peer-vetted professionals in less time, with less hassle.
                </p>
                <p className="max-w-3xl mx-auto text-blue-50 leading-relaxed">
                    Lawbie makes it easy for lawyers and legal professionals to purchase high-quality legal documents and templates that can be adapted and used in their practice.
                </p>
            </header>

            <main className="container mx-auto py-16 px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-serif text-blue-900 border-b-2 border-blue-200 inline-block pb-2">How Buying Works</h2>
                </div>

                {/* Process Steps */}
                <div className="grid md:grid-cols-4 gap-6 mb-20">
                    {steps.map((step, idx) => (
                        <Card key={idx} className="border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="pt-8 text-center">
                                <div className="flex justify-center mb-6">{step.icon}</div>
                                <h3 className="text-lg font-bold text-blue-900 mb-3">{step.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Info Grid */}
                <div className="grid md:grid-cols-2 gap-16 mb-20">
                    <div>
                        <h3 className="text-2xl font-serif text-blue-900 mb-8 border-b border-slate-200 pb-2">What You&apos;ll Get</h3>
                        <ul className="space-y-5">
                            {[
                                "High-quality, practice-ready Word documents",
                                "Drafted by experienced, peer-vetted lawyers",
                                "Precedents, templates, agreements, and more",
                                "Documents focused on practice area and jurisdiction",
                                "Final documents ready for customization in Microsoft Word"
                            ].map((text, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0" />
                                    <span className="text-slate-700 font-medium">{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-2xl font-serif text-blue-900 mb-8 border-b border-slate-200 pb-2">Why Buy on Lawbie</h3>
                        <ul className="space-y-5">
                            <li className="flex items-center gap-4"><Star className="w-6 h-6 text-blue-800" /> <span>Save time drafting from scratch</span></li>
                            <li className="flex items-center gap-4"><Globe className="w-6 h-6 text-blue-800" /> <span>Get templates without subscriptions</span></li>
                            <li className="flex items-center gap-4"><Search className="w-6 h-6 text-blue-800" /> <span>Find hard-to-source documents fast</span></li>
                            <li className="flex items-center gap-4"><ShieldCheck className="w-6 h-6 text-blue-800" /> <span>Trusted by legal professionals</span></li>
                            <li className="flex items-center gap-4"><CreditCard className="w-6 h-6 text-blue-800" /> <span>Payments handled securely through Stripe</span></li>
                        </ul>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="bg-slate-50 border-none p-8">
                        <h3 className="text-2xl font-serif text-blue-900 mb-6">What You&apos;ll Get</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-yellow-500" /> High-quality, practice-ready Word documents</li>
                            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-yellow-500" /> Drafted by experienced, peer-vetted lawyers</li>
                            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-yellow-500" /> Precedents, templates, agreements, and more.</li>
                        </ul>
                    </Card>
                    <Card className="bg-slate-50 border-none p-8 flex flex-col justify-center items-center gap-4">
                        <h3 className="text-2xl font-serif text-blue-900 mb-2">Why Buy on Lawbie</h3>
                        <Link href="/products" className="w-full">
                            <Button className="w-full bg-[#D4A017] hover:bg-[#B8860B] text-white font-bold h-12">Browse Legal Documents</Button>
                        </Link>
                        <Link href="/sign-up " className="w-full">
                            <Button variant="outline" className="w-full border-blue-900 text-blue-900 font-bold h-12">Sign Up to Buy</Button>
                        </Link>
                    </Card>
                </div>
            </main>

            <footer className="pb-10 text-center text-slate-500 text-sm">
                Questions? Contact <a href="mailto:support@lawbie.com" className="font-bold">support@lawbie.com</a>
            </footer>
        </div>
    );
};

export default BuyOnLawbie;