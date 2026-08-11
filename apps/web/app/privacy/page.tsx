'use client'

import Link from 'next/link'
import { Righteous } from 'next/font/google'

const righteous = Righteous({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function Privacy() {
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
        <div className={`text-xs tracking-wider text-neutral-500 ${righteous.className}`}>PRIVACY</div>
        <div className="flex items-center gap-6">
          <div className="w-12 h-[1px] bg-neutral-300"></div>
          <div className={`text-xs tracking-wider text-neutral-500 ${righteous.className}`}>2024</div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-12 md:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="space-y-8">
          <section>
            <h2 className={`text-2xl text-[#ff4f4f] mb-4 ${righteous.className}`}>Privacy Policy</h2>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                Welcome to Nidalee's Privacy Policy. This document outlines how we collect, use, and protect your information.
              </p>
            </div>
          </section>

          <section>
            <h3 className={`text-lg text-[#ff4f4f] mb-3 ${righteous.className}`}>Data Collection & RSO Integration</h3>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                Nidalee uses Riot Games' RSO (Riot Sign On) for player verification. This ensures secure access to your League of Legends and Valorant accounts.
              </p>
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                We only collect and display gameplay statistics and data for players who have explicitly opted in to our service through RSO authentication. If you haven't signed up for Nidalee, your information will not be accessible to other users.
              </p>
            </div>
          </section>

          <section>
            <h3 className={`text-lg text-[#ff4f4f] mb-3 ${righteous.className}`}>Information We Collect</h3>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                Through RSO authentication, we may collect:
              </p>
              <ul className={`list-disc pl-5 space-y-2 text-sm text-neutral-600 ${righteous.className}`}>
                <li>Your Riot Games username</li>
                <li>Account region</li>
                <li>Game-specific data (ranks, match history, etc.)</li>
                <li>Authentication tokens for secure API access</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className={`text-lg text-[#ff4f4f] mb-3 ${righteous.className}`}>Data Protection</h3>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                Your account credentials and personal information are encrypted and securely stored. We never share your data with third parties without your explicit consent.
              </p>
            </div>
          </section>

          <section>
            <h3 className={`text-lg text-[#ff4f4f] mb-3 ${righteous.className}`}>Opt-Out Process</h3>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                You can revoke Nidalee's access to your account data at any time by:
              </p>
              <ul className={`list-disc pl-5 space-y-2 text-sm text-neutral-600 ${righteous.className}`}>
                <li>Disconnecting your account through our settings</li>
                <li>Revoking access through your Riot Games account settings</li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6">
        <div className="w-full h-[1px] bg-neutral-300 mb-4"></div>
        <div className="flex justify-center gap-8">
          <Link 
            href="/tos" 
            className={`text-[10px] md:text-sm tracking-wider text-neutral-600 hover:text-neutral-900 transition-colors ${righteous.className}`}
          >
            TERMS OF SERVICE
          </Link>
        </div>
      </footer>
    </main>
  )
}
