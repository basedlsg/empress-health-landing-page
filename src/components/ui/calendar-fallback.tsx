"use client";

import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export function CalendarFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#6B5B73]/50 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
      <Card className="p-6 m-4 max-w-md text-center pointer-events-auto bg-[#FAF8F5] border-[#E8E0E5]">
        <AlertTriangle className="h-12 w-12 text-[#4A235A] mx-auto mb-4" />
        <h3 className="font-serif font-semibold text-[#4A235A] mb-2">
          Calendar Loading
        </h3>
        <p className="text-sm text-[#6B5B73] mb-4">
          If the calendar doesn't load, please check your internet connection or try refreshing the page.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#4A235A] text-white rounded-md hover:bg-[#4A235A]/90 transition-colors text-sm font-medium"
        >
          Refresh Page
        </button>
      </Card>
    </div>
  );
}