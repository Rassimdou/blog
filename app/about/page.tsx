"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnimatedWrapper } from "@/components/animated-wrapper";
import { Github, Mail, Code, Bookmark } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const skills = [
  { name: "Web Application Security" },
  { name: "Network Pentesting" },
  { name: "Cryptography" },
];

const certifications = [
  { name: "CAPT", org: "Hackviser", year: "2025" },
];

export default function AboutPage() {
  return (
    <div className="page-shell">
      <Header />

      <main className="flex-1 space-y-8">
        <section className="editorial-surface relative overflow-hidden px-6 py-16 text-center md:px-10 md:py-24">
            <AnimatedWrapper delay={200} className="relative z-10">
                <span className="eyebrow mb-6 block">0x</span>
                <h1 className="display-type mb-6 text-4xl tracking-[-0.05em] text-foreground sm:text-6xl md:text-7xl">
                  About Me
                </h1>
                <p className="mx-auto mb-12 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                   Security researcher and CTF enthusiast. I break systems to understand them, then write down the useful parts clearly enough for someone else to follow.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                 {[
                  { href: "https://github.com/rassimdou", icon: Github, label: "GitHub" },
                  { href: "mailto:douaouriarassim@gmail.com", icon: Mail, label: "Email" },
                 ].map((social, index) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="glass-panel flex w-full max-w-[11rem] flex-col items-center gap-3 p-4 text-muted-foreground transition-colors hover:text-primary"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <social.icon className="h-6 w-6" />
                    <span className="text-base">{social.label}</span>
                  </Link>
                 ))}
                 </div>
            </AnimatedWrapper>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <AnimatedWrapper delay={400}>
              <div className="editorial-surface h-full p-8">
                <div className="mb-8 flex items-center gap-3 border-b border-border/70 pb-4">
                     <Code className="h-5 w-5 text-primary" />
                    <h2 className="display-type text-lg text-foreground">
                      Skills & Focus Areas
                    </h2>
                </div>
                <div className="flex flex-col gap-4">
                  {skills.map((skill) => (
                      <div key={skill.name} className="glass-panel flex items-center justify-between gap-4 p-4">
                        <span className="text-base text-muted-foreground">{skill.name}</span>
                        <div className="flex gap-1">
                             {[1,2,3,4,5].map(i => <div key={i} className={`h-4 w-2 rounded-sm ${i <= 4 ? "bg-primary" : "bg-primary/20"}`} /> )}
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </AnimatedWrapper>

            <AnimatedWrapper delay={600}>
              <div className="editorial-surface h-full p-8">
                <div className="mb-8 flex items-center gap-3 border-b border-border/70 pb-4">
                    <Bookmark className="h-5 w-5 text-primary" />
                    <h2 className="display-type text-lg text-foreground">
                      Certifications
                    </h2>
                </div>
                <div className="flex flex-col gap-4">
                  {certifications.map((cert) => (
                      <div key={cert.name} className="glass-panel flex flex-col p-4">
                          <h3 className="display-type mb-1 text-xl tracking-tight text-foreground">{cert.name}</h3>
                          <div className="flex items-center justify-between gap-4 text-base text-muted-foreground">
                              <span>{cert.org}</span>
                              <span className="rounded-sm border border-primary/20 bg-primary/10 px-3 py-1 text-primary">{cert.year}</span>
                          </div>
                      </div>
                  ))}
                </div>
              </div>
            </AnimatedWrapper>

            <AnimatedWrapper delay={800} className="md:col-span-2">
              <div className="editorial-surface flex flex-col items-center p-8 text-center sm:p-12">
                   <div className="relative mb-6 p-4">
                        <Image src="/blog/led_ring.png" alt="LED" width={200} height={200} className="h-24 w-24 rounded-sm object-cover opacity-80" />
                        <div className="absolute inset-0 bg-primary/20 animate-ping" />
                   </div>
                   <h2 className="display-type mb-4 text-3xl tracking-tight text-foreground">
                     Want to collaborate?
                    </h2>
                    <p className="mb-8 max-w-lg text-base leading-8 text-muted-foreground">
                        I'm always interested in discussing security research, CTF challenges, or potential collaborations.
                    </p>
                  <Link
                    href="mailto:douaouriarassim@gmail.com"
                    className="glass-button bg-primary px-8 py-4 text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:text-primary-foreground"
                  >
                     Get in touch 
                  </Link>
              </div>
            </AnimatedWrapper>
        </section>
      </main>

      <Footer />
    </div>
  );
}
