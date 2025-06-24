"use client";
import { cn } from "@/lib/utils"; // Assuming you still need this for styling

export default function CredibilityReportCard({ className }) { // Added className prop for the main card div
    return (
        <div className="p-8"> {/* Outer wrapper from Card05 */}
            <div className="w-[1350px] mx-auto"> {/* Inner wrapper from Card05 */}
                {/* Content from CardDetails starts here */}
                <div
                    className={cn(
                        "relative h-full rounded-3xl p-6",
                        "bg-white dark:bg-black/5",
                        "border border-zinc-200 dark:border-zinc-800",
                        "hover:border-zinc-300 dark:hover:border-zinc-700",
                        "transition-all duration-300",
                        className // Apply className to the main card div
                    )}>
                    {/* Header */}
                    <div className="flex items-center mb-6">
                        <div>
                            <h3 className="text-2xl pl-[495px] custom-font3 font-semibold text-zinc-900 dark:text-white">
                                Credibility Report
                            </h3>
                        </div>
                    </div>
                    <h6 className="text-xl custom-font text-zinc-900 font-bold">
                        Claim Evaluated
                    </h6>
                    <div className="flex justify-between w-full">
                        <div className="custom-font2 text-zinc-700 dark:text-zinc-300 text-md">
                            A tweet from Eyal Yakoby shows a New York Post article with the headline Gaza journalist who wrote for Al Jazeera was holding 3 hostages in home with family, Israel says. <br /> <br />
                        </div>
                    </div>
                    <h6 className="text-xl custom-font text-zinc-900 font-bold">
                        Analysis Summary
                    </h6>
                    <div className="custom-font2 text-zinc-700 dark:text-zinc-300 text-md">
                        The claim is that a tweet accurately represents a New York Post article with the specified headline. While it appears to be a screenshot of a tweet with a New York Post article, I cannot definitively confirm its authenticity without access to the New York Post's archives or Twitter's (X) advanced search to verify the existence and content of the original tweet and the linked article at the time it was supposedly posted. <br /> <br />
                    </div>
                    <h6 className="text-xl custom-font text-zinc-900 font-bold">
                        Evidence
                    </h6>
                    <div className="custom-font2 text-zinc-700 dark:text-zinc-300 text-md">
                        A search for the exact headline on the New York Post's website did not yield any results. A broader search for related terms like \"Gaza journalist Al Jazeera hostages\" produced articles about the conflict and hostages, but none with this exact headline. It's possible the article has been removed or the headline has been altered. Without direct access to the specified social media post or the New York Post's article archive, it's impossible to fully verify the claim. <br />
                        Searched the New York Post website for articles matching the headline and related keywords. Attempted to locate the specific tweet but was unable to verify its legitimacy since the account wasn't provided. <br /> <br />
                    </div>
                    <h6 className="text-xl custom-font text-zinc-900 font-bold">
                        Final Verdict
                    </h6>
                    <div className="custom-font2 text-zinc-700 dark:text-zinc-300 text-md">
                        Unverifiable / Insufficient Evidence <br />
                    </div>
                    <div className="mt-8 space-y-6">
                        <div
                            className="h-[5px] bg-linear-to-r from-transparent via-black dark:via-black to-transparent" />
                        <div>
                            <h6 className="text-xl custom-font text-zinc-900 font-bold">
                                Limitations
                            </h6>
                            <div className="custom-font2 text-zinc-700 dark:text-zinc-300 text-md">
                                Lack of direct access to New York Post archives and Twitter's (X) historical data limits the ability to definitively verify the existence and content of the tweet and article at the time indicated. <br /> <br />
                            </div>
                            <h6 className="text-xl custom-font text-zinc-900 font-bold">
                                Sources
                            </h6>
                            <div className="custom-font2 text-zinc-700 dark:text-zinc-300 text-md">
                                Confirming ANI as the source of the statement.<br />
                                <a className="text-blue-600" href="https://twitter.com/ANI">Twitter</a> <br />
                                Retrieved: 2025-06-11
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    );
}