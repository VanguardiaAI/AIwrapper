'use client'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">
            AI<span className="text-purple-400">WRAPPER</span>®
          </div>
          
          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-wider">
              HOME
            </a>
            <a href="#projects" className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-wider">
              AI PRODUCTS <span className="text-purple-400">(12)</span>
            </a>
            <a href="#services" className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-wider">
              SERVICES
            </a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-wider">
              ABOUT US
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-wider">
              CONTACT
            </a>
            <div className="relative group">
              <button className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-wider">
                AI MODELS ▾
              </button>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <span className="text-white font-mono">(+1) 555-AI-WRAP</span>
            <button className="p-2 text-white hover:text-purple-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
} 