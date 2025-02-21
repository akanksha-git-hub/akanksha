"use client";

import { useEffect } from "react";

export function useDisableScroll(isModalOpen) {
    useEffect(() => {
        if (isModalOpen) {
            document.documentElement.style.overflow = "hidden"; // Disable background scrolling
            document.body.style.overflow = "hidden";
        } else {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        }

        return () => {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        };
    }, [isModalOpen]);
}
