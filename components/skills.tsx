"use client";

import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function Skills() {
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

  // Beautiful color palette for dark theme
  const skillColors = [
    "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30",
    "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/30",
    "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30",
    "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30",
    "bg-gradient-to-r from-red-500/20 to-rose-500/20 border-red-400/30",
    "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-400/30",
    "bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border-teal-400/30",
    "bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-400/30",
    "bg-gradient-to-r from-pink-500/20 to-rose-500/20 border-pink-400/30",
    "bg-gradient-to-r from-lime-500/20 to-green-500/20 border-lime-400/30",
  ];

  const getSkillColor = (index: number) => {
    return skillColors[index % skillColors.length];
  };

  const skillCategories = [
    {
      title: "Backend Development",
      icon: "🔧",
      skills: [
        "Golang",
        "C#/.NET",
        "Python/FastAPI",
        "Java/Spring Boot",
        "Gin Framework",
      ],
    },
    {
      title: "Mobile Development",
      icon: "📱",
      skills: [
        "Android Development",
        "Kotlin",
        "Jetpack Compose",
        "Android SDK",
      ],
    },
    {
      title: "Database & Storage",
      icon: "🗄️",
      skills: ["MongoDB", "PostgreSQL", "SQL Server", "Redis"],
    },
    {
      title: "Tools & DevOps",
      icon: "⚙️",
      skills: ["Git/GitHub", "Docker", "Microservices", "RESTful APIs"],
    },
  ];

  const technologies = [
    "Golang",
    "C#",
    "Python",
    "Java",
    ".NET",
    "Spring Boot",
    "FastAPI",
    "Gin",
    "Kotlin",
    "Android",
    "Jetpack Compose",
    "MongoDB",
    "PostgreSQL",
    "SQL Server",
    "Git",
    "Docker",
    "Microservices",
    "REST APIs",
    "Clean Architecture",
  ];

  return (
    <section id='skills' ref={sectionRef} className='py-20 relative'>
      {/* Section background with subtle overlay */}
      <div className='absolute inset-0 bg-white/5 backdrop-blur-sm'></div>

      <div className='container mx-auto px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-4 text-white relative z-10'>
              Skills & Technologies
            </h2>
            <p className='text-xl text-white/80 relative z-10'>
              My technical expertise across different domains of software
              development
            </p>
          </div>

          {/* Skill Categories */}
          <div className='grid md:grid-cols-2 gap-8 mb-16'>
            {skillCategories.map((category, index) => (
              <Card
                key={index}
                className='glass macos-card border-white/20 relative z-10 group hover:border-white/40 transition-all duration-300'
              >
                <CardContent className='p-6'>
                  <div className='flex items-center mb-6'>
                    <span className='text-3xl mr-3'>{category.icon}</span>
                    <h3 className='text-xl font-semibold text-white'>
                      {category.title}
                    </h3>
                  </div>

                  {/* Option 1: Individual rows with beautiful colors */}
                  <div className='space-y-3'>
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className={`p-3 rounded-lg border hover:scale-105 transition-all duration-200 ${getSkillColor(
                          skillIndex
                        )}`}
                      >
                        <span className='text-sm font-medium text-white/90'>
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Option 2: Badge layout with colors (uncomment to use) */}
                  {/*
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className={`px-3 py-1 text-white border hover:scale-105 transition-all duration-200 ${getSkillColor(skillIndex)}`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  */}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Technologies Cloud */}
          <Card className='glass macos-card border-white/20 relative z-10'>
            <CardContent className='p-8'>
              <h3 className='text-2xl font-semibold mb-6 text-center text-white'>
                Technology Stack
              </h3>
              <div className='flex flex-wrap gap-3 justify-center'>
                {technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant='secondary'
                    className='px-4 py-2 text-sm bg-white/20 text-white border border-white/30 hover:bg-white/30 transition-colors duration-200 cursor-pointer'
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
