'use client'

import Link from 'next/link'
import { Righteous } from 'next/font/google'
import { Copy, Check, Download } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const righteous = Righteous({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function Home() {
  const [copied, setCopied] = useState(false)
  const [downloadText, setDownloadText] = useState('DOWNLOAD HERE')

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault()
    const email = 'support@nidal.ee'

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email)
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = email
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email: ', err)
    }
  }

  useEffect(() => {
    setDownloadText('DOWNLOAD_HERE')
  }, [])


  return (
    <main className="min-h-screen bg-[#f5f5f5] flex flex-col select-none">
      {/* Top bar with decorative lines */}
      <div className="w-full px-6 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className={`text-xs tracking-wider text-neutral-500 ${righteous.className}`}>v0.1.3</div>
          <div className="w-12 h-[1px] bg-neutral-300"></div>
        </div>
        <div className="flex items-center">
          <Image src="/48.png" alt="Logo icon" width={24} height={24} className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-6">
          <div className="w-12 h-[1px] bg-neutral-300"></div>
          <div className={`text-xs tracking-wider text-neutral-500 ${righteous.className}`}>2024</div>
        </div>
      </div>

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-32">
        {/* Vertical line */}
        <div className="w-[1px] h-24 bg-neutral-300 mb-16"></div>

        {/* Logo with mirror effect */}
        <div className="text-center mb-24 relative">
          <h1 className={`text-8xl text-[#ff4f4f] ${righteous.className}`}>
            nidalee.
          </h1>
          <div
            className={`text-8xl text-[#ff4f4f] opacity-30 transform scale-y-[-1] absolute top-full left-0 right-0 overflow-hidden pt-1 ${righteous.className}`}
            aria-hidden="true"
          >
            nidalee.
          </div>
        </div>

        <div className="flex justify-center w-full px-4">
          <Link
            href="https://github.com/dancer/Nidalee/releases/download/v0.1.3/Nidalee_0.1.3.msi"
            className={`bg-[#ff4f4f] hover:bg-[#ff3f3f] transition-colors px-8 py-3 flex items-center justify-center gap-2 shadow-md rounded ${righteous.className}`}
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
            </svg>
            <span className="text-white text-sm tracking-wider uppercase">Download for PC</span>
          </Link>
        </div>

        <div className="mt-6 flex flex-col items-center gap-1">
          <p className={`text-[10px] md:text-xs tracking-wider text-neutral-500 uppercase ${righteous.className}`}>
            Secure account manager for League of Legends and Valorant
          </p>
          <p className={`text-[10px] md:text-xs tracking-wider text-[#ff4f4f] uppercase ${righteous.className}`}>
            Encryption • Quick Launch • Category Organization
          </p>
        </div>
      </div>

      {/* Navigation */}
      <footer className="footer">
        <div className="w-full flex flex-col items-center pb-4 mt-16 mb-safe">
          <div className="w-full h-[1px] bg-neutral-300 mb-4"></div>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-16">
            <Link
              href="https://github.com/dancer/nidalee"
              className={`text-[10px] md:text-sm tracking-wider text-neutral-600 hover:text-neutral-900 transition-colors ${righteous.className}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB
            </Link>
            <Link
              href="https://discord.gg/website"
              className={`text-[10px] md:text-sm tracking-wider text-[#ff4f4f] hover:text-[#ff8f8f] transition-colors ${righteous.className}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              DISCORD
            </Link>
            <Link
              href="https://ko-fi.com/nida"
              className={`text-[10px] md:text-sm tracking-wider text-[#ff4f4f] hover:text-[#ff8f8f] transition-colors ${righteous.className}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              KO-FI
            </Link>
            <Link
              href="/privacy"
              className={`text-[10px] md:text-sm tracking-wider text-neutral-600 hover:text-neutral-900 transition-colors ${righteous.className}`}
            >
              PRIVACY
            </Link>
            <Link
              href="/tos"
              className={`text-[10px] md:text-sm tracking-wider text-neutral-600 hover:text-neutral-900 transition-colors ${righteous.className}`}
            >
              TERMS
            </Link>
            <button
              onClick={handleCopyEmail}
              className={`text-[10px] md:text-sm tracking-wider text-neutral-600 hover:text-neutral-900 transition-colors group flex items-center gap-1 md:gap-2 ${righteous.className}`}
              aria-label="Copy email address"
            >
              CONTACT
              {copied ? (
                <Check className="w-3 h-3 md:w-4 md:h-4 text-green-600" aria-hidden="true" />
              ) : (
                <Copy className="w-3 h-3 md:w-4 md:h-4 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              )}
              <span className="sr-only">{copied ? 'Email copied' : 'Copy email address'}</span>
            </button>
            <Link
              href="/reviews"
              className={`text-[10px] md:text-sm tracking-wider text-neutral-600 hover:text-neutral-900 transition-colors ${righteous.className}`}
            >
              REVIEWS
            </Link>
          </nav>
        </div>
      </footer>

      <style jsx>{`
        @keyframes swing {
          0% {
            transform: rotate(10deg);
          }
          50% {
            transform: rotate(-10deg);
          }
          100% {
            transform: rotate(10deg);
          }
        }
        .animate-swing {
          animation: swing 2s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}
