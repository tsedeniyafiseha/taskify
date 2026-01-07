'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: January 2026</p>
          
          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing and using Taskify, you accept and agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">2. Platform Description</h2>
              <p className="text-gray-600 mb-4">
                Taskify is a marketplace connecting task posters with workers in Christchurch and surrounding areas. 
                We facilitate connections but do not employ workers or guarantee task completion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">3. User Accounts</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>You must be at least 18 years old to use Taskify</li>
                <li>You are responsible for maintaining account security</li>
                <li>You must provide accurate and complete information</li>
                <li>One account per person is permitted</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">4. Task Posters</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Task posting fees are non-refundable once a task is approved</li>
                <li>Tasks must be legal and comply with NZ law</li>
                <li>Contact information shared is your responsibility</li>
                <li>Payment to workers is arranged directly between parties</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">5. Workers</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Subscription fees are billed monthly and non-refundable</li>
                <li>You are an independent contractor, not a Taskify employee</li>
                <li>You are responsible for your own taxes and insurance</li>
                <li>Profile approval is at admin discretion</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">6. Payments</h2>
              <p className="text-gray-600 mb-4">
                All payments are processed securely through Stripe. Taskify does not store payment card details. 
                Prices are in New Zealand Dollars (NZD) and include GST where applicable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">7. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                Taskify is not responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Quality or completion of tasks</li>
                <li>Disputes between users</li>
                <li>Offline agreements or payments</li>
                <li>Personal injury or property damage</li>
                <li>Loss of income or business</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">8. Prohibited Activities</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Posting illegal or fraudulent tasks</li>
                <li>Harassment or discrimination</li>
                <li>Spam or misleading content</li>
                <li>Circumventing platform fees</li>
                <li>Creating multiple accounts</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">9. Termination</h2>
              <p className="text-gray-600 mb-4">
                We reserve the right to suspend or terminate accounts that violate these terms. 
                You may cancel your account at any time through your settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">10. Governing Law</h2>
              <p className="text-gray-600 mb-4">
                These terms are governed by the laws of New Zealand. Any disputes will be resolved 
                in the courts of Christchurch, New Zealand.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">11. Contact</h2>
              <p className="text-gray-600">
                For questions about these terms, contact us at support@taskify.co.nz
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
