"use client";

import React, { useEffect, useState } from "react";
import SectionWrapper from "../ui/section-wrapper";
import { ActivityCalendar } from "react-activity-calendar";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

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
      
      days.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      return days;
    } catch (e) {
      return [];
    }
  };

  return (
    <SectionWrapper id="leetcode" className="min-h-screen w-full flex items-center justify-center pt-20">
      
      <style dangerouslySetInnerHTML={{__html: `
        .activity-cell {
            width: 8px;
            height: 8px;
            border-radius: 1px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .activity-cell:hover {
            transform: scale(1.5);
            filter: brightness(1.5);
            box-shadow: 0 0 10px currentColor;
            z-index: 10;
        }
        .glass-panel {
            background: rgba(15, 20, 24, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05);
        }
        .scan-line {
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, transparent, rgba(137, 206, 255, 0.05), transparent);
            position: absolute;
            top: 0;
            left: -100%;
            animation: scan 4s infinite linear;
            pointer-events: none;
        }
        @keyframes scan {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        .glow-border {
            position: relative;
        }
        .glow-border::after {
            content: '';
            position: absolute;
            inset: -1px;
            background: linear-gradient(45deg, transparent, rgba(137, 206, 255, 0.2), transparent);
            border-radius: inherit;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .glow-border:hover::after {
            opacity: 1;
        }
        .luxe-stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        }
        .corner-bracket {
            position: absolute;
            width: 8px;
            height: 8px;
            border-color: rgba(137, 206, 255, 0.3);
        }
        .top-left { top: 12px; left: 12px; border-top: 1px solid; border-left: 1px solid; }
        .top-right { top: 12px; right: 12px; border-top: 1px solid; border-right: 1px solid; }
        .bottom-left { bottom: 12px; left: 12px; border-bottom: 1px solid; border-left: 1px solid; }
        .bottom-right { bottom: 12px; right: 12px; border-bottom: 1px solid; border-right: 1px solid; }
      `}} />

      <div className="w-full max-w-4xl mx-auto relative px-4 z-[9999]">
        {/* Atmospheric Depth Elements */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#89ceff]/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#45dfa4]/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        {/* Main Luxe Card */}
        <div className="glass-panel rounded-[2rem] p-6 sm:p-8 relative overflow-hidden group" style={{ transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg)' }}>
          <div className="scan-line"></div>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="w-8 h-8 text-[#89ceff] animate-spin mb-4" />
              <p className="text-[#bec8d2]">Syncing with LeetCode nodes...</p>
            </div>
          ) : data ? (
            <>
              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-[#89ceff]/60 tracking-[0.3em] uppercase" style={{fontFamily: 'Geist, sans-serif'}}>Ram krishna Tripathi</span>
                    <div className="h-[1px] w-8 bg-[#89ceff]/20"></div>
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-[#dee3e9]" style={{fontFamily: 'Inter, sans-serif'}}>
                    Engineering <span className="font-bold text-[#89ceff]">Intelligence</span>
                  </h1>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden md:block">
                    <p className="text-[10px] font-bold text-[#bec8d2]/40 tracking-widest uppercase" style={{fontFamily: 'Geist, sans-serif'}}>Connectivity</p>
                    <p className="text-xs font-semibold text-[#45dfa4]">SECURE_ACTIVE</p>
                  </div>
                  <div className="px-4 py-3 glass-panel rounded-2xl border-white/5 flex items-center gap-3">
                    <div className="relative">
                      <div className="w-2 h-2 bg-[#45dfa4] rounded-full"></div>
                      <div className="absolute inset-0 w-2 h-2 bg-[#45dfa4] rounded-full animate-ping opacity-75"></div>
                    </div>
                    <span className="font-bold text-[11px] text-[#dee3e9] tracking-widest uppercase" style={{fontFamily: 'Geist, sans-serif'}}>Live Node</span>
                  </div>
                </div>
              </div>

              {/* Submission Activity: The Hero */}
              <div className="mb-12 relative z-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                  <div className="flex items-center gap-3">
                    {/* fallback for material symbols */}
                    <div className="w-4 h-4 grid grid-cols-2 gap-[2px]">
                      <div className="bg-[#89ceff] rounded-sm"></div>
                      <div className="bg-[#89ceff] rounded-sm"></div>
                      <div className="bg-[#89ceff] rounded-sm"></div>
                      <div className="bg-[#89ceff] rounded-sm"></div>
                    </div>
                    <h2 className="font-bold text-xs tracking-[0.2em] text-[#bec8d2] uppercase" style={{fontFamily: 'Geist, sans-serif'}}>Temporal Activity Matrix</h2>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-[#bec8d2]/60" style={{fontFamily: 'Geist, sans-serif'}}>
                      <span>L0</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-[1px] bg-white/5"></div>
                        <div className="w-2 h-2 rounded-[1px] bg-[#45dfa4]/30"></div>
                        <div className="w-2 h-2 rounded-[1px] bg-[#45dfa4]/60"></div>
                        <div className="w-2 h-2 rounded-[1px] bg-[#45dfa4]"></div>
                      </div>
                      <span>L4</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#bec8d2] uppercase tracking-widest hidden sm:block" style={{fontFamily: 'Geist, sans-serif'}}>Cycle: 365D</span>
                  </div>
                </div>
                
                <div className="glass-panel border-white/5 rounded-2xl p-6 overflow-hidden">
                  <div className="overflow-x-auto pb-2 scrollbar-hide">
                    <div className="min-w-[700px] flex justify-center">
                      <ActivityCalendar 
                        data={parseCalendar(data.submissionCalendar)}
                        theme={{
                          light: ['rgba(255,255,255,0.03)', '#45dfa4'],
                          dark: ['rgba(255,255,255,0.03)', 'rgba(69,223,164,0.15)', 'rgba(69,223,164,0.4)', 'rgba(69,223,164,0.7)', '#45dfa4']
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

              {/* Stats Grid (Recreated from Context) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                
                {/* Total Solved */}
                <div className="glow-border glass-panel rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="corner-bracket top-left"></div>
                  <div className="corner-bracket top-right"></div>
                  <div className="corner-bracket bottom-left"></div>
                  <div className="corner-bracket bottom-right"></div>
                  <span className="text-4xl font-light text-[#dee3e9] mb-2">{data.totalSolved}</span>
                  <span className="text-[10px] font-bold text-[#89ceff]/80 tracking-[0.2em] uppercase" style={{fontFamily: 'Geist, sans-serif'}}>Total Solved</span>
                </div>

                {/* Rating */}
                <div className="glow-border glass-panel rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="corner-bracket top-left"></div>
                  <div className="corner-bracket top-right"></div>
                  <div className="corner-bracket bottom-left"></div>
                  <div className="corner-bracket bottom-right"></div>
                  <span className="text-4xl font-light text-[#dee3e9] mb-2">{data.rating}</span>
                  <span className="text-[10px] font-bold text-[#89ceff]/80 tracking-[0.2em] uppercase" style={{fontFamily: 'Geist, sans-serif'}}>Rating</span>
                </div>

                {/* Global Rank */}
                <div className="glow-border glass-panel rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="corner-bracket top-left"></div>
                  <div className="corner-bracket top-right"></div>
                  <div className="corner-bracket bottom-left"></div>
                  <div className="corner-bracket bottom-right"></div>
                  <span className="text-3xl font-light text-[#dee3e9] mb-2">
                    {data.ranking < 1000 ? data.ranking : `${(data.ranking / 1000).toFixed(1)}k`}
                  </span>
                  <span className="text-[10px] font-bold text-[#89ceff]/80 tracking-[0.2em] uppercase" style={{fontFamily: 'Geist, sans-serif'}}>Global Rank</span>
                </div>

                {/* Breakdown */}
                <div className="glow-border glass-panel rounded-2xl p-6 flex flex-col justify-center space-y-3">
                  <div className="corner-bracket top-left"></div>
                  <div className="corner-bracket top-right"></div>
                  <div className="corner-bracket bottom-left"></div>
                  <div className="corner-bracket bottom-right"></div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#45dfa4] tracking-widest font-bold uppercase">EZ</span>
                    <span className="text-sm text-white font-light">{data.easySolved}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#ffb86e] tracking-widest font-bold uppercase">MD</span>
                    <span className="text-sm text-white font-light">{data.mediumSolved}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#ffb4ab] tracking-widest font-bold uppercase">HD</span>
                    <span className="text-sm text-white font-light">{data.hardSolved}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <p className="text-red-400 mb-2">Node synchronization failed.</p>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};
