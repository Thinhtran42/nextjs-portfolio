"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Coffee, Code, Zap } from "lucide-react";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const highlights = [
    { icon: Code, text: "1+ Years Experience", color: "text-blue-600" },
    { icon: Zap, text: "15+ Projects Completed", color: "text-green-600" },
    { icon: Heart, text: "Passion for Backend", color: "text-red-600" },
    { icon: Coffee, text: "Coffee Lover", color: "text-yellow-600" },
  ];

  return (
    <section id='about' ref={sectionRef} className='py-20 relative'>
      {/* Section background with subtle overlay */}
      <div className='absolute inset-0 bg-white/10 backdrop-blur-sm'></div>

      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-4 text-white relative z-10'>
              About Me
            </h2>
            <p className='text-xl text-white/80 relative z-10'>
              Passionate developer crafting digital experiences
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div>
              <h3 className='text-2xl font-bold mb-6 text-white relative z-10'>
                My Journey
              </h3>
              <div className='space-y-4 text-white/80 relative z-10'>
                <p>
                  I'm a passionate full-stack developer with over 5 years of
                  experience creating digital solutions that make a difference.
                  My journey began with a curiosity for how things work and
                  evolved into a career dedicated to building exceptional user
                  experiences.
                </p>
                <p>
                  I specialize in modern web technologies including React,
                  Node.js, and TypeScript, but I'm always excited to learn new
                  tools and frameworks. I believe in writing clean, maintainable
                  code and creating solutions that scale.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new
                  technologies, contributing to open-source projects, or
                  enjoying a good cup of coffee while planning my next
                  adventure.
                </p>
              </div>
            </div>

            <div className='space-y-6'>
              <Card className='glass macos-card border-white/20 relative z-10'>
                <CardContent className='p-6'>
                  <div className='grid grid-cols-2 gap-4'>
                    {highlights.map((item, index) => (
                      <div
                        key={index}
                        className='flex items-center space-x-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200'
                      >
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                        <span className='text-sm font-medium text-white'>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className='glass macos-card border-white/20 relative z-10'>
                <CardContent className='p-6'>
                  <h4 className='text-lg font-semibold mb-4 text-white'>
                    Core Values
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {[
                      "Clean Code",
                      "User Experience",
                      "Continuous Learning",
                      "Team Collaboration",
                      "Innovation",
                      "Quality",
                    ].map((value) => (
                      <Badge
                        key={value}
                        variant='secondary'
                        className='bg-white/20 text-white border-white/30'
                      >
                        {value}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
