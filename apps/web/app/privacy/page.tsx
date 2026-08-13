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
          <div className={`text-xs tracking-wider text-neutral-500 ${righteous.className}`}>{new Date().getFullYear()}</div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-12 md:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="space-y-8">
          <section>
            <h2 className={`text-2xl text-[#ff4f4f] mb-4 ${righteous.className}`}>Privacy Policy</h2>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                Nidalee is a local-first Windows application. There is no Nidalee account, no sign-up and no server that
                holds your data. Everything you add stays on your own PC.
              </p>
            </div>
          </section>

          <section>
            <h3 className={`text-lg text-[#ff4f4f] mb-3 ${righteous.className}`}>What The App Stores</h3>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                Nidalee saves the accounts you add to a file in your Windows user folder, at
                %APPDATA%\Nidalee. That file contains the display name, username, password, optional email,
                category and last login time for each account, along with your settings.
              </p>
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                From version 0.1.4 onward, usernames and passwords are encrypted at rest using the Windows Data
                Protection API, which ties the encryption key to your Windows user account. Versions before 0.1.4 stored
                them as readable text, so if you are on an older build, please update.
              </p>
            </div>
          </section>

          <section>
            <h3 className={`text-lg text-[#ff4f4f] mb-3 ${righteous.className}`}>What The App Sends</h3>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                Your credentials are never transmitted anywhere. Nidalee types them into the official Riot Client running
                on your machine, exactly as you would type them yourself.
              </p>
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                The only network request the app makes is an update check to nidal.ee. That request necessarily includes
                your current app version, operating system, CPU architecture and IP address. Nothing else is sent.
              </p>
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                Nidalee contained Firebase Analytics up to and including version 0.1.3, which reported app opens,
                installs and game launches. It was removed in 0.1.4 and the app now ships with no analytics or telemetry
                of any kind.
              </p>
            </div>
          </section>

          <section>
            <h3 className={`text-lg text-[#ff4f4f] mb-3 ${righteous.className}`}>This Website</h3>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                nidal.ee uses Vercel Analytics to count page views. It is cookieless and does not build a profile of you.
                The site is hosted by Vercel, whose servers process request data such as your IP address in order to
                serve the page.
              </p>
            </div>
          </section>

          <section>
            <h3 className={`text-lg text-[#ff4f4f] mb-3 ${righteous.className}`}>Riot Games</h3>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                Nidalee is an independent project. It is not affiliated with, endorsed by, or approved by Riot Games, and
                it does not use Riot Sign On or the Riot API. No data is shared with Riot beyond the ordinary login you
                perform against their own client.
              </p>
            </div>
          </section>

          <section>
            <h3 className={`text-lg text-[#ff4f4f] mb-3 ${righteous.className}`}>Deleting Your Data</h3>
            <div className="space-y-4">
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                Because nothing leaves your PC, there is nothing for us to delete on your behalf. Remove individual
                accounts in the app, or delete the %APPDATA%\Nidalee folder to erase everything Nidalee has stored.
              </p>
              <p className={`text-sm text-neutral-600 leading-relaxed ${righteous.className}`}>
                Questions about any of this can go to josh@afterima.ge.
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
