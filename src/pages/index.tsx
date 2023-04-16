import AppShell from "@/components/layouts/AppShell";
import { Button } from "@chakra-ui/react";

export default function Home() {
  return (
    <AppShell>
      <main className="">
        <Button>hello</Button>
      </main>
      <main></main>
    </AppShell>
  );
}
