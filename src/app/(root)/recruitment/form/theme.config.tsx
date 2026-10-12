import React from "react";

export type ThemeType = 'default' | 'spiderman';

// Set the active theme here (Developer config)
export const ACTIVE_THEME: ThemeType = 'spiderman';

// --- Spider-Man Theme Specific Components ---
export const SpiderLogo = () => (
    <div className="relative flex justify-center w-full mb-6 mt-[-20px]">
       <img src="/img/spider.png" alt="Logo" className="w-20 h-20 mt-4" />
    </div>
);

export const SpiderWebBg = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden transition-transform duration-1000 ease-in-out">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-red-700/30 blur-[120px] rounded-full" />
        <div className="absolute top-[10%] -right-[20%] w-[60%] h-[60%] bg-red-900/20 blur-[150px] rounded-full" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] bg-blue-900/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

        <svg className="absolute top-[-50px] left-[-50px] w-[500px] max-md:w-[300px] h-[500px] max-md:h-[300px] text-red-600/30 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] z-0 pointer-events-none -scale-x-100" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="0.5" fill="none">
            <path d="M100,0 L0,10 M100,0 L0,30 M100,0 L0,50 M100,0 L0,70 M100,0 L0,90 M100,0 L20,100 M100,0 L50,100 M100,0 L80,100" />
            <path d="M90,0 Q90,10 100,10 M80,0 Q80,20 100,20 M70,0 Q70,30 100,30 M60,0 Q60,40 100,40 M50,0 Q50,50 100,50 M40,0 Q40,60 100,60 M30,0 Q30,70 100,70 M20,0 Q20,80 100,80 M10,0 Q10,90 100,90 M0,0 Q0,100 100,100" />
        </svg>
        <svg className="absolute top-[-50px] right-[-50px] w-[500px] max-md:w-[300px] h-[500px] max-md:h-[300px] text-red-600/30 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] z-0 pointer-events-none" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="0.5" fill="none">
            <path d="M100,0 L0,10 M100,0 L0,30 M100,0 L0,50 M100,0 L0,70 M100,0 L0,90 M100,0 L20,100 M100,0 L50,100 M100,0 L80,100" />
            <path d="M90,0 Q90,10 100,10 M80,0 Q80,20 100,20 M70,0 Q70,30 100,30 M60,0 Q60,40 100,40 M50,0 Q50,50 100,50 M40,0 Q40,60 100,60 M30,0 Q30,70 100,70 M20,0 Q20,80 100,80 M10,0 Q10,90 100,90 M0,0 Q0,100 100,100" />
        </svg>
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(220,38,38,1)] animate-ping opacity-75"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-red-400 rounded-full shadow-[0_0_10px_rgba(220,38,38,1)] animate-pulse opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-red-700 rounded-full shadow-[0_0_15px_rgba(220,38,38,1)] animate-bounce opacity-80"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_10px_rgba(220,38,38,1)] animate-pulse opacity-60"></div>
    </div>
);

