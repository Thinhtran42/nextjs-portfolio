"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you for your message! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "tranthinhh013@gmail.com",
      href: "mailto:tranthinhh013@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+84 (xxx) xxx-xxxx",
      href: "tel:+84xxxxxxxxx",
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Ho Chi Minh City, Vietnam",
      href: "https://maps.google.com/?q=Ho+Chi+Minh+City,+Vietnam",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Thinhtran42",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/thinh-tran013/",
      label: "LinkedIn",
    },
  ];

  return (
    <section id='contact' ref={sectionRef} className='py-20 relative'>
      {/* Section background with subtle overlay */}
      <div className='absolute inset-0 bg-white/5 backdrop-blur-sm'></div>

      <div className='container mx-auto px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-4 text-white relative z-10'>
              Get In Touch
            </h2>
            <p className='text-xl text-white/80 relative z-10'>
              Let&apos;s discuss your next project or just say hello
            </p>
          </div>

          <div className='grid lg:grid-cols-2 gap-12'>
            <div>
              <Card className='glass macos-card border-white/20 relative z-10'>
                <CardContent className='p-8'>
                  <h3 className='text-2xl font-semibold mb-6 text-white'>
                    Send me a message
                  </h3>
                  <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='grid sm:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='name' className='text-white/90'>
                          Name
                        </Label>
                        <Input
                          id='name'
                          name='name'
                          value={formData.name}
                          onChange={handleChange}
                          placeholder='Your name'
                          className='glass border-white/30 text-white placeholder:text-white/50'
                          required
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='email' className='text-white/90'>
                          Email
                        </Label>
                        <Input
                          id='email'
                          name='email'
                          type='email'
                          value={formData.email}
                          onChange={handleChange}
                          placeholder='your@email.com'
                          className='glass border-white/30 text-white placeholder:text-white/50'
                          required
                        />
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='subject' className='text-white/90'>
                        Subject
                      </Label>
                      <Input
                        id='subject'
                        name='subject'
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        className='glass border-white/30 text-white placeholder:text-white/50'
                        required
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='message' className='text-white/90'>
                        Message
                      </Label>
                      <Textarea
                        id='message'
                        name='message'
                        value={formData.message}
                        onChange={handleChange}
                        placeholder='Tell me about your project...'
                        className='glass border-white/30 text-white placeholder:text-white/50'
                        rows={5}
                        required
                      />
                    </div>
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      className='w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className='h-4 w-4 mr-2' />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className='space-y-8'>
              <Card className='glass macos-card border-white/20 relative z-10'>
                <CardContent className='p-8'>
                  <h3 className='text-2xl font-semibold mb-6 text-white'>
                    Contact Information
                  </h3>
                  <div className='space-y-4'>
                    {contactInfo.map((info, index) => (
                      <a
                        key={index}
                        href={info.href}
                        target={
                          info.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          info.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className='flex items-center space-x-4 p-4 rounded-lg hover:bg-white/10 transition-colors duration-200'
                      >
                        <div className='p-3 bg-white/20 rounded-full'>
                          <info.icon className='h-6 w-6 text-white' />
                        </div>
                        <div>
                          <h4 className='font-medium text-white'>
                            {info.title}
                          </h4>
                          <p className='text-white/70'>{info.content}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className='glass macos-card border-white/20 relative z-10'>
                <CardContent className='p-8'>
                  <h3 className='text-2xl font-semibold mb-6 text-white'>
                    Follow Me
                  </h3>
                  <div className='flex space-x-4'>
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200'
                        aria-label={social.label}
                      >
                        <social.icon className='h-6 w-6 text-white' />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className='glass macos-card border-white/20 overflow-hidden relative z-10'>
                <CardContent className='p-0'>
                  <div className='h-48 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center'>
                    <div className='text-center text-white'>
                      <h3 className='text-xl font-semibold mb-2'>
                        Ready to work together?
                      </h3>
                      <p className='text-white/80'>
                        Let&apos;s create something amazing!
                      </p>
                    </div>
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
