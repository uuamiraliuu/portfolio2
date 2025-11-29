
import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, Twitter, ArrowRight, Send, ExternalLink, Star, Coffee, Code, PenTool, Monitor, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import artistPortrait from 'figma:asset/0c4dfa7721b3db545b962bc4f2d97c886cbe2437.png';

// --- Chalk UI Components ---

const ChalkFilters = () => (
  <svg width="0" height="0" className="absolute block">
    <defs>
      {/* Blackboard Texture Filter */}
      <filter id="blackboard-grain" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" result="noise" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.05 0" in="noise" result="coloredNoise" />
        <feComposite operator="in" in2="SourceGraphic" result="composite" />
      </filter>
      
      {/* Chalk Stroke Filter */}
      <filter id="chalk-stroke">
        <feTurbulence type="fractalNoise" baseFrequency="0.2" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      
      {/* Dusty Chalk Text Filter */}
      <filter id="chalk-text">
         <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="1" result="noise" />
         <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
      </filter>
    </defs>
  </svg>
);

const ChalkButton = ({ children, onClick, className = '', color = 'text-white', borderColor = 'border-white' }: { children: React.ReactNode; onClick?: () => void; className?: string; color?: string; borderColor?: string }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative px-8 py-3 font-chalk text-xl tracking-wide group ${className} ${color}`}
    >
      {/* Chalk Border */}
      <div className={`absolute inset-0 border-2 ${borderColor} rounded-sm transition-all duration-300`} 
           style={{ 
             filter: 'url(#chalk-stroke)',
             borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px'
           }} 
      />
      {/* Scratchy Fill on Hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-current`} 
           style={{ 
             maskImage: 'url(#blackboard-grain)',
             borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px'
           }} 
      />
      <span className="relative z-10 drop-shadow-md">{children}</span>
    </motion.button>
  );
};

