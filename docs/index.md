---
layout: home

hero:
  name: Sorbus
  text: The typed fetch client
  tagline: Call your API with confidence — and trust every result
  image:
    light: /logo-light.svg
    dark: /logo-dark.svg
    alt: Sorbus
  actions:
    - theme: brand
      text: Get Started
      link: /guide/introduction
    - theme: alt
      text: View on GitHub
      link: https://github.com/skiftle/sorbus

features:
  - icon: '🎯'
    title: Errors Just Throw
    details: Every error throws — no handling code at the call site. When you need to handle one, catch gives you a typed Result.

  - icon: '📝'
    title: Contracts Are Just Zod
    details: No YAML specs, no codegen, no opaque output. Compose schemas, pick fields for forms, reuse them for validation. The contract is TypeScript you read and write.

  - icon: '🛤'
    title: Rails + Apiwork
    details: Generate Sorbus contracts directly from your Rails API with Apiwork. Types, validations, filters — all derived from your database. Zero maintenance, zero drift.
    link: /guide/apiwork/

  - icon: '🌐'
    title: Runs Everywhere
    details: Platform fetch. Same client in the browser, SvelteKit remote functions, React Router loaders, Next.js server components, or plain Node.

  - icon: '⚡'
    title: Optimized for DX
    details: Flat params, key transforms, destructured responses — opinionated defaults for the common case. When you need explicit control, there's always an escape hatch.

  - icon: '🪶'
    title: Zero Dependencies
    details: Zod as a peer dependency. Nothing else. Under 3 KB gzipped.
---
