import Image from "next/image";

export function BrandLogo() {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-3">
        <Image
          src="/bawana-wordmark-v2.png"
          alt="Bawana"
          width={280}
          height={76}
          priority
          className="h-auto w-full max-w-[280px]"
        />
      </div>
      <h1 className="text-sm font-semibold tracking-[0.18em] text-slate-500">
        WORKHUB
      </h1>
    </div>
  );
}