const ChalkCard = ({ children, className = '', borderColor = 'border-white' }: { children: React.ReactNode; className?: string; borderColor?: string }) => {
  return (
    <div className={`relative p-6 group ${className}`}>
      <div className={`absolute inset-0 border-2 ${borderColor} bg-white/5`} 
           style={{ 
             borderRadius: '2px 255px 3px 25px / 255px 5px 225px 5px',
             filter: 'url(#chalk-stroke)',
           }} 
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const ChalkInput = ({ placeholder, type = "text", rows }: { placeholder: string; type?: string; rows?: number }) => {
  const baseClasses = "w-full bg-transparent border-b-2 border-white/50 focus:border-yellow-200 outline-none py-2 px-1 font-chalk text-lg text-white placeholder:text-white/40 transition-colors";
  
  if (rows) {
    return (
      <textarea 
        rows={rows}
        placeholder={placeholder}
        className={`${baseClasses} resize-none`}
        style={{ filter: 'url(#chalk-stroke)' }}
      />
    );
  }
  
  return (
    <input 
      type={type}
      placeholder={placeholder}
      className={baseClasses}
      style={{ filter: 'url(#chalk-stroke)' }}
    />
  );
};

// --- Sections ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = ['Work', 'About', 'Services', 'Blog', 'Contact'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-sm border-b border-white/10 py-4 px-6 md:px-12 flex justify-between items-center">
      <div className="text-2xl font-bold font-chalk tracking-widest text-yellow-200 border-2 border-yellow-200 p-1 transform -rotate-1 inline-block" style={{ filter: 'url(#chalk-stroke)' }}>
        PORTFOLIO
      </div>
      
      <div className="hidden md:flex space-x-8">
        {links.map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} className="font-chalk text-xl text-white hover:text-yellow-200 transition-colors hover:underline decoration-wavy decoration-1 underline-offset-8">
            {link}
          </a>
        ))}
      </div>

      <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#1a1a1a] border-b border-white/20 p-4 flex flex-col space-y-4 md:hidden shadow-2xl">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="font-chalk text-xl text-white block text-center hover:text-yellow-200">
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center pt-24 px-4 relative overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center"
      >
        {/* Portrait - Chalk Effect */}
        <div className="relative mb-8 group">
          {/* Artistic Chalk Frame */}
          <div className="absolute inset-0 border-4 border-white/20 rounded-full transform translate-x-1 translate-y-1 scale-105" 
               style={{ borderRadius: '50% 60% 50% 70% / 40% 50% 60% 50%', filter: 'url(#chalk-stroke)' }} />
          
          <div className="w-64 h-64 md:w-80 md:h-80 relative overflow-hidden rounded-full p-1 bg-white/5 backdrop-blur-sm">
             {/* Image processing to look like white chalk on black */}
            <img 
              src={artistPortrait} 
              alt="Artist Portrait" 
              className="w-full h-full object-cover rounded-full"
              style={{ 
                filter: 'grayscale(100%) contrast(150%) brightness(1.2)',
                maskImage: 'radial-gradient(circle, black 60%, transparent 100%)' 
              }}
            />
            <div className="absolute inset-0 rounded-full bg-transparent mix-blend-overlay shadow-inner" />
          </div>
          
          {/* Decorative Stars */}
          <Star className="absolute -top-4 -right-8 w-8 h-8 text-yellow-200 animate-pulse" style={{ filter: 'url(#chalk-stroke)' }} />
          <Star className="absolute bottom-4 -left-8 w-6 h-6 text-pink-300 animate-pulse delay-75" style={{ filter: 'url(#chalk-stroke)' }} />
        </div>

        <h1 className="text-5xl md:text-7xl font-chalk font-bold mb-6 text-yellow-200 relative inline-block tracking-wider drop-shadow-[0_0_8px_rgba(253,224,71,0.3)]">
          CREATIVE DESIGNER
        </h1>
        
        <p className="text-xl md:text-2xl font-chalk text-white/90 mb-10 max-w-2xl leading-relaxed">
          Turning complex ideas into simple, beautiful <span className="text-cyan-300">chalk sketches</span>.
        </p>

        <ChalkButton onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })} color="text-yellow-200" borderColor="border-yellow-200">
          See My Work
        </ChalkButton>
      </motion.div>

      <div className="absolute bottom-8 animate-bounce">
        <ArrowRight className="transform rotate-90 w-8 h-8 text-white/50" />
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 px-4 md:px-12 relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="inline-block relative mb-6">
              <h2 className="text-4xl font-chalk text-white">About Me</h2>
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-pink-300" style={{ filter: 'url(#chalk-stroke)' }}></div>
            </div>
            
            <p className="text-xl font-chalk text-gray-300 leading-loose mb-6">
              Hello! I'm a digital artisan who treats every pixel like a grain of chalk dust. 
              I believe that design should be accessible, clean, and a little bit playful.
            </p>
            <p className="text-xl font-chalk text-gray-300 leading-loose">
              Just like a good blackboard session, I start with a clean slate and iterate until the idea shines through. 
              Whether it's branding or web design, I bring a structured yet creative approach to every project.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
             <div className="relative w-64 p-4 border-2 border-white/30 rotate-2" style={{ borderRadius: '2px', filter: 'url(#chalk-stroke)' }}>
                <div className="w-full aspect-square flex items-center justify-center bg-white/5 border border-dashed border-white/30 font-chalk text-white/50 text-center p-8">
                  [Me, hard at work]
                </div>
                <div className="mt-2 text-center font-chalk text-white/70 text-sm">My workspace</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    { title: "The Coffee Shop", cat: "Branding", desc: "A cozy identity.", color: "border-yellow-200", text: "text-yellow-200" },
    { title: "Urban Sketchers", cat: "Web Design", desc: "Community platform.", color: "border-cyan-300", text: "text-cyan-300" },
    { title: "Neon Nights", cat: "Illustration", desc: "Cyberpunk series.", color: "border-pink-300", text: "text-pink-300" },
    { title: "Eco Packaging", cat: "Product", desc: "Sustainable boxes.", color: "border-green-300", text: "text-green-300" },
  ];

  return (
    <section id="work" className="py-20 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-chalk text-white mb-2">Selected Projects</h2>
          <div className="h-1 w-24 bg-cyan-300 mx-auto rounded-full" style={{ filter: 'url(#chalk-stroke)' }}></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((p, i) => (
            <ChalkCard key={i} borderColor={p.color} className="hover:-translate-y-2 transition-transform duration-300 bg-[#222]">
              <div className="aspect-video bg-white/5 mb-6 border border-white/10 relative flex items-center justify-center overflow-hidden">
                <span className="font-chalk text-2xl text-white/20">Project Preview</span>
              </div>
              <div className="flex justify-between items-start mb-3">
                <h3 className={`text-2xl font-chalk font-bold ${p.text}`}>{p.title}</h3>
                <span className={`text-xs font-chalk border ${p.color} ${p.text} px-3 py-1 rounded-full`}>{p.cat}</span>
              </div>
              <p className="font-chalk text-gray-400">{p.desc}</p>
            </ChalkCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillsAndServices = () => {
  const skills = [
    { name: "UI Design", icon: Layers, color: "text-cyan-300" },
    { name: "Coding", icon: Code, color: "text-yellow-200" },
    { name: "Illustration", icon: PenTool, color: "text-pink-300" },
    { name: "Strategy", icon: Monitor, color: "text-green-300" },
  ];
  
  return (
    <section id="services" className="py-20 px-4 md:px-12 bg-white/5">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h3 className="text-3xl font-chalk text-white mb-8 flex items-center">
            <Star className="w-6 h-6 text-yellow-200 mr-3" /> Skills
          </h3>
          <div className="grid grid-cols-2 gap-6">
            {skills.map((skill, i) => (
              <div key={i} className="flex flex-col items-center p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <skill.icon className={`w-8 h-8 mb-3 ${skill.color}`} style={{ filter: 'url(#chalk-stroke)' }} />
                <span className="font-chalk text-white text-lg">{skill.name}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-16">
             <h4 className="text-2xl font-chalk text-white mb-8">Experience</h4>
             <div className="border-l-2 border-white/20 ml-3 pl-8 space-y-10 relative" style={{ filter: 'url(#chalk-stroke)' }}>
               {[
                 { role: "Senior Designer", company: "Creative Studio", year: "2021 - Present" },
                 { role: "Freelance Illustrator", company: "Self Employed", year: "2018 - 2021" },
                 { role: "Junior Designer", company: "Tech Startup", year: "2016 - 2018" },
               ].map((job, i) => (
                 <div key={i} className="relative">
                   <div className="absolute -left-[41px] top-1 w-5 h-5 bg-[#1a1a1a] border-2 border-yellow-200 rounded-full" />
                   <h5 className="text-xl font-chalk text-white font-bold">{job.role}</h5>
                   <p className="font-chalk text-gray-400">{job.company} • {job.year}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-chalk text-white mb-8 flex items-center">
            <Coffee className="w-6 h-6 text-pink-300 mr-3" /> Services
          </h3>
          <ul className="space-y-6">
            {["Web Design & Development", "Custom Illustration", "Brand Identity Design", "Art Direction", "Print Design"].map((service, i) => (
              <li key={i} className="flex items-center font-chalk text-xl text-gray-200">
                <div className="w-2 h-2 bg-cyan-300 rounded-full mr-4" style={{ filter: 'url(#chalk-stroke)' }} />
                {service}
              </li>
            ))}
          </ul>
          
          <div className="mt-16 p-8 border-2 border-dashed border-white/20 rounded-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2">
               <Star className="w-6 h-6 text-yellow-200/50" />
             </div>
             <h4 className="text-xl font-chalk text-white mb-2">Fun Fact:</h4>
             <p className="font-chalk text-gray-400">I go through about 5 boxes of chalk per project. Digitally speaking, of course.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-chalk text-white">Client Notes</h2>
      </div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { text: "Clean, creative, and exactly what we needed.", author: "Sarah J." },
          { text: "The chalkboard aesthetic really stands out.", author: "Mike T." },
          { text: "Professional work with a fun twist.", author: "Alex R." },
        ].map((t, i) => (
          <div key={i} className="relative p-8 group">
             {/* Chalk Box */}
             <div className="absolute inset-0 border-2 border-white/20" 
                  style={{ 
                    borderRadius: '3px',
                    filter: 'url(#chalk-stroke)' 
                  }} 
             />
             <div className="relative z-10">
               <p className="font-chalk text-lg text-white mb-4">"{t.text}"</p>
               <div className="w-8 h-0.5 bg-pink-300 mb-2" style={{ filter: 'url(#chalk-stroke)' }} />
               <p className="font-chalk text-gray-400 text-sm">- {t.author}</p>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Blog = () => {
  return (
    <section id="blog" className="py-20 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-chalk text-white mb-12 text-center">Chalk Talk</h2>
        <div className="space-y-12">
          {[
            { title: "Designing for Dark Mode", date: "Nov 12, 2023", color: "text-yellow-200" },
            { title: "Why texture matters in UI", date: "Oct 28, 2023", color: "text-cyan-300" },
            { title: "Simplicity is the ultimate sophistication", date: "Sep 15, 2023", color: "text-pink-300" },
          ].map((post, i) => (
            <div key={i} className="group">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                <h3 className={`text-2xl font-chalk font-bold ${post.color} hover:underline decoration-dotted decoration-white underline-offset-4 cursor-pointer transition-all`}>
                  {post.title}
                </h3>
                <span className="font-chalk text-sm text-gray-500">{post.date}</span>
              </div>
              <p className="font-chalk text-gray-400 mb-6">A quick thought on how we can improve our digital landscapes...</p>
              <div className="h-px bg-white/20 w-full" style={{ filter: 'url(#chalk-stroke)' }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 md:px-12 relative">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
           <h2 className="text-4xl font-chalk text-white mb-4">Get in Touch</h2>
           <p className="font-chalk text-gray-400">Drop a line on the blackboard.</p>
        </div>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
               <label className="block font-chalk text-white mb-2">Name</label>
               <ChalkInput placeholder="John Doe" />
             </div>
             <div>
               <label className="block font-chalk text-white mb-2">Email</label>
               <ChalkInput placeholder="john@example.com" type="email" />
             </div>
          </div>
          <div>
            <label className="block font-chalk text-white mb-2">Message</label>
            <ChalkInput placeholder="Write your message here..." rows={4} />
          </div>
          
          <div className="pt-4 text-center">
            <ChalkButton className="inline-flex items-center" color="text-cyan-300" borderColor="border-cyan-300">
              Send Message <Send className="w-4 h-4 ml-2" />
            </ChalkButton>
          </div>
        </form>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-white/10 text-center bg-[#151515]">
      <div className="flex justify-center space-x-8 mb-8">
        {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
          <a key={i} href="#" className="text-white/60 hover:text-yellow-200 transition-colors transform hover:scale-110">
            <Icon className="w-6 h-6" style={{ filter: 'url(#chalk-stroke)' }} />
          </a>
        ))}
      </div>
      <p className="font-chalk text-lg text-white/40">
        © {new Date().getFullYear()} Blackboard Portfolio. Clean & Creative.
      </p>
    </footer>
  );
};

// --- Main App Component ---

const App = () => {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white overflow-x-hidden selection:bg-yellow-200 selection:text-black">
      {/* Font & Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap');
        
        .font-chalk {
          font-family: 'Kalam', cursive;
        }
        
        /* Subtle grain overlay for the whole page */
        body::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.03;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          z-index: 9999;
        }
      `}</style>
      
      <ChalkFilters />
      <Navbar />
      
      <div className="relative">
         <Hero />
         <About />
         <Projects />
         <SkillsAndServices />
         <Testimonials />
         <Blog />
         <Contact />
      </div>
      
      <Footer />
    </main>
  );
};

export default App;
