'use client'

import Link from 'next/link'
import { Righteous } from 'next/font/google'

const righteous = Righteous({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function TermsOfService() {
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
          <div className={`text-xs tracking-wider text-neutral-500 ${righteous.className}`}>{new Date().getFullYear()}</div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-12 md:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="space-y-8">
          <section>
            <h2 className={`text-2xl text-[#ff4f4f] mb-4 ${righteous.className}`}>Terms of Service</h2>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                Nidalee is free, open source software released under the GPLv3 licence. By downloading or using it you
                agree to the terms below.
              </p>
            </div>
          </section>

          <section>
            <h3 className={`text-lg text-[#ff4f4f] mb-3 ${righteous.className}`}>No Warranty</h3>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                Nidalee is provided as is, without warranty of any kind. It automates keyboard and mouse input against
                the Riot Client, which is inherently fragile: a change to that client can stop logins from working. You
                use it at your own risk and the author is not liable for any loss arising from its use.
              </p>
            </div>
          </section>

          <section>
            <h3 className={`text-lg text-[#ff4f4f] mb-3 ${righteous.className}`}>Relationship With Riot Games</h3>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                Nidalee is an independent project and is not affiliated with, endorsed by, sponsored by or approved by
                Riot Games. League of Legends and VALORANT are trademarks of Riot Games, Inc.
              </p>
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                Nidalee automates entering your own credentials into Riot&apos;s official client. It does not modify any
                game, read game memory, or provide any in-game advantage. Even so, third party automation is not
                something Riot has approved, and you remain responsible for complying with Riot&apos;s Terms of Service.
                If you are not comfortable with that, do not use this app.
              </p>
            </div>
          </section>

          <section>
            <h3 className={`text-lg text-[#ff4f4f] mb-3 ${righteous.className}`}>Your Responsibilities</h3>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                You are responsible for:
              </p>
              <ul className={`list-disc pl-5 space-y-2 text-sm text-neutral-600 ${righteous.className}`}>
                <li>Only adding accounts that belong to you</li>
                <li>Keeping your Windows user account secure, since it protects the stored credentials</li>
                <li>Any activity performed on accounts you launch through Nidalee</li>
                <li>Complying with the terms of the games you play</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className={`text-lg text-[#ff4f4f] mb-3 ${righteous.className}`}>Your Credentials</h3>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                Credentials are stored on your machine only, encrypted at rest from version 0.1.4 onward. They are never
                transmitted to us or to anyone else. See the <Link href="/privacy" className="text-[#ff4f4f] hover:underline">privacy policy</Link> for detail.
              </p>
            </div>
          </section>

          <section>
            <h3 className={`text-lg text-[#ff4f4f] mb-3 ${righteous.className}`}>Changes To These Terms</h3>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                These terms may change as the app evolves. Continued use after a change means you accept the updated
                terms. Questions can go to josh@afterima.ge.
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
