"use client";

import {
    Plus,
    File,
    Camera,
    X,
    ArrowRight,
    Brain,
    ChevronDown,
    Lock,
    Unlock,
} from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea"; // Assuming this path is correct for your project
import { cn } from "@/lib/utils"; // Assuming this path is correct
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea"; // Assuming this path is correct
import { useFileInput } from "@/hooks/use-file-input"; // Assuming this path is correct
import { useClickOutside } from "@/hooks/use-click-outside"; // Assuming this path is correct
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast, Toaster } from "sonner"
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { server_url } from "@/utils/API";



const AI_MODELS = [
    { name: "GPT-4", description: "For Advance Reasoning" },
].map((model) => ({ ...model, icon: <Brain className="w-4 h-4" /> }));



export default function MultimodalInput() {
    const menuRef = useRef(null);

    const [url, setUrl] = useState('');
    const [response, setResponse] = useState('null')
    const [showLoad, setShowLoad] = useState(false);

    const navigate = useNavigate()

    const [state, setState] = useState({
        value: "",
        fileName: "", // This will be managed by useFileInput now
        isPrivacyMode: false,
        selectedModel: "GPT-4o",
        isMenuOpen: false,
        isModelMenuOpen: false,
    });

    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 40,
        maxHeight: 200,
    });



    const updateState = useCallback(
        (updates) =>
            setState((prev) => ({ ...prev, ...updates })),
        []
    );

    useClickOutside(menuRef, () => { // Removed type assertion
        if (state.isMenuOpen) updateState({ isMenuOpen: false });
        if (state.isModelMenuOpen) updateState({ isModelMenuOpen: false });
    });

    const handleKeyDown = (e) => { // Removed type annotation for e
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            updateState({ value: "" });
            adjustHeight(true); // Reset height
        }
    };


const getSocialPlatform = (url) => {
  if (!url) return null;

  const hostname = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;

  if (hostname.includes("instagram.com")) return "igurl";
  if (hostname.includes("facebook.com")) return "fburl";
  if (hostname.includes("linkedin.com")) return "lkurl";
  if (hostname.includes("twitter.com") || hostname.includes("x.com")) return "xurl";
  
  return "Unknown";
};


    const isValidSocialUrl = (input) => {
    const regex = /^(https?:\/\/)?(www\.)?(instagram\.com|facebook\.com|linkedin\.com|twitter\.com|x\.com)\/.+/i;
    return regex.test(input);
  };

    const handleButtonClick = async (e) => {
    e.preventDefault();
    if (!isValidSocialUrl(url)) {
      toast('Please enter a valid URL for Instagram, Facebook, LinkedIn, or X (formerly Twitter).');
    
    }else{
        const platform = getSocialPlatform(url);
        setShowLoad(true)

try {
    const response = await axios.post(`${server_url}/analyze`, {
      url: url,
      type: platform
    });

    
    const responseId = response.data.data.id
    setResponse(responseId)
    if(responseId != null){
        window.location.href = `/report/${responseId}`;
    }

  } catch (error) {
    console.error('Error posting data:', error);
    toast("Something went wrong!")
    window.location.reload();
  }
}
}

    return (
        <div className="w-full py-4">
            <div className="rounded-xl bg-[#fcfcfc48]">
                <div ref={menuRef}>
                    <div className="border-b border-black/10 dark:border-white/10">
                        <div className="flex justify-between items-center px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">
                            <div className="relative" data-model-menu>
                                <button
                                    type="button"
                                    
                                    className="flex items-center gap-1.5 custom-font2 bg-gray-200 rounded-lg px-2 py-1"
                                >
                                    
                                    <span className="dark:text-white">
                                        {state.selectedModel}
                                    </span>
                        
                                </button>

                                {state.isModelMenuOpen && (
                                    <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-zinc-800 rounded-md shadow-lg py-1 z-50 border border-black/10 dark:border-white/10">
                                        {AI_MODELS.map((model) => (
                                            <button
                                                type="button"
                                                key={model.name}
                                                className="w-full px-3 py-1.5 text-left hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2 text-sm transition-colors dark:text-white"
                                                onClick={() =>
                                                    updateState({
                                                        selectedModel:
                                                            model.name,
                                                        isModelMenuOpen: false,
                                                    })
                                                }
                                            >
                                                <div className="flex items-center gap-2 flex-1">
                                                    {model.icon}
                                                    <span>{model.name}</span>
                                                </div>
                                                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    {model.description}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    updateState({
                                        isPrivacyMode: !state.isPrivacyMode,
                                    })
                                }
                                className={cn(
                                    "flex items-center gap-2 p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5",
                                    state.isPrivacyMode
                                        ? "text-green-600"
                                        : "text-gray-200 dark:text-zinc-400"
                                )}
                            >
                                {state.isPrivacyMode ? (
                                    <Lock className="w-4 h-4" />
                                ) : (
                                    <Unlock className="w-4 h-4" />
                                )}
                                <span className="custom-font2">Deep Analysis</span>
                            </button>
                        </div>
                    </div>



                    <div className="relative px-2 py-2">
                        <div
                            className="absolute left-3 top-1/2 -translate-y-1/2"
                            data-action-menu
                        >
                            <div className="rounded-3xl w-9 h-9 bg-gray-200 dark:bg-white/5 p-2  dark:hover:bg-white/10">
                                {showLoad ? <CircularProgress color="inherit" size="22px" /> : <Brain className="-ml-[2px]"/>}
                            </div>

                    
                          
                        </div>

                        <Textarea
                            id="ai-input-10"
                            ref={textareaRef}
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Paste any social media url..."
                            className={cn(
                                "w-full rounded-xl pl-14 pr-10 border-none resize-none bg-transparent custom-font2 text-gray-200 ",
                                "min-h-[40px]" // This should be handled by useAutoResizeTextarea
                            )}
                            onKeyDown={handleKeyDown}
                        />

                        <button
                            onClick={handleButtonClick}
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-gray-200 dark:bg-white/5 p-1"
                        >
                            <ArrowRight
                                className={"w-6 h-6 text-black cursor-pointer opacity-100"}
                            />
                        </button>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
}