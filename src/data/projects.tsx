import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { SiThreedotjs, SiCplusplus, SiPython, SiDocker, SiPostgresql, SiMongodb } from "react-icons/si";
import { FaAws } from "react-icons/fa";

const BASE_PATH = "/assets/projects-screenshots";

const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && repo !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

const brand = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});

export const PROJECT_SKILLS = {
  next: brand("Next.js", "nextdotjs-mono.svg"),
  node: brand("Node.js", "nodedotjs-mono.svg"),
  python: { title: "Python", bg: "black", fg: "white", icon: <SiPython /> },
  postgres: { title: "PostgreSQL", bg: "black", fg: "white", icon: <SiPostgresql /> },
  mongo: { title: "MongoDB", bg: "black", fg: "white", icon: <SiMongodb /> },
  express: brand("Express", "express-mono.svg"),
  tailwind: brand("Tailwind", "tailwind-css-mono.svg"),
  docker: { title: "Docker", bg: "black", fg: "white", icon: <SiDocker /> },
  js: brand("JavaScript", "javascript-mono.svg"),
  ts: brand("TypeScript", "typescript-mono.svg"),
  react: brand("React.js", "react-mono.svg"),
  cpp: { title: "C++", bg: "black", fg: "white", icon: <SiCplusplus /> },
  aws: { title: "AWS", bg: "black", fg: "white", icon: <FaAws /> },
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};

export const projects: Project[] = [
  {
    id: "docsense-ai",
    category: "AI SaaS",
    title: "DocSense AI",
    src: "https://raw.githubusercontent.com/Ramkrishna45/DocSense-AI/main/frontend/public/trans-logo.svg",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.docker,
      ],
    },
    live: "https://github.com/Ramkrishna45/DocSense-AI",
    github: "https://github.com/Ramkrishna45/DocSense-AI",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            AI-powered Knowledge Search Platform
          </TypographyP>
          <TypographyP className="font-mono mt-4">
            Built an AI-powered knowledge platform enabling search and Retrieval-Augmented Generation (RAG) over PDFs, DOCX, TXT, websites, GitHub repositories, and YouTube transcripts with source-backed responses.
          </TypographyP>
          <TypographyP className="font-mono mt-4">
            Implemented vector embeddings, hybrid search, document chunking, collection management, and inline citations to deliver accurate, context-aware conversational search across personal knowledge bases.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "docsense-companion",
    category: "Browser Extension",
    title: "DocSense Companion",
    src: "https://raw.githubusercontent.com/Ramkrishna45/DocSense-Companion/main/src/assets/readme_logo.svg",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [],
    },
    live: "https://github.com/Ramkrishna45/DocSense-Companion",
    github: "https://github.com/Ramkrishna45/DocSense-Companion",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            The intelligent browser extension for DocSense AI.
          </TypographyP>
          <TypographyP className="font-mono mt-4">
            A Chrome Extension (Manifest V3) for one-click webpage ingestion, instant content summarization, and seamless synchronization with the DocSense AI knowledge base. It bridges the gap between your web browsing and your private knowledge base, allowing semantic search on the fly.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "kafka-lite",
    category: "Distributed Systems",
    title: "Kafka Lite",
    src: "",
    screenshots: [],
    skills: {
      frontend: [],
      backend: [
        PROJECT_SKILLS.cpp,
        PROJECT_SKILLS.python,
      ],
    },
    live: "https://github.com/Ramkrishna45/Kafka-Lite",
    github: "https://github.com/Ramkrishna45/Kafka-Lite",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Kafka-inspired Persistent Message Broker
          </TypographyP>
          <TypographyP className="font-mono mt-4">
            Built a Kafka-inspired distributed message broker in C++17 featuring TCP communication, append-only log storage, topic partitioning, and crash recovery through durable metadata and log reconstruction.
          </TypographyP>
          <TypographyP className="font-mono mt-4">
            Implemented Consumer Groups with automatic partition assignment, heartbeat-based failure detection, dynamic rebalancing, persistent consumer offsets, and configurable retention. Benchmarked achieving 331K+ messages/sec peak throughput.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "brick-basket",
    category: "Web Platform",
    title: "Brick Basket",
    src: "",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [
        PROJECT_SKILLS.postgres,
      ],
    },
    live: "https://github.com/Ramkrishna45/Brick_Basket",
    github: "https://github.com/Ramkrishna45/Brick_Basket",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Home Construction Management Platform
          </TypographyP>
          <TypographyP className="font-mono mt-4">
            Built a B2C construction management platform using Next.js 15 for project tracking, milestone management, client communication, and daily photo updates to enhance client transparency.
          </TypographyP>
          <TypographyP className="font-mono mt-4">
            Designed a secure multi-role architecture with Role-Based Access Control (RBAC), NextAuth.js v5 authentication, PostgreSQL, Prisma ORM, Supabase Storage, and an automated waterfall payment distribution engine.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "portfolio",
    category: "Web Development",
    title: "Premium 3D Portfolio",
    src: "",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [],
    },
    live: "https://ramkrishna.dev",
    github: "https://github.com/Ramkrishna45/RK_Portfolio",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            The very portfolio you are browsing right now.
          </TypographyP>
          <TypographyP className="font-mono mt-4">
            Built with Next.js 15, TailwindCSS, GSAP, Lenis, and Spline 3D. 
            It features an interactive 3D WebGL scene that responds to scroll triggers, 
            providing a premium, buttery smooth user experience that showcases my technical skills and design aesthetic.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
];

export default projects;
