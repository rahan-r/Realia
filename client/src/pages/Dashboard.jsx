"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import MultimodalInput from "@/components/kokonutui/multimodal-input";

export default function Dashboard() {
  return (
    <>
      <div className="bg-red-500 text-black font-semibold px-4 py-2 text-center custom-font2">Notice: LinkedIn and Facebook services are temporarily down. We're working on it. </div>
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black dark:from-black dark:via-zinc-800/40 dark:to-black px-4">
      <motion.div
        className="absolute top-0 left-0 p-4 md:p-6 z-10" 
      >
        <h2 className="custom-font3 text-[25px] md:text-2xl font-semibold text-white">
          Realia
        </h2>
      </motion.div>

      <div className="w-full p-4 flex flex-col items-center justify-center h-screen mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className={cn("text-center mb-10", "opacity-100 scale-100")}
        >
          <h1 className="custom-font text-5xl md:text-6xl font-medium mb-4 tracking-tighter bg-clip-text bg-gradient-to-b from-black to-black/70 text-white">
            Analyze, Understand, Excel
          </h1>
          <p className="text-xl text-zinc-400 custom-font4 font-semibold">
            Leverage quantum neural networks to detect misinformation across
            social platforms
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className={cn("w-full rounded-2xl relative overflow-hidden")}
        >
          <div className="relative p-6">
            <div className="flex flex-col gap-4">
              {/* Example placeholder for messages */}
              {/* <p className="text-zinc-300">No messages yet.</p> */}
            </div>
            {/* This div seems to be a spacer, ensure it's needed or adjust */}
            <div className="shrink-0 min-w-[24px] min-h-[24px]" />
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-3xl px-4 md:px-0 mt-6"
        >
          <div className=" rounded-xl -mt-14">
            <MultimodalInput />
          </div>
        </motion.form>
      </div>
    </div>
  </>
  );
}
