"use client";

import * as React from "react";
import { create } from "zustand";

interface ScrollState {
  progress: number;
  setProgress: (v: number) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  setProgress: (v: number) => set({ progress: v }),
}));
