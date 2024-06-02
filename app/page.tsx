import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-emerald-600">
      <div className="flex flex-col items-center gap-8">
        <Image className="size-16" height={100} width={100} alt="white logo" src={'data:image/png;base64,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'} />
        <div className="flex gap-6  items-end">
          <h1 className="text-6xl font-semibold text-white">Coming Soon</h1>


          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
            <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
