"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import { ActivityCalendar } from "react-activity-calendar";
import { parseISO, format } from "date-fns";
import { Loader2, Code2, Trophy, Star, Target } from "lucide-react";

interface LeetCodeData {
  ranking: number;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  rating: number;
  submissionCalendar: string;
}

export const LeetCodeSection = () => {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/leetcode");
        const json = await res.json();
        
        if (res.ok) {
          setData(json);
        } else if (json.fallback) {
          setData(json.fallback);
        }
      } catch (error) {
        console.error("Failed to fetch LeetCode data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const parseCalendar = (calendarStr: string) => {
    try {
      const cal = JSON.parse(calendarStr);
      const days = Object.keys(cal).map(timestamp => {
        const date = new Date(parseInt(timestamp) * 1000);
        const count = cal[timestamp];
        
        // ActivityCalendar requires level 0-4
        let level = 0;
        if (count > 0) level = 1;
        if (count > 2) level = 2;
        if (count > 4) level = 3;
        if (count > 6) level = 4;
        
        return {
          date: format(date, "yyyy-MM-dd"),
          count,
          level
        };
      });
      
      // Sort days by date
      days.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      return days;
    } catch (e) {
      return [];
    }
  };

  return (
    <SectionWrapper id="leetcode" className="min-h-screen w-full flex flex-col items-center justify-center pt-20">
      <SectionHeader id="leetcode" className="relative mb-8 z-[9999]" title={
        <>
          LEETCODE <br />
          STATS
        </>} />

      <div className="flex z-[9999] px-4 w-full max-w-4xl mx-auto">
        <Card className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
              <p className="text-zinc-400">Compiling statistics...</p>
            </div>
          ) : data ? (
            <div className="flex flex-col space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* Total Solved */}
                <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-zinc-900 transition-colors">
                  <Code2 className="w-6 h-6 text-primary mb-2" />
                  <span className="text-3xl font-bold text-white mb-1">{data.totalSolved}</span>
                  <span className="text-xs text-zinc-400 font-medium tracking-wider uppercase">Total Solved</span>
                </div>

                {/* Easy/Medium/Hard Breakdown */}
                <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 flex flex-col justify-center space-y-3 hover:bg-zinc-900 transition-colors">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-emerald-400 font-medium">Easy</span>
                    <span className="text-white font-bold">{data.easySolved}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-amber-400 font-medium">Medium</span>
                    <span className="text-white font-bold">{data.mediumSolved}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-rose-400 font-medium">Hard</span>
                    <span className="text-white font-bold">{data.hardSolved}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-zinc-900 transition-colors">
                  <Star className="w-6 h-6 text-amber-400 mb-2" />
                  <span className="text-3xl font-bold text-white mb-1">{data.rating}</span>
                  <span className="text-xs text-zinc-400 font-medium tracking-wider uppercase">Contest Rating</span>
                </div>

                {/* Ranking */}
                <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-zinc-900 transition-colors">
                  <Trophy className="w-6 h-6 text-emerald-400 mb-2" />
                  <span className="text-2xl font-bold text-white mb-1">
                    {data.ranking < 1000 ? `${data.ranking}` : `${(data.ranking / 1000).toFixed(1)}k`}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium tracking-wider uppercase">Global Rank</span>
                </div>
              </div>

              {/* Heatmap */}
              <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6 flex flex-col overflow-hidden">
                <div className="flex items-center mb-6">
                  <Target className="w-5 h-5 text-primary mr-2" />
                  <h3 className="text-lg font-semibold text-white">Submission Activity</h3>
                </div>
                <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
                  <div className="min-w-[700px] flex justify-center">
                    <ActivityCalendar 
                      data={parseCalendar(data.submissionCalendar)}
                      theme={{
                        light: ['#18181b', '#0ea5e9'],
                        dark: ['#18181b', '#082f49', '#0369a1', '#0ea5e9', '#38bdf8']
                      }}
                      colorScheme="dark"
                      labels={{
                        totalCount: "{{count}} submissions in the last year",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <p className="text-red-400 mb-2">Failed to load statistics.</p>
              <p className="text-zinc-500 text-sm">Please try again later.</p>
            </div>
          )}
        </Card>
      </div>
    </SectionWrapper>
  );
};
