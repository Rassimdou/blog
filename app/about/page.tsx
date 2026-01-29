"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnimatedWrapper } from "@/components/animated-wrapper";
import { Github, Twitter, Mail, ExternalLink, Award, Target, Code, Shield } from "lucide-react";
import Link from "next/link";

const skills = [
  { name: "Web Application Security", icon: Code },
  { name: "Binary Exploitation", icon: Target },
  { name: "Reverse Engineering", icon: Shield },
  { name: "Network Pentesting", icon: Target },
  { name: "Cloud Security (AWS/GCP)", icon: Shield },
  { name: "Cryptography", icon: Code },
  { name: "OSINT", icon: Target },
  { name: "Malware Analysis", icon: Shield },
];

const certifications = [
  { name: "OSCP", org: "Offensive Security", year: "2023" },
  { name: "CRTO", org: "Zero-Point Security", year: "2023" },
  { name: "eWPT", org: "eLearnSecurity", year: "2022" },
];

const platforms = [
  { name: "HackTheBox", rank: "Pro Hacker", profile: "https://hackthebox.com", color: "emerald" },
  { name: "TryHackMe", rank: "Top 1%", profile: "https://tryhackme.com", color: "amber" },
  { name: "PicoCTF", rank: "5000+ pts", profile: "https://picoctf.org", color: "cyan" },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-card to-background py-16 md:py-24">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,150,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,150,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
          <div className="absolute left-0 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative mx-auto max-w-3xl px-4">
            <AnimatedWrapper>
              <div className="mb-8 flex justify-center sm:justify-start">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-primary/30 bg-primary/10 text-3xl font-bold text-primary transition-all duration-500 hover:border-primary hover:scale-105">
                    0x
                  </div>
                  {/* Corner decorations */}
                  <div className="absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 border-primary/50" />
                  <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-primary/50" />
                  {/* Animated ping */}
                  <div className="absolute -right-1 -top-1 h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
                  </div>
                </div>
              </div>
            </AnimatedWrapper>

            <AnimatedWrapper delay={100}>
              <h1 className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-left sm:text-4xl md:text-5xl">
                <span className="text-primary">$</span> cat ~/about.txt
              </h1>
            </AnimatedWrapper>

            <AnimatedWrapper delay={200}>
              <p className="mb-8 text-center text-lg leading-relaxed text-muted-foreground sm:text-left">
                Security researcher and CTF enthusiast. I break things to
                understand how they work, then document everything so others can
                learn too.
              </p>
            </AnimatedWrapper>

            {/* Social links */}
            <AnimatedWrapper delay={300}>
              <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
                {[
                  { href: "https://github.com", icon: Github, label: "GitHub" },
                  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
                  { href: "mailto:contact@example.com", icon: Mail, label: "Email" },
                ].map((social, index) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="hover-lift group flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <social.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    {social.label}
                  </Link>
                ))}
              </div>
            </AnimatedWrapper>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-4">
            {/* Skills */}
            <AnimatedWrapper delay={100}>
              <div className="mb-16">
                <h2 className="mb-8 text-xl font-semibold sm:text-2xl">
                  <span className="text-primary">{">"}</span> Skills & Focus Areas
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {skills.map((skill, index) => (
                    <AnimatedWrapper key={skill.name} delay={150 + index * 50} animation="fade-left">
                      <div className="hover-lift group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:border-primary/50">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary transition-colors duration-300 group-hover:bg-primary/10">
                          <skill.icon className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                          {skill.name}
                        </span>
                      </div>
                    </AnimatedWrapper>
                  ))}
                </div>
              </div>
            </AnimatedWrapper>

            {/* CTF Platforms */}
            <AnimatedWrapper delay={200}>
              <div className="mb-16">
                <h2 className="mb-8 text-xl font-semibold sm:text-2xl">
                  <span className="text-primary">{">"}</span> CTF Platforms
                </h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {platforms.map((platform, index) => (
                    <AnimatedWrapper key={platform.name} delay={250 + index * 100} animation="scale">
                      <Link
                        href={platform.profile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover-lift group relative overflow-hidden rounded-lg border border-border bg-card p-5 transition-all duration-300 hover:border-primary/50"
                      >
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        
                        <div className="relative">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="font-medium text-foreground">
                              {platform.name}
                            </span>
                            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                          <span className="text-sm text-primary">{platform.rank}</span>
                        </div>
                      </Link>
                    </AnimatedWrapper>
                  ))}
                </div>
              </div>
            </AnimatedWrapper>

            {/* Certifications */}
            <AnimatedWrapper delay={300}>
              <div className="mb-16">
                <h2 className="mb-8 text-xl font-semibold sm:text-2xl">
                  <span className="text-primary">{">"}</span> Certifications
                </h2>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <AnimatedWrapper key={cert.name} delay={350 + index * 100} animation="fade-right">
                      <div className="hover-lift group flex items-center justify-between rounded-lg border border-border bg-card p-5 transition-all duration-300 hover:border-primary/50">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:scale-110">
                            <Award className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">
                              {cert.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {cert.org}
                            </div>
                          </div>
                        </div>
                        <span className="rounded-full border border-border bg-secondary px-3 py-1 text-sm text-muted-foreground">
                          {cert.year}
                        </span>
                      </div>
                    </AnimatedWrapper>
                  ))}
                </div>
              </div>
            </AnimatedWrapper>

            {/* Contact CTA */}
            <AnimatedWrapper delay={400}>
              <div className="relative overflow-hidden rounded-lg border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 text-center">
                {/* Corner brackets */}
                <div className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-primary/50" />
                <div className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-primary/50" />
                
                <div className="relative">
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    Want to collaborate?
                  </h3>
                  <p className="mb-6 text-muted-foreground">
                    I'm always interested in discussing security research, CTF
                    challenges, or potential collaborations.
                  </p>
                  <Link
                    href="mailto:contact@example.com"
                    className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                  >
                    <Mail className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                    Get in touch
                  </Link>
                </div>
              </div>
            </AnimatedWrapper>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
