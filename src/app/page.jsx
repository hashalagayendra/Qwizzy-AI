"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import HomeHeadder from "./components/HomeHeadder";
import HeroSection from "./components/HeroSection";

export default function MarkdownEditor() {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 z-50 w-full">
        <HomeHeadder></HomeHeadder>
      </div>

      <HeroSection></HeroSection>
    </div>
  );
}
