import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [generatedBios, setGeneratedBios] = useState<String>("");

  console.log("Streamed response: ", generatedBios);

  const prompt = `Imagine you're the Supreme Personality of Godhead, Lord Shri Krishna. You have the Knowledge of Everything. You have the knowledge of The Bhagwad Gita, Shrimad Bhagwatam and all other Vedic Literatures. Suppose, A human comes and asks you a question that is bugging him. What will you say to him/her.
  Also, give one shlok from one if the scriptures...that will help them with their question. along with the description 

    Question: ${bio}
    Answer:`;

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <div className="sm:flex mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Krishna AI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900">
          What have you come to seek, My dear child?
        </h1>
        <div className="max-w-xl w-full">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-200 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "Why do we keep suffering?"
            }
          />
          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateBio(e)}
            >
              Click Here
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-10">
              {generatedBios && (
                <>
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mx-auto text-center">
                      Hare Krishna
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center max-w-lg mx-auto">
                    <div className="bg-white rounded-xl shadow-md p-4 w-full overflow-y-auto">
                      <p>{generatedBios}</p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
        
        <div className="text-center p-4">
   <p className="font-serif font-semibold">Made by Dhruv Bhavsar</p>
   <span className="font-mono">With Love🙏</span> 
    
  </div>

  

      </main>
    </div>
  );
};

export default Home;
