import * as React from "react";

export const workExperience = [
  {
    title: "launch labs",
    role: "2025 - present, front-end engineer",
    summary: (
      <React.Fragment>
        <p>
          I stepped into an early-stage product that needed a full architectural
          reset. Working on a live game score management platform, I took
          ownership of the frontend foundation and helped shape technical
          decisions alongside design, backend, and business stakeholders.
        </p>

        <p>
          First, we modernized the frontend stack by migrating the app from
          CRA/Craco to Vite, upgrading to React 19.2, moving TanStack Query from
          v3 to v5, and rewriting the routing architecture with React Router v7.
          Besides that, we refactored authentication and authorization
          boundaries to remove content flashing, improve route-level
          performance, and make access control more predictable.
        </p>

        <p>
          Furthermore, we restructured the API layer around TanStack Query key
          factories and query options, migrated from Axios to Ky to fully rely
          on browser netive fetch rather then XMLHttpRequest wrapper, made the
          socket layer type-safe from the UI perspective, aligned the codebase
          with stricter TypeScript and linting rules, establish a proper design
          system using Base UI, Tailwind v4, and primitives component
          composition via shadcn registry.
        </p>

        <p>
          The result was a faster, more maintainable product: cut CI/CD times in
          half, reduced bundle size , improved sprint delivery by roughly 30/40%
          (based on past sprint comparisons), enchance INP perfomance across
          content heavy pages. We also improved observability and AI-assisted
          workflows by setting up richer Sentry config and automating parts of
          the release process.
        </p>
      </React.Fragment>
    ),
  },
  {
    title: "inox",
    role: "2024 - '25, front-end engineer",
    summary: (
      <React.Fragment>
        <p>
          At Inox, I led a two-person frontend team and partnered closely with
          design on a global product redesign, while modernizing a legacy
          real-estate platform.
        </p>

        <p>
          I reworked the front-end architecture by replacing Context API with
          Zustand, giving us more fine-grained control over state updates and
          eliminating expensive app-wide re-renders. I also introduced Tanstack
          Query to make data fetching and caching more reliable, improving both
          developer experience and the feel of the product.
        </p>

        <p>
          On the engineering side, I raised code quality standards and migrated
          the project from a legacy CRA/Craco setup to Vite, which improved
          bundle splitting, halved CI/CD times, and reduced infrastructure
          costs.
        </p>

        <p>
          Alongside performance, I put strong emphasis on accessibility - making
          sure pages were semantically structured, worked well with assistive
          technologies, and that the underlying programming model remained clear
          and maintainable as the product evolved.
        </p>
      </React.Fragment>
    ),
  },
  {
    title: "nda",
    role: "2023 - '24, front-end engineer",
    summary: (
      <React.Fragment>
        <p>
          While working on an MVP for an AI-driven booking startup (under NDA),
          I worked closely with the team to deliver the core product in under 10
          months. We built the platform using a Next.js and tRPC monorepo setup,
          and I was heavily involved in the initial architectural decisions to
          ensure we were setting up a maintainable and performant system for
          future scale while also not overengineering the initial solution.
        </p>

        <p>
          The main responsibility of mine was the AI chat interface. We used the
          Vercel AI SDK with Server-Sent Events to get smooth, persistent
          streaming, and mem0 to keep track of the conversation context.
          Building out the tool calls was the coolest part - basically writing
          the functions that let the AI &apos;talk&apos; to the rest of the app,
          so it could suggest listings and trigger actions right from the chat
          interface.
        </p>
      </React.Fragment>
    ),
  },
  {
    title: "novisign digital",
    role: "2024 - '24, ½ front-end engineer",
    summary: (
      <p>
        At Novisign Digital, I was brought on part-time to collaborate with a
        designer on rebranding the main landing page. The client wanted a
        composable landing page built on top of their existing marketing
        website. Although I didn&apos;t have much prior experience with
        WordPress Gutenberg plugins, a few hours of research was all it took for
        the pieces to fall into place. In just 1.5 weeks of part-time work, we
        delivered a fully rebranded set of custom plugins to act as building
        blocks for their future landing pages. Pretty fun experience.
      </p>
    ),
  },
  {
    title: "codifire",
    role: "2022 - '23, front-end engineer",
    summary: (
      <React.Fragment>
        <p>
          I joined Codifire through a referral as a strong Junior Front-End
          Engineer. Thanks to a highly talented team, I was able to quickly
          learn, grow, and establish myself as a developer. Codifire is an
          outsourcing agency and because of that I had the opportunity to work
          on dozens of different projects early in my career. This exposed me to
          various teams, completely novel technical approaches, and a lot of
          practical knowledge.
        </p>

        <p>
          I primarily worked with React and its surrounding ecosystems. Bouncing
          between projects helped me establish my core HTML, CSS, and JavaScript
          fundamentals while mastering advanced React patterns. It allowed me to
          see firsthand which architectural decisions actually succeed in
          production and which ones didn&apos;t.
        </p>
      </React.Fragment>
    ),
  },
] as const;
