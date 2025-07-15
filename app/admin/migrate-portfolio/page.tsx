'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Loader2, Database, User, AlertTriangle } from 'lucide-react';
import { 
  personalInfoService,
  aboutInfoService, 
  skillCategoriesService,
  contactInfoService,
  siteSettingsService 
} from '@/lib/portfolioService';
import { useAuth } from '@/components/auth/AuthContext';
import { toast } from 'sonner';

export default function MigratePortfolioPage() {
  const { user, isAdmin } = useAuth();
  const [migrating, setMigrating] = useState(false);
  const [progress, setProgress] = useState<{
    personalInfo: 'pending' | 'success' | 'error';
    aboutInfo: 'pending' | 'success' | 'error';
    skillCategories: 'pending' | 'success' | 'error';
    contactInfo: 'pending' | 'success' | 'error';
    siteSettings: 'pending' | 'success' | 'error';
  }>({
    personalInfo: 'pending',
    aboutInfo: 'pending',
    skillCategories: 'pending',
    contactInfo: 'pending',
    siteSettings: 'pending'
  });

  // Auth status check
  if (!user || !isAdmin) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Lỗi Authentication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700">
              Bạn chưa đăng nhập hoặc không có quyền admin. Vui lòng đăng nhập lại.
            </p>
            <p className="text-sm text-red-600 mt-2">
              Email hiện tại: {user?.email || 'Chưa đăng nhập'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Hardcoded data from existing components
  const portfolioData = {
    personalInfo: {
      name: "Thinh Tran",
      title: "Full Stack Developer",
      description: "Passionate about creating exceptional digital experiences with clean code and innovative solutions. Let's build something amazing together.",
      typingTexts: [
        "Node.js Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Mobile Developer",
        "Front End Developer"
      ],
      location: "Ho Chi Minh City, Vietnam",
      socialLinks: {
        github: "https://github.com/Thinhtran42",
        linkedin: "https://www.linkedin.com/in/thinh-tran013/",
        twitter: "",
        email: "tranthinhh013@gmail.com"
      },
      resumeUrl: ""
    },

    aboutInfo: {
      title: "About Me",
      description: "I'm a passionate full-stack developer with over 5 years of experience creating digital solutions that make a difference. My journey began with a curiosity for how things work and evolved into a career dedicated to building exceptional user experiences.\n\nI specialize in modern web technologies including React, Node.js, and TypeScript, but I'm always excited to learn new tools and frameworks. I believe in writing clean, maintainable code and creating solutions that scale.\n\nWhen I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee while planning my next adventure.",
      highlights: [
        { icon: "💻", text: "1+ Years Experience", color: "text-blue-600" },
        { icon: "⚡", text: "15+ Projects Completed", color: "text-green-600" },
        { icon: "❤️", text: "Passion for Backend", color: "text-red-600" },
        { icon: "☕", text: "Coffee Lover", color: "text-yellow-600" }
      ]
    },

    skillCategories: [
      {
        title: "Backend Development",
        icon: "🔧",
        skills: [
          "Golang",
          "C#/.NET",
          "Python/FastAPI",
          "Java/Spring Boot",
          "Gin Framework"
        ],
        order: 0
      },
      {
        title: "Mobile Development",
        icon: "📱",
        skills: [
          "Android Development",
          "Kotlin",
          "Jetpack Compose",
          "Android SDK"
        ],
        order: 1
      },
      {
        title: "Database & Storage",
        icon: "🗄️",
        skills: [
          "MongoDB",
          "PostgreSQL",
          "SQL Server",
          "Redis"
        ],
        order: 2
      },
      {
        title: "Tools & DevOps",
        icon: "⚙️",
        skills: [
          "Git/GitHub",
          "Docker",
          "Microservices",
          "RESTful APIs"
        ],
        order: 3
      }
    ],

    contactInfo: {
      email: "tranthinhh013@gmail.com",
      phone: "+84 (xxx) xxx-xxxx",
      location: "Ho Chi Minh City, Vietnam",
      socialLinks: {
        github: "https://github.com/Thinhtran42",
        linkedin: "https://www.linkedin.com/in/thinh-tran013/",
        twitter: "",
        facebook: "",
        instagram: ""
      },
      contactFormEmail: "tranthinhh013@gmail.com"
    },

    siteSettings: {
      siteName: "Thinh Tran Portfolio",
      tagline: "Full Stack Developer",
      description: "Portfolio website showcasing my journey as a full-stack developer specializing in modern web technologies.",
      keywords: [
        "portfolio",
        "developer",
        "full-stack",
        "nodejs",
        "golang",
        "react",
        "backend",
        "mobile"
      ],
      theme: {
        primaryColor: "#3b82f6",
        secondaryColor: "#8b5cf6"
      },
      seo: {
        title: "Thinh Tran - Full Stack Developer Portfolio",
        description: "Passionate full-stack developer creating exceptional digital experiences with clean code and innovative solutions.",
        image: ""
      },
      analytics: {
        googleAnalyticsId: ""
      }
    }
  };

  const updateProgress = (section: keyof typeof progress, status: 'pending' | 'success' | 'error') => {
    setProgress(prev => ({ ...prev, [section]: status }));
  };

  const migratePersonalInfo = async () => {
    try {
      updateProgress('personalInfo', 'pending');
      
      // Check if already exists
      const existing = await personalInfoService.getPersonalInfo();
      if (existing) {
        await personalInfoService.updatePersonalInfo(existing.id, portfolioData.personalInfo);
      } else {
        await personalInfoService.createPersonalInfo(portfolioData.personalInfo);
      }
      
      updateProgress('personalInfo', 'success');
      return true;
    } catch (error: any) {
      console.error('Error migrating personal info:', error);
      toast.error(`Personal Info Error: ${error.message || 'Unknown error'}`);
      updateProgress('personalInfo', 'error');
      return false;
    }
  };

  const migrateAboutInfo = async () => {
    try {
      updateProgress('aboutInfo', 'pending');
      
      const existing = await aboutInfoService.getAboutInfo();
      if (existing) {
        await aboutInfoService.updateAboutInfo(existing.id, portfolioData.aboutInfo);
      } else {
        await aboutInfoService.createAboutInfo(portfolioData.aboutInfo);
      }
      
      updateProgress('aboutInfo', 'success');
      return true;
    } catch (error: any) {
      console.error('Error migrating about info:', error);
      toast.error(`About Info Error: ${error.message || 'Unknown error'}`);
      updateProgress('aboutInfo', 'error');
      return false;
    }
  };

  const migrateSkillCategories = async () => {
    try {
      updateProgress('skillCategories', 'pending');
      
      // Clear existing and recreate
      const existing = await skillCategoriesService.getSkillCategories();
      for (const category of existing) {
        await skillCategoriesService.deleteSkillCategory(category.id);
      }
      
      // Create new categories
      for (const category of portfolioData.skillCategories) {
        await skillCategoriesService.createSkillCategory(category);
      }
      
      updateProgress('skillCategories', 'success');
      return true;
    } catch (error: any) {
      console.error('Error migrating skill categories:', error);
      toast.error(`Skill Categories Error: ${error.message || 'Unknown error'}`);
      updateProgress('skillCategories', 'error');
      return false;
    }
  };

  const migrateContactInfo = async () => {
    try {
      updateProgress('contactInfo', 'pending');
      
      const existing = await contactInfoService.getContactInfo();
      if (existing) {
        await contactInfoService.updateContactInfo(existing.id, portfolioData.contactInfo);
      } else {
        await contactInfoService.createContactInfo(portfolioData.contactInfo);
      }
      
      updateProgress('contactInfo', 'success');
      return true;
    } catch (error: any) {
      console.error('Error migrating contact info:', error);
      toast.error(`Contact Info Error: ${error.message || 'Unknown error'}`);
      updateProgress('contactInfo', 'error');
      return false;
    }
  };

  const migrateSiteSettings = async () => {
    try {
      updateProgress('siteSettings', 'pending');
      
      const existing = await siteSettingsService.getSiteSettings();
      if (existing) {
        await siteSettingsService.updateSiteSettings(existing.id, portfolioData.siteSettings);
      } else {
        await siteSettingsService.createSiteSettings(portfolioData.siteSettings);
      }
      
      updateProgress('siteSettings', 'success');
      return true;
    } catch (error: any) {
      console.error('Error migrating site settings:', error);
      toast.error(`Site Settings Error: ${error.message || 'Unknown error'}`);
      updateProgress('siteSettings', 'error');
      return false;
    }
  };

  const startMigration = async () => {
    setMigrating(true);
    
    try {
      // Reset progress
      setProgress({
        personalInfo: 'pending',
        aboutInfo: 'pending',
        skillCategories: 'pending',
        contactInfo: 'pending',
        siteSettings: 'pending'
      });

      const results = await Promise.allSettled([
        migratePersonalInfo(),
        migrateAboutInfo(),
        migrateSkillCategories(),
        migrateContactInfo(),
        migrateSiteSettings()
      ]);

      const successCount = results.filter(r => r.status === 'fulfilled' && r.value === true).length;
      
      if (successCount === 5) {
        toast.success('Migration hoàn thành thành công!');
      } else {
        toast.warning(`Migration hoàn thành với ${successCount}/5 phần thành công`);
      }
      
    } catch (error) {
      console.error('Migration error:', error);
      toast.error('Lỗi trong quá trình migration');
    } finally {
      setMigrating(false);
    }
  };

  const getStatusIcon = (status: 'pending' | 'success' | 'error') => {
    if (status === 'success') return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (status === 'error') return <AlertCircle className="h-5 w-5 text-red-500" />;
    return <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />;
  };

  const getStatusText = (status: 'pending' | 'success' | 'error') => {
    if (status === 'success') return 'Thành công';
    if (status === 'error') return 'Lỗi';
    return 'Đang chờ...';
  };

  const sections = [
    { key: 'personalInfo', label: 'Personal Information', description: 'Hero section data' },
    { key: 'aboutInfo', label: 'About Information', description: 'About section data' },
    { key: 'skillCategories', label: 'Skill Categories', description: 'Skills and technologies' },
    { key: 'contactInfo', label: 'Contact Information', description: 'Contact details and social links' },
    { key: 'siteSettings', label: 'Site Settings', description: 'Website configuration and SEO' }
  ];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Portfolio Data Migration</h1>
          <p className="text-gray-600">Import dữ liệu hiện có vào Firebase database</p>
        </div>
        <Database className="h-8 w-8 text-blue-600" />
      </div>

      {/* Auth Status */}
      <Card className="mb-6 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <User className="h-5 w-5" />
            Authentication Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-700">Logged in as: {user?.email}</span>
            </div>
            <Badge variant="default" className="bg-green-600">Admin</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Migration Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Script này sẽ import toàn bộ dữ liệu hardcoded từ các components hiện có vào Firebase database.
            Bao gồm thông tin cá nhân, about, skills, contact và site settings.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
            <p className="text-yellow-800 text-sm">
              <strong>Lưu ý:</strong> Migration này sẽ ghi đè dữ liệu hiện có trong database (nếu có).
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800 text-sm">
              <strong>Quan trọng:</strong> Nếu gặp lỗi permission, hãy kiểm tra Firebase Rules đã được cập nhật chưa:
              <br />- personalInfo, aboutInfo, skillCategories, contactInfo, siteSettings
              <br />- Tất cả phải có: allow write: if request.auth != null;
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Migration Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sections.map((section) => (
              <div key={section.key} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{section.label}</h4>
                  <p className="text-sm text-gray-600">{section.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={progress[section.key as keyof typeof progress] === 'success' ? 'default' : 'outline'}>
                    {getStatusText(progress[section.key as keyof typeof progress])}
                  </Badge>
                  {getStatusIcon(progress[section.key as keyof typeof progress])}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button 
          onClick={startMigration} 
          disabled={migrating}
          size="lg"
          className="px-8"
        >
          {migrating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Đang migration...
            </>
          ) : (
            <>
              <Database className="h-4 w-4 mr-2" />
              Bắt đầu Migration
            </>
          )}
        </Button>
      </div>
    </div>
  );
} 