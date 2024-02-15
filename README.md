# Buddyhead Front End

### Technologies

- React 18.2
- TypeScript
- NextJS 13 (Pages Router)
- [shadcn/ui](https://ui.shadcn.com/docs)
  - Built on Radix UI/Tailwind CSS
- Prettier/ESLint config
- Pull data from Strapi CMS

# TODO:

Strapi Integration is last major thing to do

- Fix `@/pages/[slug].tsx`
  - Correctly pull the data from the backend (Strapi CMS)
  - [Backend](https://github.com/mattjaikaran/buddyhead)
- Fix `@/lib/api.ts`
  - Make sure these configurations are working
- Fix `@/lib/utils.ts`
  - Make sure these configurations are working

## Getting Started

- Install

```bash
$ git clone https://github.com/mattjaikaran/buddyhead-client
$ cd buddyhead-client
$ cat .env.example >> .env.local
$ yarn
$ yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
