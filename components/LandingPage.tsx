import React, { useState } from 'react';
import { motion, Variants , AnimatePresence} from 'framer-motion';
import { TrendingUp, Bell, Activity, Shield, AlertCircle, Menu, X, Plus, LayoutDashboard } from 'lucide-react';
interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const partners = [
    "Stripe", "Plaid", "AWS", "Vercel", "Microsoft", "Google Cloud", 
    "Figma", "Slack", "Adobe", "Salesforce", "Atlassian", "Datadog"
  ];

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    
    // <div className="bg-zinc-950 text-zinc-100 min-h-screen overflow-x-hidden selection:bg-emerald-500/30 font-['Inter'] scroll-smooth">
    //   {/* Floating Pill Navigation */}
    //   <motion.div 
    //     initial={{ y: -100 }}
    //     animate={{ y: 0 }}
    //     transition={{ duration: 0.6, ease: "easeOut" }}
    //     className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-4xl"
    //   >
    //     <nav className="bg-zinc-900/80 backdrop-blur-2xl border border-zinc-800/50 rounded-full px-4 py-3 flex items-center justify-between shadow-2xl shadow-black/80">
    //       <div className="flex items-center gap-3 pl-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
    //         <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-zinc-950 font-black text-sm shadow-lg shadow-emerald-500/20">C</div>
    //         <span className="text-lg font-black tracking-tighter hidden sm:block">Cusub</span>
    //       </div>
          
    //       <div className="flex items-center gap-6 md:gap-10 text-[10px] font-black uppercase tracking-widest text-zinc-500">
    //         <a href="#problem" className="hover:text-emerald-400 transition-colors hidden md:block">The Bleed</a>
    //         <a href="#intelligence" className="hover:text-emerald-400 transition-colors hidden md:block">Intelligence</a>
    //         <a href="#security" className="hover:text-emerald-400 transition-colors hidden md:block">Security</a>
    //         <a href="#tiers" className="hover:text-emerald-400 transition-colors">Tiers</a>
    //         <div className="h-4 w-px bg-zinc-800 hidden md:block"></div>
    //         <a href="#status" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
    //           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
    //           <span className="text-zinc-400">System Live</span>
    //         </a>
    //       </div>

    //       <button 
    //         onClick={onGetStarted}
    //         className="px-6 py-3 bg-emerald-500 text-zinc-950 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-emerald-400 hover:scale-105 transition-all active:scale-95 shadow-lg shadow-emerald-500/10"
    //       >
    //         Access Portal
    //       </button>
    //     </nav>
    //   </motion.div>




    
    <div className="bg-zinc-950 text-zinc-100 min-h-screen overflow-x-hidden selection:bg-emerald-500/30  scroll-smooth">
  {/* Floating Pill Navigation */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[] max-w-2xl"
        // className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-[100] w-[95%] md:w-[90%] max-w-6xl px-2 md:px-0"
      >
        <nav className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-full px-3 md:px-6 py-3 md:py-3 flex items-center justify-between shadow-2xl shadow-black/80">
          {/* Logo */}
          <div className="flex items-center gap-2cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-zinc-950 font-black text-sm">C</div>
            <span className="text-lg font-black ">Cusub</span>
          </div>
          
          {/* Desktop Navigation Links - Hidden on mobile */}
          <div   className="hidden lg:flex items-center justify-center gap-6 mt-3 pt-3 border-t border-zinc-800/50 text-[10px] font-black uppercase text-zinc-500">
  <a href="#problem" className="hover:text-emerald-400 transition-colors">The Bleed</a>
  <a href="#intelligence" className="hover:text-emerald-400 transition-colors">Intelligence</a>
  <a href="#security" className="hover:text-emerald-400 transition-colors">Security</a>
  <a href="#tiers" className="hover:text-emerald-400 transition-colors">Tiers</a>
  <a href="#status" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
    <span className="text-zinc-400">Status</span>
  </a>
</div>

          {/* Right Side - CTA + Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            {/*  Get Started button -  */}
            <button 
              onClick={onGetStarted}
              className="px-4 py-2 bg-emerald-500 text-zinc-950 rounded-full font-black text-[10px] uppercase hover:bg-emerald-400"
              // style={{ display: 'inline-block !important', visibility: 'visible !important', opacity: '1 !important',minWidth: '120px' }}  
            >
               Get Started
            </button>

            {/* Mobile Menu Button  */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-zinc-800 rounded-full transition-colors shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-zinc-400" />
              ) : (
                <Menu className="w-5 h-5 text-zinc-400" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-2 bg-zinc-900/95 backdrop-blur-2xl border border-zinc-800/50 rounded-3xl p-6 shadow-2xl shadow-black/80"
            >
              <div className="flex flex-col gap-4">
                <a 
                  href="#problem" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-black uppercase tracking-widest text-zinc-400 hover:text-emerald-400 transition-colors py-2 border-b border-zinc-800/50"
                >
                  The Bleed
                </a>
                <a 
                  href="#intelligence" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-black uppercase tracking-widest text-zinc-400 hover:text-emerald-400 transition-colors py-2 border-b border-zinc-800/50"
                >
                  Intelligence
                </a>
                <a 
                  href="#security" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-black uppercase tracking-widest text-zinc-400 hover:text-emerald-400 transition-colors py-2 border-b border-zinc-800/50"
                >
                  Security
                </a>
                <a 
                  href="#tiers" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-black uppercase tracking-widest text-zinc-400 hover:text-emerald-400 transition-colors py-2 border-b border-zinc-800/50"
                >
                  Tiers
                </a>
                <a 
                  href="#status" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-zinc-400 hover:text-emerald-400 transition-colors py-2"
                >
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  System Status
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>


      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-56 md:pb-40 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#10b98115,transparent_50%)]"></div>
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={stagger}
            initial="initial"
            animate="animate"
            className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20"
          >
            <div className="flex-1 space-y-8 md:space-y-10 text-center lg:text-left z-10">
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[9px] font-black tracking-[0.4em] uppercase shadow-inner mx-auto lg:mx-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Subscription Audit v2.0
              </motion.div>
              
              <motion.div variants={fadeInUp} className="space-y-4">
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] italic uppercase">
                 Subscription  <br/> 
                  <span className="text-emerald-500">Intelligence</span> <br/>
                  Perfected.
                </h1>
                <p className="text-lg md:text-2xl text-zinc-400 max-w-xl mx-auto lg:mx-0 font-medium leading-tight tracking-tight italic">
                  Take control of your subscriptions with Cusub—real-time insights, proactive detection, and complete visibility into your SaaS spend.

                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-6">
                <button 
                  onClick={onGetStarted}
                  className="group relative w-full sm:w-auto px-12 py-6 bg-zinc-100 text-zinc-950 font-black text-xl rounded-3xl overflow-hidden hover:scale-105 transition-all shadow-2xl active:scale-95"
                >
                  <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative z-10 group-hover:text-zinc-950 transition-colors uppercase tracking-widest text-sm">Start Tracking</span>
                </button>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">Subscriptions Monitored</span>
                  <span className="text-emerald-500 text-xs font-black italic">$142M+ Assets Monitored</span>
                </div>
              </motion.div>
            </div>

            <motion.div 
              variants={fadeInUp}
              className="flex-1 w-full max-w-2xl lg:max-w-none relative mt-10 lg:mt-0"
            >
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square bg-emerald-500/5 blur-[100px] rounded-full -z-10 animate-pulse"></div>
               
               <motion.div 
                whileHover={{ rotate: 0 }}
                className="relative bg-zinc-900/60 backdrop-blur-3xl border border-zinc-800 p-6 md:p-8 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl shadow-black lg:rotate-2 transition-transform duration-700 group max-w-lg mx-auto lg:mx-0"
               >
                  <div className="flex items-center justify-between mb-8 md:mb-10">
                    <div className="space-y-1">
                      <div className="text-[9px] md:text-[10px] font-black text-emerald-500 uppercase tracking-widest">Strategic Insight</div>
                      <div className="text-xl md:text-2xl font-black text-zinc-100 italic uppercase">Audit Brief</div>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500 rounded-xl md:rounded-2xl flex items-center justify-center text-zinc-950">
                      <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    <div className="p-4 md:p-6 bg-zinc-950/50 border border-red-500/20 rounded-[1.5rem] md:rounded-3xl space-y-3">
                       <div className="flex justify-between items-center">
                         <span className="text-[9px] font-black text-zinc-500 uppercase">Anomaly: SaaS Ghost</span>
                         <span className="text-[7px] md:text-[8px] font-black text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full">CRITICAL</span>
                       </div>
                       <div className="text-base md:text-lg font-black text-zinc-100 italic uppercase">Unused Salesforce Seats</div>
                       <div className="flex justify-between items-end">
                         <div className="text-xl md:text-2xl font-black text-zinc-100">$4,200<span className="text-xs text-zinc-500 ml-1 italic font-medium">/mo</span></div>
                         <div className="text-[9px] font-black text-zinc-600 uppercase">0% Usage Score</div>
                       </div>
                    </div>
                    <div className="p-4 md:p-6 bg-zinc-950/50 border border-emerald-500/20 rounded-[1.5rem] md:rounded-3xl">
                       <div className="text-[9px] font-black text-zinc-500 uppercase mb-4">Perimeter Liquidity</div>
                       <div className="flex gap-1 h-8 md:h-10 items-end">
                         {[0.4, 0.7, 0.5, 0.9, 0.6, 1, 0.8].map((h, i) => (
                           <motion.div 
                            key={i} 
                            initial={{ height: 0 }}
                            animate={{ height: `${h * 100}%` }}
                            transition={{ delay: 1 + (i * 0.1), duration: 0.5 }}
                            className="flex-grow bg-emerald-500/20 rounded-t-sm group-hover:bg-emerald-500/40 transition-colors"
                           />
                         ))}
                       </div>
                    </div>
                  </div>

                  <div className="absolute -top-6 -right-4 md:-top-12 md:-right-12 p-4 md:p-6 bg-violet-500/20 backdrop-blur-xl border border-violet-500/30 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl animate-bounce">
                    <div className="text-[8px] font-black text-violet-400 uppercase tracking-widest mb-1">AES Keys</div>
                    <div className="text-[10px] font-black text-zinc-100 italic">ROTATED</div>
                  </div>
               </motion.div>
                 <div className="absolute -bottom-8 -left-8 p-6 bg-zinc-900 border border-emerald-500/30 rounded-[2rem] shadow-2xl">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                       <span className="text-[10px] font-black text-zinc-100 uppercase tracking-widest">Plaid Live Sync</span>
                    </div>
                  </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trusted by modern teams Marquee */}
      <div className="py-20 bg-zinc-950 relative overflow-hidden group border-y border-zinc-900/50">
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-zinc-950 to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-zinc-950 to-transparent z-10"></div>
        
        <div className="flex flex-col gap-10">
          <div className="text-center">
            <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.6em]">Works with the tools your team already uses</span>
          </div>
          
          <div className="flex overflow-hidden relative">
            <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-32 items-center py-4">
              {partners.concat(partners).map((partner, i) => (
                <span key={i} className="text-3xl md:text-5xl font-black italic text-zinc-800 uppercase tracking-tighter hover:text-emerald-500/50 transition-colors cursor-default select-none">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
        `}} />
      </div>

      {/* The Problem: THE BLEED */}
<section id="problem" className="py-32 md:py-48 px-6 bg-zinc-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">Identify The <span className="text-red-500">Bleed.</span></h2>
            <p className="text-xl text-zinc-400 font-medium italic">Subscription fatigue is a liability. Ghost-Asset Fingerprinting finds unmonitored outflow instantly.</p>
            <div className="flex gap-4">
              <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl flex-1">
                <Activity className="text-red-500 mb-4" />
                <div className="text-3xl font-black">89.4%</div>
                <div className="text-[10px] text-zinc-600 font-black uppercase">Detection Rate</div>
              </div>
              <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl flex-1">
                <Shield className="text-emerald-500 mb-4" />
                <div className="text-3xl font-black">100%</div>
                <div className="text-[10px] text-zinc-600 font-black uppercase">Hike Protection</div>
              </div>
            </div>
          </div>
          <div className="p-10 bg-zinc-900 border border-zinc-800 rounded-[3rem] shadow-2xl">
             <div className="flex items-center gap-3 mb-8">
               <AlertCircle className="text-red-500" />
               <span className="text-lg font-black uppercase italic">Violation Detected</span>
             </div>
             <div className="bg-zinc-950 p-6 rounded-2xl border border-red-500/20">
               <div className="flex justify-between items-end">
                 <div>
                   <div className="text-xl font-black italic">Segment Pro</div>
                   <div className="text-[10px] text-zinc-600 font-black uppercase">0% Usage score</div>
                 </div>
                 <div className="text-2xl font-black">$3,200/mo</div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Intelligence:  */}
      <section id="intelligence" className="py-48 px-6 relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-violet-500/5 blur-[200px] -mr-96 -mt-96"></div>
        <div className="max-w-7xl mx-auto space-y-32">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="text-center space-y-6"
           >
              <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Section 02: Strategic Audit Protocols</div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.9]">Autonomous <br/>Intelligence.</h2>
              <p className="text-zinc-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
                Cusub isn’t a spreadsheet. It’s a Rotation Engine—built to control seat lifecycles and pinpoint efficiency gaps at scale
              </p>
           </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  icon: TrendingUp,
                  color: 'violet',
                  title: 'Rotation Engine',
                  description: 'Phase 3 Logic: Pause assets with low usage scores. The system calculates "Cost-per-Active-Seat" and triggers rotation protocols for enterprise SaaS stacks automatically.',
                  footer: 'Analysis Frequency: Real-time'
                },
                {
                  icon: LayoutDashboard,
                  color: 'emerald',
                  title: 'Consolidation AI',
                  description: 'Identify overlapping tools across your team’s software stack. Cusub proposes ‘Bundled Transitions’ to save up to 30% on subscription spend with zero friction.',
                  footer: 'Cross-Platform Sync: Active'
                },
                {
                  icon: AlertCircle,
                  color: 'amber',
                  title: 'Hike Resistance',
                  description: 'Price hike alerts use historical benchmark data to notify you if you\'re being overcharged compared to the global Cusub Executive baseline for that specific asset category.',
                  footer: 'Anomaly Threshold: 3% Delta'
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  className={`p-10 bg-zinc-900/40 border border-zinc-800 rounded-[3rem] text-left hover:border-${item.color}-500/30 transition-all group relative overflow-hidden flex flex-col justify-between`}
                >
                  <div>
                    <div className={`mb-10 w-16 h-16 bg-${item.color}-500/10 rounded-2xl flex items-center justify-center text-${item.color}-400`}>
                      <item.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black italic uppercase mb-4">{item.title}</h3>
                    <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-8">
                      {item.description}
                    </p>
                  </div>
                  <div className={`text-[10px] font-black text-${item.color}-500 uppercase tracking-widest border-t border-zinc-800 pt-6`}>{item.footer}</div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Security: DATA SOVEREIGNTY  */}
      <section id="security" className="py-48 px-6 bg-zinc-900/10 border-y border-zinc-900 relative scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10"
          >
            <div className="space-y-6 max-w-2xl">
              <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Section 03: Perimeter Defense & Sovereignty</div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">Security <br/><span className="text-emerald-500">Tiers.</span></h2>
              <p className="text-zinc-400 text-xl font-medium leading-relaxed">
                We use robust security and auditable tracking. Every subscription is securely indexed and protected with AES-256-GCM encryption
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Sovereign Export',
                description: 'Download your full subscription history anytime. Cusub supports GDPR and CCPA data portability for complete control of your team’s information',
                features: ['Fully Auditable Logs', 'Encryption Keys Rotated Daily']
              },
              {
                title: 'AES Fingerprinting',
                description: 'Your subscription data is fully encrypted and visible only to your team. Each account is securely isolated to ensure complete privacy.',
                features: ['256-Bit standard', 'Zero-Knowledge. Protocol']
              },
              {
                title: 'Plaid Perimeter',
                description: 'Integrations are secure and read-only. Cusub never stores sensitive credentials and only accesses verified subscription data streams',
                features: ['Multi-Region Isolation', 'Biometric Vault Ready']
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="p-10 bg-zinc-950 border border-zinc-800 rounded-[2.5rem] space-y-6 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[80px] -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-all"></div>
                <div className="text-emerald-500 italic font-black text-xl uppercase tracking-tighter">{item.title}</div>
                <p className="text-zinc-500 font-medium text-sm leading-relaxed">
                  {item.description}
                </p>
                <ul className="space-y-3 pt-4 border-t border-zinc-800">
                  {item.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-[8px] font-black text-zinc-400 uppercase tracking-widest">
                      <div className="w-1 h-1 bg-emerald-500 rounded-full"></div> {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers  */}
      <section id="tiers" className="py-48 px-6 scroll-mt-24">
        <div className="max-w-6xl mx-auto space-y-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">Phase 3 <span className="text-emerald-500">Tiers.</span></h2>
            <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.4em]">Optimized for High-Performance Executives</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-zinc-900 border border-zinc-800 p-12 rounded-[3.5rem] flex flex-col hover:bg-zinc-900/80 transition-all border-l-8 border-l-zinc-700 shadow-xl"
            >
              <div className="mb-10">
                <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Individual Executive</div>
                <h4 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Cusub Basic</h4>
                <div className="text-5xl font-black">$0<span className="text-lg text-zinc-600 font-bold ml-2">/ lifetime</span></div>
              </div>
              <ul className="space-y-6 flex-grow mb-12">
                {[
                  'Manual Subscription Entry (Unlimited)', 
                  'Real-time Dashboard ', 
                  'Basic Sorting/Multi-Currency', 
                  'Subscription Type Classification',
                  'Data Security Status'
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-4 text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full"></div> {f}
                  </li>
                ))}
              </ul>
              <button onClick={onGetStarted} className="w-full py-6 bg-zinc-800 text-zinc-100 font-black rounded-3xl hover:bg-zinc-700 transition-all uppercase tracking-widest text-[10px]">Select Basic Protocol</button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-zinc-900 border border-emerald-500/30 p-12 rounded-[3.5rem] flex flex-col relative overflow-hidden group border-l-8 border-l-emerald-500 shadow-2xl shadow-emerald-500/10"
            >
              <div className="absolute top-0 right-0 px-8 py-2 bg-emerald-500 text-zinc-950 font-black text-[10px] uppercase tracking-widest rounded-bl-3xl">Elite Deployment</div>
              <div className="mb-10">
                <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Managed Teams</div>
                <h4 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Cusub Elite</h4>
                <div className="text-5xl font-black text-emerald-500">$12<span className="text-lg text-zinc-600 font-bold ml-2">/ seat</span></div>
              </div>
              <ul className="space-y-6 flex-grow mb-12">
                {[
                  'ARotation Engine', 
                  'Secure Tool Integrations', 
                  'Multi-Seat License Tracking', 
                  'Subscription Change Protection',
                  'Unused Seat Cleanup',
                  'Exit Assistance'
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-4 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> {f}
                  </li>
                ))}
              </ul>
              <button onClick={onGetStarted} className="w-full py-6 bg-emerald-500 text-zinc-950 font-black rounded-3xl hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 uppercase tracking-widest text-[10px]">Initialize Elite Session</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* System Status  */}
      <section id="status" className="py-48 px-6 bg-zinc-950 border-t border-zinc-900 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-zinc-900/40 p-12 rounded-[3.5rem] border border-zinc-800 space-y-12"
          >
            <div className="flex justify-between items-center">
               <div className="space-y-2">
                 <h4 className="text-3xl font-black italic uppercase text-zinc-100">System Live Telemetry</h4>
                 <div className="flex items-center gap-3">
                   <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                   <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Operational Perimeter</span>
                 </div>
               </div>
               <div className="text-right">
                 <div className="text-4xl font-black text-zinc-100 italic tracking-tighter">99.98%</div>
                 <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Audit Accuracy Basis</div>
               </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               {[
                 { label: 'Global Assets Indexed', value: '$142.4M' },
                 { label: 'Ghost Churn Recovery', value: '$8.2M' },
                 { label: 'Active Audit Cycles', value: '42,404/hr' },
                 { label: 'Global Latency', value: '38ms' }
               ].map((stat, i) => (
                 <div key={i} className="space-y-1 p-6 bg-zinc-950/30 rounded-2xl border border-zinc-800/50">
                   <div className="text-lg font-black text-zinc-100 italic">{stat.value}</div>
                   <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{stat.label}</div>
                 </div>
               ))}
            </div>

            <div className="p-6 bg-zinc-950/50 border border-zinc-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
               <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] italic">Active Nodes: Virginia (US-East), Ireland (EU-West), Tokyo (Asia-Pac)</div>
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">SYNC STATUS: STABLE</span>
                 <div className="flex gap-1">
                   {[1,2,3,4].map(i => <div key={i} className="w-1 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>)}
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/*  Footer */}
      <footer className="pt-32 pb-16 px-6 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-24">
            <div className="col-span-2 lg:col-span-2 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-zinc-950 font-black text-lg">C</div>
                <span className="text-3xl font-black italic tracking-tighter">Cusub.</span>
              </div>
              <p className="text-zinc-500 text-lg font-medium max-w-sm leading-relaxed italic">
                 Subscription Intelligence Engine. High-performance tracking for modern teams.
              </p>
            </div>

            <div className="space-y-6">
              <h5 className="text-[10px] font-black text-zinc-100 uppercase tracking-[0.3em]">Subscription Overlap Detection</h5>
              <ul className="flex flex-col gap-4 text-sm font-bold text-zinc-500">
                <li><a href="#problem" className="hover:text-emerald-400 transition-colors">Usage Insights</a></li>
                <li><a href="#intelligence" className="hover:text-emerald-400 transition-colors">Usage Insights</a></li>
                <li><a href="#security" className="hover:text-emerald-400 transition-colors">Data Security Level</a></li>
                <li><a href="#status" className="hover:text-emerald-400 transition-colors">System Live Status</a></li>
              </ul>
            </div>

            <div className="space-y-6">
          <h5 className="text-[10px] font-black text-zinc-100 uppercase tracking-[0.3em]">Executive</h5>
              <ul className="flex flex-col gap-4 text-sm font-bold text-zinc-500">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Team Management</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Account Setup</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Data Access Control</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="text-[10px] font-black text-zinc-100 uppercase tracking-[0.3em]">Privacy & Security</h5>
              <ul className="flex flex-col gap-4 text-sm font-bold text-zinc-500">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span className="text-zinc-300">GDPR VERIFIED</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span className="text-zinc-300">SOC 2 Certified</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em]">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <span>© 2026 CUSUB FINANCE INC.</span>
              <span className="hidden md:block text-zinc-800">|</span>
              <span>Phase 3 Subscription Tracking</span>
            </div>
            <div className="flex items-center gap-2">
            <span className="text-zinc-800">Session ID:</span>
            <span className="text-emerald-500/50">A-42-X-99</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;