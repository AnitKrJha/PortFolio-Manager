import AppShell from "@/components/layouts/AppShell";
import { Button } from "@chakra-ui/react";

export default function Home() {
  return (
    <AppShell>
      <main className="bg-black">
        <Button className="border border-black text-white bg-red-500" py="0">
          hello
        </Button>
      </main>
      <main></main>
    </AppShell>
  );
}
