"use client";

import { useState, useEffect } from "react";
import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const words = [
    "Node.js Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mobile Developer",
    "Front End Developer",
  ];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  return (
    <section className='min-h-screen flex items-center justify-center relative'>
      <div className='container mx-auto px-4 text-center'>
        <div className='max-w-4xl mx-auto'>
          <div className='mb-8 animate-fade-in'>
            <div className='relative w-36 h-36 mx-auto mb-6'>
              <img
                src='/images/avatar.png'
                alt='Thinh Tran'
                className='w-full h-full rounded-full object-cover object-center shadow-2xl ring-4 ring-white/30 backdrop-blur-sm transition-transform duration-300 hover:scale-105'
                style={{
                  objectPosition: "center 25%", // Current setting
                }}
              />
              <div className='absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-white/10'></div>
            </div>
            <div className='flex items-center justify-center space-x-2 text-white/70 mb-4'>
              <MapPin className='h-4 w-4' />
              <span>Ho Chi Minh City, Vietnam</span>
            </div>
          </div>

          <h1 className='text-5xl md:text-7xl font-bold mb-6 animate-slide-up'>
            <span className='text-white'>Hi, I'm </span>
            <span className='bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent'>
              Thinh Tran
            </span>
          </h1>

          <div className='text-2xl md:text-3xl text-white/90 mb-8 h-12 animate-slide-up animation-delay-200'>
            <span>I'm a </span>
            <span className='text-yellow-400 font-semibold'>
              {text}
              <span className='animate-pulse'>|</span>
            </span>
          </div>

          <p className='text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up animation-delay-400'>
            Passionate about creating exceptional digital experiences with clean
            code and innovative solutions. Let's build something amazing
            together.
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 animate-slide-up animation-delay-600'>
            <Button
              size='lg'
              className='glass text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 border-white/20'
            >
              <Mail className='h-5 w-5 mr-2' />
              Get In Touch
            </Button>
            <Button
              variant='outline'
              size='lg'
              className='px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 border-white/30 text-white hover:bg-white/10'
            >
              View My Work
            </Button>
          </div>

          <div className='flex items-center justify-center space-x-6 animate-slide-up animation-delay-800'>
            <a
              href='https://github.com/Thinhtran42'
              target='_blank'
              rel='noopener noreferrer'
              className='text-white/70 hover:text-white transition-all duration-300 p-3 rounded-full hover:bg-white/10'
            >
              <Github className='h-6 w-6' />
            </a>
            <a
              href='https://www.linkedin.com/in/thinh-tran013/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-white/70 hover:text-white transition-all duration-300 p-3 rounded-full hover:bg-white/10'
            >
              <Linkedin className='h-6 w-6' />
            </a>
            <a
              href='mailto:tranthinhh013@gmail.com'
              className='text-white/70 hover:text-white transition-all duration-300 p-3 rounded-full hover:bg-white/10'
            >
              <Mail className='h-6 w-6' />
            </a>
          </div>
        </div>

        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
          <ArrowDown className='h-6 w-6 text-white/50' />
        </div>
      </div>
    </section>
  );
}
