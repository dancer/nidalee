'use client'

import Link from 'next/link'
import { Righteous } from 'next/font/google'

const righteous = Righteous({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function Terms() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] flex flex-col select-none">
      {/* Top bar with decorative lines */}
      <div className="w-full px-6 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className={`text-xs tracking-wider text-neutral-500 hover:text-neutral-900 transition-colors ${righteous.className}`}>
            BACK
          </Link>
          <div className="w-12 h-[1px] bg-neutral-300"></div>
        </div>
        <div className={`text-xs tracking-wider text-neutral-500 ${righteous.className}`}>TERMS</div>
        <div className="flex items-center gap-6">
          <div className="w-12 h-[1px] bg-neutral-300"></div>
          <div className={`text-xs tracking-wider text-neutral-500 ${righteous.className}`}>2024</div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-12 md:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="space-y-8">
          <section>
            <h2 className={`text-2xl text-[#ff4f4f] mb-4 ${righteous.className}`}>Terms of Service</h2>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                By using Nidalee, you agree to these terms of service. Please read them carefully.
              </p>
            </div>
          </section>

          <section>
            <h3 className={`text-lg text-[#ff4f4f] mb-3 ${righteous.className}`}>RSO Authentication & Opt-In Requirements</h3>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                To use Nidalee's features, you must authenticate through Riot Sign On (RSO) and explicitly opt-in to data collection. This requirement ensures:
              </p>
              <ul className={`list-disc pl-5 space-y-2 text-sm text-neutral-600 ${righteous.className}`}>
                <li>Secure verification of your Riot Games account</li>
                <li>Protection of your gameplay data</li>
                <li>Compliance with Riot Games' data policies</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className={`text-lg text-[#ff4f4f] mb-3 ${righteous.className}`}>Data Usage & Display</h3>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                We will only display gameplay statistics and information for users who have explicitly opted in through RSO authentication. Your data will not be visible to other users unless you have granted permission.
              </p>
            </div>
          </section>

          <section>
            <h3 className={`text-lg text-[#ff4f4f] mb-3 ${righteous.className}`}>Account Management</h3>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                You are responsible for:
              </p>
              <ul className={`list-disc pl-5 space-y-2 text-sm text-neutral-600 ${righteous.className}`}>
                <li>Maintaining the security of your account credentials</li>
                <li>Managing your RSO authentication status</li>
                <li>Updating your opt-in preferences</li>
                <li>Any activity that occurs under your account</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className={`text-lg text-[#ff4f4f] mb-3 ${righteous.className}`}>Compliance with Riot Games</h3>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                Nidalee operates in compliance with Riot Games' developer policies and terms of service. We maintain necessary security measures and data handling practices as required by Riot Games.
              </p>
            </div>
          </section>

          <section>
            <h3 className={`text-lg text-[#ff4f4f] mb-3 ${righteous.className}`}>Changes to Terms</h3>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                We reserve the right to modify these terms at any time. Continued use of Nidalee after changes constitutes acceptance of the new terms.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6">
        <div className="w-full h-[1px] bg-neutral-300 mb-4"></div>
        <div className="flex justify-center gap-8">
          <Link 
            href="/privacy" 
            className={`text-[10px] md:text-sm tracking-wider text-neutral-600 hover:text-neutral-900 transition-colors ${righteous.className}`}
          >
            PRIVACY POLICY
          </Link>
        </div>
      </footer>
    </main>
  )
}
