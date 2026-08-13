# 💘 NIDALEE

<div align="center">
  <img src="apps/desktop/src-tauri/icons/icon.ico" alt="Nidalee Logo" width="150"/>

  **A fast, local-first account manager and auto-login for League of Legends and VALORANT.**

  [![License](https://img.shields.io/badge/License-GPLv3-red.svg)](LICENSE)
  [![Download](https://img.shields.io/github/v/release/dancer/nidalee?color=red&label=Download)](https://github.com/dancer/nidalee/releases/latest)
  [![Downloads](https://img.shields.io/github/downloads/dancer/nidalee/total?color=red&label=Downloads)](https://github.com/dancer/nidalee/releases)
  [![Made with Tauri](https://img.shields.io/badge/Made%20with-Tauri-red.svg)](https://tauri.app)
  [![Built with Rust](https://img.shields.io/badge/Built%20with-Rust-red.svg)](https://www.rust-lang.org/)

  <img src="preview.png" alt="Nidalee Preview" width="800"/>

  [Download](https://github.com/dancer/nidalee/releases/latest) · [Website](https://nidal.ee) · [Report a bug](https://github.com/dancer/nidalee/issues)
</div>

## 🩷 What it is

Nidalee stores your League of Legends and VALORANT accounts on your own PC and logs into them for
you. Pick an account, pick a game, hit launch: Nidalee starts the Riot Client, fills in your
credentials, waits out any game update, and launches the game. Switching from one smurf to another
takes a couple of seconds instead of a trip to your password manager.

It is a 2 MB native Windows app built with Rust and Tauri. There is no account to create, no server,
and nothing to sync.

## 💖 Features

💕 **Accounts**

- Unlimited accounts for League of Legends and VALORANT
- One-click auto login into the Riot Client
- Categories for grouping accounts (mains, smurfs, regions, whatever you like)
- Last login tracking per account
- Automatic detection of a running game, with the option to close and switch

💕 **Launching**

- Finds your Riot Client automatically via the registry, common install paths, and a drive scan
- Waits for client and game updates to finish before logging in
- Up to five launch attempts, each verified against the running process list
- Adjustable login delay for slower machines

💕 **System integration**

- Start with Windows, optionally minimised
- Minimise to tray, and on game launch
- Remembers which monitor you left it on
- Single instance: launching again focuses the existing window

💕 **Privacy**

- Credentials encrypted at rest with the Windows Data Protection API, scoped to your Windows user
- Everything stays in `%APPDATA%\Nidalee`, nothing is uploaded
- Zero analytics and zero telemetry
- In-app updates, signed and verified against a key baked into the app

## 💓 Install

Download the latest installer and run it:

**[⬇ Download Nidalee for Windows](https://github.com/dancer/nidalee/releases/latest/download/Nidalee-Setup.msi)**

Windows may warn you that the publisher is unrecognised, because the installer is not code signed
yet. Choose *More info* then *Run anyway*. From this version onward, Nidalee updates itself: it
checks [nidal.ee](https://nidal.ee) on launch and installs signed updates with your confirmation.

## 💝 Getting started

1. Open the **Add Account** tab and save your first account
2. Go to **Main**, choose the account and the game
3. Hit **Launch Game**

While logging in, don't switch windows or move the mouse. Nidalee types your credentials into the
Riot Client the same way you would, so anything that steals focus can receive those keystrokes.

## 💌 Security

Accounts live in `%APPDATA%\Nidalee\accounts.json`. Usernames and passwords are encrypted with
Windows DPAPI, which derives the key from your Windows user account, so the file is useless when
copied to another machine or read by another user.

That protects against a stolen file, not against malware running as you: anything with your user
token can ask Windows to decrypt it, exactly as Chrome's saved passwords work. Keep your machine
clean, and enable two-factor authentication on your Riot accounts.

Versions up to and including 0.1.3 stored credentials in plaintext. If you used one of those, update
and change any password you would rather not have had sitting in a readable file.

## 🩶 Not affiliated with Riot Games

Nidalee is an independent, unofficial project. It is not affiliated with, endorsed by, or approved by
Riot Games. League of Legends and VALORANT are trademarks of Riot Games, Inc.

Nidalee types your own credentials into Riot's official client. It does not touch the games, read
game memory, or give any competitive advantage. It is still third party automation that Riot has not
approved, so use it at your own discretion and read the [terms](https://nidal.ee/tos).

## 💞 Building from source

Requires [Node.js](https://nodejs.org) 18+, [Rust](https://rustup.rs), and the Visual Studio C++
build tools.

```bash
git clone https://github.com/dancer/nidalee.git
cd nidalee
npm install

npm run dev          # desktop frontend only, in the browser
npm run tauri dev    # the real app
npm run tauri build  # produce an installer in apps/desktop/src-tauri/target/release/bundle
```

This repository is a monorepo:

| Path | Project | Stack |
| --- | --- | --- |
| [`apps/desktop`](apps/desktop) | the app | Tauri, Rust, React, Vite, Tailwind |
| [`apps/web`](apps/web) | [nidal.ee](https://nidal.ee) and the update endpoint | Next.js, Tailwind |

## 💖 Support

If Nidalee saves you time, a star is appreciated, and there is a [Ko-fi](https://ko-fi.com/nida) if
you would like to buy me a coffee.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/nida)

## 💘 License

[GPLv3](LICENSE). Do what you like with it, keep it open.