// --- Theme Configuration Registry ---
export const themes = {
    default: {
        pageBg: "min-h-screen w-full bg-gradient-to-br from-red-900 via-gray-900 to-blue-900 dark:from-red-950 dark:via-gray-950 dark:to-blue-950",
        pageBgAuth: "min-h-screen w-full relative flex items-center justify-center bg-gradient-to-br from-red-900 via-gray-900 to-blue-900 dark:from-red-950 dark:via-gray-950 dark:to-blue-950",
        cardBg: "relative z-10 text-center",
        mainCardWrapper: "relative z-10 container mx-auto px-4 py-20",
        mainCardBg: "max-w-4xl mx-auto shadow-lg rounded-lg gradient-card",
        mainCardPadding: "p-6 md:p-8 text-left",
        headingGradient: "text-2xl font-bold mb-4",
        headingForm: "text-3xl max-md:text-2xl font-bold from-blue-400 to-blue-600 bg-gradient-to-b bg-clip-text text-transparent",
        headerFlex: "flex justify-between items-center mb-8",
        headerSpace: "space-y-1",
        stepProgressWrapper: "flex space-x-2 my-2",
        stepProgressActive: "h-2 rounded-full transition-all w-8 bg-blue-500",
        stepProgressInactive: "h-2 rounded-full transition-all w-4 bg-gray-300 dark:bg-gray-600",
        stepText: "text-sm text-gray-500 dark:text-gray-300 text-nowrap ms-4",
        authButton: "text-blue-500 hover:text-blue-700 underline",
        primaryButton: "font-semibold text-base dark:text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 transition-colors duration-300 ease-in-out flex items-center justify-center",
        primaryButtonNext: "font-semibold ms-auto bg-gradient-to-bl from-blue-600 to-blue-950 text-white transition-colors duration-300 ease-in-out flex items-center justify-center px-4 py-2 rounded",
        secondaryButton: "font-semibold text-base bg-gray-500 hover:bg-gray-600 text-slate-100 transition-colors duration-300 ease-in-out px-4 py-2 rounded",
        buttonWrapper: "flex justify-between w-full end mt-6",
        successHeading: "text-2xl font-semibold mb-4 text-center",
        roleBlockBg: "mb-6 relative group",
        roleHeading: "text-lg font-bold from-yellow-400 to-yellow-600 bg-gradient-to-b bg-clip-text text-transparent mb-4 relative z-10 flex items-center gap-2",
        roleSectionWrapper: "mb-8 border-b border-gray-200 dark:border-gray-800 pb-4",
        roleSectionHeading: "text-xl mb-3 font-bold from-red-400 to-red-600 bg-gradient-to-b bg-clip-text text-transparent mt-8",
        roleSectionDescStyle: "text-gray-500 dark:text-gray-400 text-sm mt-1 font-semibold tracking-widest uppercase",
        inputBg: "bg-transparent",
        inputBorder: "border-gray-300 dark:border-gray-600",
        inputErrorBorder: "border-red-500 dark:border-red-600",
        inputFocus: "focus-visible:ring-blue-500 dark:focus-visible:ring-blue-600",
        inputText: "text-gray-900 dark:text-gray-100 placeholder:text-gray-500",
        label: "ms-1 font-semibold text-sm dark:text-gray-300 text-gray-700",
        labelSelect: "ms-1 font-semibold text-sm dark:text-gray-400 text-gray-700",
        dropdownBg: "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800",
        socialBtnInsta: "inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-lg transition-all hover:scale-105",
        socialBtnLinkedin: "inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all hover:scale-105",
        socialBtnWhatsapp: "inline-flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all hover:scale-105 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white cursor-pointer",
        whatsappDisabled: "inline-flex items-center gap-2 px-5 py-2 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-300 cursor-not-allowed rounded-lg font-semibold",
        tagActive: "border border-gray-300 dark:border-white/10 from-blue-500 to-blue-700 bg-gradient-to-b text-white rounded-lg",
        tagInactive: "border border-gray-300 dark:border-white/10 bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-white/5 dark:text-gray-300 rounded-lg",
        text: {
            authTitle: "Authentication Required",
            authDesc: "Please log in to register for recruitment.",
            authBtn: "Go to Login",
            noFormTitle: "No Active Recruitment",
            noFormDesc: "There are currently no active recruitment forms.",
            successTitle: "🎉 Application Submitted!",
            successDesc1: "Your application has been submitted successfully. ✅",
            successDesc2: "We will review your responses and get back to you soon. Stay tuned for updates! 🚀",
            stepTextFormat: (step: number) => `Step ${step} of 3`,
            roleSectionTitle: "Role-Specific Questions",
            roleSectionDesc: "",
            step3Title: "",
            step3Desc: "",
            btnPrevious: "Previous",
            btnNext: "Next",
            btnSubmit: "Submit",
        },
        components: {
            BackgroundElements: () => (
                <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-b from-red-600/20 via-transparent to-blue-600/20 opacity-40 pointer-events-none" />
                </>
            ),
            BackgroundElementsAuth: () => (
                <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-red-600/20 via-transparent to-blue-600/20 opacity-40" />
                </>
            ),
            LogoElement: () => <></>,
            CardTopGlow: () => <></>,
            RoleBlockHoverEffect: () => <></>,
            RoleHeadingIcon: () => <></>,
        }
    },
    spiderman: {
        pageBg: "min-h-screen w-full relative bg-[#050505] text-gray-100 font-sans",
        pageBgAuth: "min-h-screen w-full relative flex items-center justify-center bg-[#050505] text-gray-100 font-sans",
        cardBg: "relative z-10 text-center max-w-md p-8 rounded-xl bg-[#0a0505]/90 shadow-[0_0_50px_rgba(220,38,38,0.3),inset_0_0_20px_rgba(220,38,38,0.1)] border border-red-900/60 backdrop-blur-3xl mx-auto",
        mainCardWrapper: "relative z-10 container mx-auto px-4 py-20 flex justify-center",
        mainCardBg: "max-w-4xl w-full mx-auto shadow-[0_0_80px_rgba(220,38,38,0.2),inset_0_0_40px_rgba(220,38,38,0.05)] rounded-2xl bg-[#090303]/90 border border-red-900/60 backdrop-blur-2xl relative overflow-hidden",
        mainCardPadding: "p-6 md:p-10",
        headingGradient: "text-4xl font-bold uppercase text-red-500 mb-4 drop-shadow-[0_2px_10px_rgba(220,38,38,0.7)]",
        headingForm: "text-4xl max-md:text-3xl font-bold uppercase from-red-500 via-red-600 to-red-900 bg-gradient-to-b bg-clip-text text-transparent drop-shadow-[0_4px_15px_rgba(220,38,38,0.8)] text-center w-full",
        headerFlex: "flex max-md:flex-col justify-between items-center mb-12 gap-4 flex-wrap",
        headerSpace: "space-y-4 w-full text-center flex flex-col items-center",
        stepProgressWrapper: "flex space-x-4 my-6 justify-center w-full",
        stepProgressActive: "bg-gradient-to-r from-red-500 to-red-700 w-16 shadow-[0_0_20px_rgba(220,38,38,0.8)] h-2 rounded-full transition-all duration-500 ease-out",
        stepProgressInactive: "bg-red-950/60 w-6 shadow-[inset_0_0_5px_rgba(0,0,0,0.8)] h-2 rounded-full transition-all duration-500 ease-out",
        stepText: "text-xs font-bold uppercase tracking-[0.3em] text-red-500 bg-red-950/40 px-5 py-2.5 rounded-lg border border-red-900/40 backdrop-blur-md text-nowrap shadow-[0_0_15px_rgba(220,38,38,0.2)] mx-auto",
        authButton: "inline-block px-8 py-3 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white text-sm font-bold uppercase rounded shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all hover:scale-105",
        primaryButton: "relative group overflow-hidden bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white shadow-[0_0_30px_rgba(220,38,38,0.6),inset_0_0_10px_rgba(255,100,100,0.5)] border border-red-500/50 font-bold uppercase tracking-[0.3em] text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(220,38,38,0.9)] rounded-lg px-8 py-4 flex items-center justify-center",
        primaryButtonNext: "relative group overflow-hidden bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white shadow-[0_0_30px_rgba(220,38,38,0.6),inset_0_0_10px_rgba(255,100,100,0.5)] border border-red-500/50 font-bold uppercase tracking-[0.3em] text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(220,38,38,0.9)] rounded-lg flex items-center gap-3 px-8 py-4 ms-auto",
        secondaryButton: "font-bold uppercase text-sm bg-[#1a0505] border border-red-900/60 text-red-500 hover:bg-red-950/60 hover:text-red-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] rounded-lg px-8 py-4",
        buttonWrapper: "flex justify-between w-full mt-12 border-t-2 border-red-900/40 pt-10",
        successHeading: "text-4xl font-bold uppercase text-red-500 mb-6 drop-shadow-[0_4px_15px_rgba(220,38,38,0.8)] text-center",
        roleBlockBg: "mb-12 bg-[#0d0404]/80 p-8 rounded-2xl border border-red-900/30 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:border-red-900/60 transition-colors duration-500",
        roleHeading: "text-xl font-bold uppercase text-red-400 mb-3 flex items-center gap-4 relative z-10 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]",
        roleSectionWrapper: "mb-10 border-b-2 border-red-900/40 pb-6 text-center w-full block relative",
        roleSectionHeading: "text-2xl font-bold uppercase from-red-400 to-red-600 bg-gradient-to-b bg-clip-text text-transparent drop-shadow-[0_4px_10px_rgba(220,38,38,0.6)] mb-2 relative z-10",
        roleSectionDescStyle: "text-red-900/80 text-sm mt-2 uppercase font-bold tracking-[0.3em] drop-shadow-[0_0_8px_rgba(220,38,38,0.5)] z-10 relative",
        inputBg: "bg-[#140505]/70 focus-within:bg-[#1a0508]/90 transition-all duration-300 backdrop-blur-md rounded-lg shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)]",
        inputBorder: "border-red-900/60 border-b-red-600/80 border-b-2 hover:border-red-700/80 transition-colors",
        inputErrorBorder: "border-red-500 ring-2 ring-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.5)]",
        inputFocus: "focus-visible:ring-0 focus-visible:border-b-red-500 focus-visible:shadow-[0_5px_20px_rgba(220,38,38,0.4)]",
        inputText: "text-red-100 placeholder:text-red-900/70  tracking-wide ",
        label: "ms-1 font-bold uppercase text-[10px] text-red-400 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]",
        labelSelect: "ms-1 font-bold uppercase text-[10px] text-red-400 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)] box-border",
        dropdownBg: "border-red-900/60 bg-[#0a0202]/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(220,38,38,0.3)]",
        socialBtnInsta: "inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-500 hover:to-rose-600 text-white text-xs font-bold uppercase rounded-lg transition-all shadow-[0_4px_20px_rgba(225,29,72,0.5)] hover:-translate-y-1 hover:shadow-[0_6px_25px_rgba(225,29,72,0.7)]",
        socialBtnLinkedin: "inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white text-xs font-bold uppercase rounded-lg transition-all shadow-[0_4px_20px_rgba(29,78,216,0.5)] hover:-translate-y-1 hover:shadow-[0_6px_25px_rgba(29,78,216,0.7)]",
        socialBtnWhatsapp: "inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white cursor-pointer shadow-[0_0_20px_rgba(22,163,74,0.5)] text-xs font-bold uppercase transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(22,163,74,0.7)] rounded-lg",
        whatsappDisabled: "inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-gray-600 cursor-not-allowed border border-gray-800 text-xs font-bold uppercase rounded-lg",
        tagActive: "border-red-500 from-red-600 to-red-900 bg-gradient-to-b text-white shadow-[0_0_15px_rgba(220,38,38,0.6)] border rounded-lg font-bold tracking-wider",
        tagInactive: "bg-[#140505]/70 text-red-700 border-red-900/40 hover:bg-red-950/50 hover:text-red-400 backdrop-blur-md border rounded-lg font-bold tracking-wider transition-colors",
        text: {
            authTitle: "Authentication Required",
            authDesc: "Please log in to register for recruitment and step into the Spider-Verse.",
            authBtn: "Go to Login",
            noFormTitle: "No Active Recruitment",
            noFormDesc: "There are currently no active recruitment forms. Stay tuned, true believer!",
            successTitle: "Application Submitted!",
            successDesc1: "Your application has been submitted safely. The web is cast!",
            successDesc2: "We will review your responses and summon you soon. Stay alert!",
            stepTextFormat: (step: number) => `Step ${step} of 3`,
            roleSectionTitle: "Hero Qualifications",
            roleSectionDesc: "Prove your worth",
            step3Title: "Final Mission Details",
            step3Desc: "Complete your hero profile",
            btnPrevious: "Retreat",
            btnNext: "Next",
            btnSubmit: "Join the Spider-Verse",
        },
        components: {
            BackgroundElements: SpiderWebBg,
            BackgroundElementsAuth: SpiderWebBg,
            LogoElement: SpiderLogo,
            CardTopGlow: () => <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent z-20"></div>,
            RoleBlockHoverEffect: () => <div className="absolute top-0 left-0 w-1 h-full bg-red-600 group-hover:w-full transition-all duration-700 opacity-10"></div>,
            RoleHeadingIcon: () => <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,1)]"></span>,
        }
    }
}

export const getTheme = () => themes[ACTIVE_THEME];
