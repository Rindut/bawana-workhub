import Image from "next/image";

export function BrandLogo() {
  return (
    <div className="mb-7 flex items-center gap-3">
      <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-[10px] bg-gradient-to-br from-[#2b8fcb] to-[#27b89c]">
        <Image
          src="/bawana-icon-transparent.png"
          alt="Bawana icon"
          fill
          priority
          sizes="44px"
          className="object-contain p-1"
        />
      </div>
      <div>
        <h1 className="text-[15px] font-bold leading-tight text-[#1a2a3a]">
          BAWANA Workhub
        </h1>
        <p className="mt-0.5 text-[12.5px] text-[#8a9bb0]">
          Your team&apos;s tools, all in one place.
        </p>
      </div>
    </div>
  );
}
