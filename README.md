## Broccoli & Co.

## Tech stack

- `React` framework: `NextJS`
  - Easy to do SEO.
  - Enhance performance compare to regular `react` with SSR & SSG, image optimization, ...
  - Developer experience
    - Easy routing.
    - Has API route.
    - Big community for easy to learn and support.
- Styling: `Tailwind`
  - Allow to add style very quickly using utility classes.
  - Easier to do mobile and web design with a lot of builtin break points and can be customize.
  - Community for learning, support when you get stuck, good design to take inspiration from when go online.
  - Extract and serve `css` in 1 file to load separately from `html` file.
- Testing library: `Jest`
  - Allow developer to test logic for functions and also for interaction.
  - Test snapshot to ensure the page structure not changing and if there is update then it's intentional.
- UI library: `shadcn-ui`
  - Built on top of `radix-ui` using `tailwind` with the approach to allow you to copy the component to your project and let you maintain and customize it.
  - Has uniform style with other components.
  - You can customize the component you install easily by just modify the source code.
  - Only install what you need
  - Within a company can just take the core library to create a wrapper to express the design system company has and let everyone to install it
- Form: `react-hook-form`
  - Allow develop very performance form by only trigger things you need when editing in the form.
  - Has good support for resolver library like [zod](https://www.npmjs.com/package/@hookform/resolvers#zod), [yup](https://www.npmjs.com/package/@hookform/resolvers#yup), [joi](https://www.npmjs.com/package/@hookform/resolvers#joi), ...
- Resolver for form: `zod`
  - Popular library to develop form and validate form.
  - Has a lot of builtin validation so you can make the schema and has validation done quickly.
- Fetching data: `swr`
  - Quickly has hook for fetching and updating data
  - Cache
  - Performance
    - Deduplication
    - Deep Comparison
    - Dependency Collection
    - Tree Shaking

All the libraries chosen are popular to allow new comer to familiarize and learn quickly, allow HR to find a lot of candidate with relevant experiences already.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
