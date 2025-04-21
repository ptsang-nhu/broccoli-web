import RequestInviteButton from "@/components/Home/RequestInviteButton";
import { H1, Text } from "@/components/common/Typography";

export default function Home() {
  return (
    <main className="flex h-dvh flex-col">
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
    </main>
  );
}
