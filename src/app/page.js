"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import HomeHeadder from "./components/HomeHeadder";
import HeroSection from "./components/HeroSection";

export default function MarkdownEditor() {
  return (
    <div>
      <HomeHeadder></HomeHeadder>
      <div className="w-full h-[calc(100vh-64px)]  flex items-center">
        <HeroSection></HeroSection>
      </div>
    </div>
  );
}
