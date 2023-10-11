import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24">
      <Image width={1028} height={500} src="/landingpage.png" alt="home page" />
    </main>
  );
}
