import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Button from "../components/button";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Codico</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className="max-w-8xl sm:px-6 md:px-8 px-4 mx-auto">
        <div className="flex flex-col justify-center h-screen">
          <div className="space-y-2">
            <div className="bg-emerald-500 shadow-medium max-w-fit px-3 py-2 text-xl font-bold text-white uppercase rounded-lg">
              Coming Soon
            </div>
            <div className="md:text-7xl lg:text-8xl text-6xl font-extrabold tracking-tight">
              <h1>Your dispatches.</h1>
              <h1 className="bg-gradient-to-br from-cyan-300 to-lime-600 bg-clip-text inline-block leading-tight text-transparent">
                Your styles.
              </h1>
            </div>
            <p className="md:text-lg lg:text-xl text-md max-w-2xl font-medium">
              With Codico, you can write your dispatches your way, with your own
              templates and styles. And when you’re done, you can publish or
              update them on NationStates with just a few clicks.
            </p>
          </div>

          <div className="flex flex-row mt-8 space-x-6">
            <Button
              className="!px-4 !py-2 !text-lg"
              as="a"
              href="https://github.com/esfalsa/codico"
            >
              View on GitHub
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
