import { Code2, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='relative py-12'>
      {/* Footer background with subtle overlay */}
      <div className='absolute inset-0 bg-black/20 backdrop-blur-sm'></div>

      <div className='container mx-auto px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid md:grid-cols-4 gap-8'>
            <div className='md:col-span-2'>
              <div className='flex items-center space-x-2 mb-4'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center'>
                  <Code2 className='h-5 w-5 text-white' />
                </div>
                <span className='text-xl font-bold text-white relative z-10'>
                  Thinh Tran
                </span>
              </div>
              <p className='text-white/70 mb-4 max-w-md relative z-10'>
                Passionate full-stack developer creating exceptional digital
                experiences with clean code and innovative solutions.
              </p>
              <div className='flex items-center space-x-1 text-white/70 relative z-10'>
                <span>Made with</span>
                <Heart className='h-4 w-4 text-pink-400' />
                <span>using Next.js & Tailwind CSS</span>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-4 text-white relative z-10'>
                Quick Links
              </h3>
              <ul className='space-y-2'>
                <li>
                  <a
                    href='#about'
                    className='text-white/70 hover:text-white transition-colors relative z-10'
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href='#skills'
                    className='text-white/70 hover:text-white transition-colors relative z-10'
                  >
                    Skills
                  </a>
                </li>
                <li>
                  <a
                    href='#projects'
                    className='text-white/70 hover:text-white transition-colors relative z-10'
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href='#contact'
                    className='text-white/70 hover:text-white transition-colors relative z-10'
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-4 text-white relative z-10'>
                Connect
              </h3>
              <ul className='space-y-2'>
                <li>
                  <a
                    href='https://github.com/Thinhtran42'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-white/70 hover:text-white transition-colors relative z-10'
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href='https://www.linkedin.com/in/thinh-tran013/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-white/70 hover:text-white transition-colors relative z-10'
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href='mailto:tranthinhh013@gmail.com'
                    className='text-white/70 hover:text-white transition-colors relative z-10'
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='border-t border-white/20 mt-8 pt-8 text-center text-white/70 relative z-10'>
            <p>&copy; {currentYear} Thinh Tran. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
