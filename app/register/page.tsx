import PricingCards from "@/components/pricing/PricingCards";

function page() {
  return (
    <div className="isolate overflow-hidden dark:bg-gray-900 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-96 pt-24 sm:pt-32 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="mt-6 text-lg font-semibold leading-8 text-indigo-600 dark:text-indigo-400">
            Pricing
          </p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight dark:text-white sm:text-5xl">
            The right price for you,{" "}
            <br className="hidden sm:inline lg:hidden" /> whoever you are
          </h2>
        </div>

        <div className="relative mt-6">
          <p className="dark:text-white/60 text-white/70 text-lg leading-8 mx-auto max-w-2xl">
            Were 99% sure we have a plan to match 100% of your needs
          </p>

          <svg
            viewBox="0 0 1208 1024"
            className="absolute blur-[120px] -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image: radial-gradient(closest-side, white, transparent)] 
          sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
          >
            <ellipse
              cx={604}
              cy={512}
              fill="url(#radial-gradient-pricing)"
              rx={604}
              ry={512}
            />
            <defs>
              <radialGradient id="radial-gradient-pricing">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="flow-root pb-24 sm:pb-32">
        <div className="-mt-80">
          <PricingCards redirect={false} />
        </div>
      </div>
    </div>
  );
}

export default page;
