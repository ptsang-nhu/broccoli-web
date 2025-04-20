import Link from "next/link";

import RequestInviteButton from "@/components/Home/RequestInviteButton";
import { FooterText, H1, Text } from "@/components/common/Typography";

export default function Home() {
  return (
    <main className="flex h-dvh flex-col">
      <header className="bg-background sticky top-0">
        <nav className="mx-auto w-full border-b-2 border-b-violet-400 px-2 py-4 md:px-4 md:py-6 dark:border-b-blue-400">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/"
              className="mt-2 cursor-pointer rounded-2xl p-1 font-mono text-xl font-semibold text-gray-950 outline-blue-400 focus-visible:outline-2 md:text-3xl dark:text-white dark:outline-blue-300"
            >
              BROCOLI & CO.
            </Link>
          </div>
        </nav>
      </header>

      <section className="flex flex-1 flex-col justify-center">
        <div className="p-2 text-center md:p-4">
          <H1>
            A better way
            <br /> to enjoy everyday.
          </H1>
          <Text className="my-10">Be first to know when we launch.</Text>
          <RequestInviteButton />
        </div>
      </section>

      <footer className="md:px4 bg-background sticky bottom-0 w-full border-t-2 border-t-violet-400 px-2 py-4 text-center text-sm md:text-base dark:border-b-blue-400">
        <FooterText>Made with ❤️ in Melbourne</FooterText>
        <FooterText>® 2016 Brocoli & Co. All rights reserved.</FooterText>
      </footer>
    </main>
  );
}
