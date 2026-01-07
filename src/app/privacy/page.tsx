'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: January 2026</p>
          
          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">1. Information We Collect</h2>
              <p className="text-gray-600 mb-4">We collect information you provide directly:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Account information (name, email, phone number)</li>
                <li>Profile information (skills, locations, bio)</li>
                <li>Task details and descriptions</li>
                <li>Payment information (processed by Stripe)</li>
                <li>Communications with support</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>To provide and improve our services</li>
                <li>To process payments and subscriptions</li>
                <li>To connect task posters with workers</li>
                <li>To send service-related communications</li>
                <li>To prevent fraud and ensure platform safety</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">3. Information Sharing</h2>
              <p className="text-gray-600 mb-4">We share your information with:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Other users (as necessary for task connections)</li>
                <li>Payment processors (Stripe)</li>
                <li>Service providers who assist our operations</li>
                <li>Law enforcement when legally required</li>
              </ul>
              <p className="text-gray-600 mt-4">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">4. Contact Information Visibility</h2>
              <p className="text-gray-600 mb-4">
                When you post a task, your contact information (phone, email) is visible to approved workers 
                with active subscriptions. Workers&apos; contact information is visible to task posters.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">5. Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement industry-standard security measures to protect your data. 
                Payment information is handled securely by Stripe and never stored on our servers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">6. Your Rights</h2>
              <p className="text-gray-600 mb-4">Under the NZ Privacy Act 2020, you have the right to:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your account</li>
                <li>Withdraw consent for marketing communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">7. Cookies</h2>
              <p className="text-gray-600 mb-4">
                We use essential cookies for authentication and site functionality. 
                We may use analytics cookies to improve our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">8. Data Retention</h2>
              <p className="text-gray-600 mb-4">
                We retain your data while your account is active. After account deletion, 
                we may retain certain information as required by law or for legitimate business purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">9. Children&apos;s Privacy</h2>
              <p className="text-gray-600 mb-4">
                Taskify is not intended for users under 18 years of age. 
                We do not knowingly collect information from children.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">10. Changes to This Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this policy from time to time. We will notify you of significant changes 
                via email or platform notification.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">11. Contact Us</h2>
              <p className="text-gray-600">
                For privacy-related inquiries, contact us at privacy@taskify.co.nz
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
