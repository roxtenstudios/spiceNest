"use client";

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-32 pb-12 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-32 border-b border-white/10 pb-24">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-heading text-4xl md:text-6xl text-white mb-6">SpiceNest</h2>
            <p className="text-white/60 font-light max-w-sm text-balance">
              Every jar has a story. Handcrafted using authentic recipes, premium ingredients, and generations of tradition.
            </p>
          </div>
          
          <div>
            <h4 className="uppercase tracking-widest text-xs text-white/40 mb-6 font-semibold">Explore</h4>
            <ul className="space-y-4">
              {["Shop Collection", "Our Story", "The Ingredients", "Journal"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-widest text-xs text-white/40 mb-6 font-semibold">Connect</h4>
            <ul className="space-y-4">
              {["Instagram", "WhatsApp", "Email Us", "Business Inquiry"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-white/40 text-sm">
          <p>&copy; {new Date().getFullYear()} SpiceNest. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      
      {/* Huge subtle text in background */}
      <div className="absolute bottom-[-5%] left-0 right-0 text-center pointer-events-none select-none opacity-5 flex justify-center overflow-hidden whitespace-nowrap">
        <span className="font-heading text-[20vw] leading-none tracking-tighter">SPICENEST</span>
      </div>
    </footer>
  );
}
