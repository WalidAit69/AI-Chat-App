import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import demo from "@logos/demo.gif";
import GlowingBlob from "@/components/GlowingBlob";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export default async function Home() {

  const session = await getServerSession(authOptions);

  return (
    <main className="">
      <div className="relative isolate pt-14 dark:bg-gray-900">
        <GlowingBlob />

        <div className="py-12 sm:py-20 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Chat with Anyone, anywhere!
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                You speak your language, they speak their language.
                <span className="text-indigo-600 dark:text-indigo-500">
                  Let Ai handle the translation
                </span>
              </p>

              <div className="flex gap-x-6 items-center justify-center mt-10">
                <Link href={"/chat"}>
                  <Button>Get started</Button>
                </Link>

                <Link href={"/pricing"}>
                  <Button
                    variant={"link"}
                    className="flex items-center gap-x-1"
                  >
                    View Pricing →
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-16 flow-root sm:mt-24">
              <div
                className="-m-2 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10
              lg:-m-4 lg:rounded-2xl lg:p-4"
              >
                <Image
                  unoptimized
                  src={demo}
                  alt="App Gif"
                  width={2432}
                  height={1442}
                  className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                ></Image>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-x-0 top-[calc(50%+3rem)] -z-10  transform-gpu overflow-hidden blur-3xl sm:top-[(calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem]
        -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]
        opacity-30 sm:left-[calc(50%+30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1% 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4% 52.4% 68.1% 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7% 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7% 74.1% 44.1%)",
            }}
          ></div>
        </div>
      </div>
    </main>
  );
}
