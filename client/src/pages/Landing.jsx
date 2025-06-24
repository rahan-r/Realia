import React from "react";
import { ShieldCheck } from "lucide-react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";
import Logo from "@/components/Logo";
import { MainAnimation } from "@/components/MainAnimation";
import { useNavigate } from "react-router-dom";

const cn = (...classes) => classes.filter(Boolean).join(" ");

function Landing() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/report");
  };

  return (
    <>
      <section className="py-5 bg-gradient-to-br from-black via-zinc-900 to-black dark:from-black dark:via-zinc-800/40 dark:to-black">
        <div className="flex items-center space-x-2">
          <p className="custom-font3 text-white text-[25px] pl-6 ">Realia</p>
        </div>
        <div className="relative z-10 mx-auto w-full max-w-2xl px-6 lg:px-0">
          <div className="relative text-center">
            <Logo className={"mx-auto size-14"} />
            <h1 className="mx-auto mt-16 text-white leading-none text-[85px] custom-font">
              Reality Check. Simplified.
            </h1>
            {/* <p className="text-muted-foreground mx-auto mb-6 mt-4 text-balance text-[16px] custom-font2">
            Verify what’s real and what’s not  Realia keeps the truth on your side.
          </p> */}

            <ShimmerButton
              className="h-9 w-64 text-[16px] text-black custom-font2 mt-11 ml-48"
              onClick={handleButtonClick}
            >
              <a href="#link">
                <span className="text-nowrap">Reveal What’s Real</span>
              </a>
            </ShimmerButton>
          </div>

          <div className="relative mt-12 overflow-hidden rounded-3xl bg-black/10 md:mt-16">
            <div className="-mt-4">
              <MainAnimation />
            </div>
          </div>

          <section className="bg-transparent overflow-hidden py-16">
            <div className="group relative m-auto max-w-7xl px-6">
              <div className="flex flex-col items-center md:flex-row">
                <div className="md:max-w-44 md:border-r md:pr-6">
                  <p className="text-end text-sm text-white custom-font2">
                    Trusted by leaders
                  </p>
                </div>
                <div className="relative py-6 md:w-[calc(100%-11rem)]">
                  <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                    <div className="flex">
                      <img
                        className="mx-auto h-5 w-fit invert"
                        src="https://html.tailus.io/blocks/customers/nvidia.svg"
                        alt="Nvidia Logo"
                        height="20"
                        width="auto"
                      />
                    </div>

                    <div className="flex">
                      <img
                        className="mx-auto h-4 w-fit invert"
                        src="https://html.tailus.io/blocks/customers/column.svg"
                        alt="Column Logo"
                        height="16"
                        width="auto"
                      />
                    </div>
                    <div className="flex">
                      <img
                        className="mx-auto h-4 w-fit invert"
                        src="https://html.tailus.io/blocks/customers/github.svg"
                        alt="GitHub Logo"
                        height="16"
                        width="auto"
                      />
                    </div>
                    <div className="flex">
                      <img
                        className="mx-auto h-5 w-fit invert"
                        src="https://html.tailus.io/blocks/customers/nike.svg"
                        alt="Nike Logo"
                        height="20"
                        width="auto"
                      />
                    </div>
                    <div className="flex">
                      <img
                        className="mx-auto h-5 w-fit invert"
                        src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                        alt="Lemon Squeezy Logo"
                        height="20"
                        width="auto"
                      />
                    </div>
                    <div className="flex">
                      <img
                        className="mx-auto h-4 w-fit invert"
                        src="https://html.tailus.io/blocks/customers/laravel.svg"
                        alt="Laravel Logo"
                        height="16"
                        width="auto"
                      />
                    </div>
                    <div className="flex">
                      <img
                        className="mx-auto h-7 w-fit invert"
                        src="https://html.tailus.io/blocks/customers/lilly.svg"
                        alt="Lilly Logo"
                        height="28"
                        width="auto"
                      />
                    </div>

                    <div className="flex">
                      <img
                        className="mx-auto h-6 w-fit invert"
                        src="https://html.tailus.io/blocks/customers/openai.svg"
                        alt="OpenAI Logo"
                        height="24"
                        width="auto"
                      />
                    </div>
                  </InfiniteSlider>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default Landing;
