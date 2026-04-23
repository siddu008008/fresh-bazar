const Footer = () => {
  return (
    <footer className="bg-surface-container-low pt-20 pb-12 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-black text-primary font-headline tracking-tight">Fresh <span className="text-secondary">Bazar</span></span>
            <p className="mt-6 text-on-surface-variant text-sm font-medium leading-relaxed">
              Experience the digital market garden. Curated, seasonal, and ethically sourced groceries delivered with care.
            </p>
          </div>
          <div>
            <h3 className="font-headline font-bold text-primary mb-6">Explore</h3>
            <ul className="space-y-4 text-sm font-medium text-on-surface-variant">
              <li className="hover:text-primary transition-colors cursor-pointer">Seasonal Harvest</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Organic Pantry</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Wellness Collection</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Artisanal Bakery</li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-bold text-primary mb-6">Mission</h3>
            <ul className="space-y-4 text-sm font-medium text-on-surface-variant">
              <li className="hover:text-primary transition-colors cursor-pointer">Our Story</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Farmer Connect</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Sustainability</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Quality Guard</li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-bold text-primary mb-6">Contact</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-on-surface-variant hover:text-primary cursor-pointer transition-colors text-sm font-medium">
                <span className="material-symbols-outlined text-lg">public</span>
                <span>www.freshbazar.com</span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant hover:text-primary cursor-pointer transition-colors text-sm font-medium">
                <span className="material-symbols-outlined text-lg">call</span>
                <span>+91 8088094235</span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant hover:text-primary cursor-pointer transition-colors text-sm font-medium">
                <span className="material-symbols-outlined text-lg">mail</span>
                <span>kssiddesh762@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-outline-variant/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-medium text-on-surface-variant">© 2026 Fresh Bazar. Cultivated with love.</p>
          <div className="flex gap-6 text-sm font-bold text-primary uppercase tracking-widest">
            <span className="hover:underline cursor-pointer">Privacy</span>
            <span className="hover:underline cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
