const config = {
  title: "Ram Krishna Tripathi | Full-Stack Developer & AI Engineer",
  description: {
    long: "Explore the portfolio of Ram Krishna Tripathi, a Full-Stack Developer and AI Engineer specializing in interactive web experiences, scalable backend architectures, and AI integrations (RAG, LLMs). Discover my latest work in Next.js, React, C++, Python, and more.",
    short:
      "Discover the portfolio of Ram Krishna Tripathi, a Full-Stack Developer & AI Engineer creating interactive web experiences and intelligent AI platforms.",
  },
  keywords: [
    "Ram Krishna",
    "Ram Krishna Tripathi",
    "portfolio",
    "full-stack developer",
    "AI engineer",
    "web development",
    "Next.js",
    "React",
    "Python",
    "C++",
    "RAG",
    "PostgreSQL"
  ],
  author: "Ram Krishna Tripathi",
  email: "tripathiramkrishna16@gmail.com",
  site: "https://ramkrishna.dev",

  // for github stars button
  githubUsername: "Ramkrishna45",
  githubRepo: "RK_Portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/",
    linkedin: "https://www.linkedin.com/in/ramkrishna-tripathi-920405295",
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    github: "https://github.com/Ramkrishna45",
  },
};
export { config };
