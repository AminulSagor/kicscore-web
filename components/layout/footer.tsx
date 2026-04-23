import { Play } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="mx-auto w-full bg-[#091716] px-6 pt-14 pb-6 text-white">
        <div className="grid grid-cols-1 gap-10 border-b border-white/5 pb-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="max-w-[260px]">
            <h2 className="text-[18px] font-semibold tracking-tight text-[#79e2c5]">
              KICSCORE
            </h2>

            <p className="mt-8 text-sm leading-8 text-white/70">
              Fotgram is the essential football app. Immerse yourself in the
              beautiful game with unrivaled stats, news, and live updates.
            </p>

            <h3 className="mt-14 text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Get The App
            </h3>

            <button className="mt-5 flex items-center gap-3 rounded-full bg-white/6 px-5 py-3 transition hover:bg-white/10">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8">
                <Play className="h-4 w-4 fill-white text-white" />
              </div>

              <div className="text-left leading-tight">
                <p className="text-[10px] uppercase tracking-wide text-white/50">
                  Get it on
                </p>
                <p className="text-sm font-semibold text-white">Google Play</p>
              </div>
            </button>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Explore
            </h3>

            <div className="mt-8 flex flex-col gap-5 text-white/70">
              <a href="#" className="text-sm transition hover:text-[#79e2c5]">
                Matches
              </a>
              <a href="#" className="text-sm transition hover:text-[#79e2c5]">
                News
              </a>
              <a href="#" className="text-sm transition hover:text-[#79e2c5]">
                Leagues
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Popular Leagues
            </h3>

            <div className="mt-8 flex flex-col gap-5 text-white/70">
              <a href="#" className="text-sm transition hover:text-[#79e2c5]">
                Premier League
              </a>
              <a href="#" className="text-sm transition hover:text-[#79e2c5]">
                La Liga
              </a>
              <a href="#" className="text-sm transition hover:text-[#79e2c5]">
                Serie A
              </a>
              <a href="#" className="text-sm transition hover:text-[#79e2c5]">
                Bundesliga
              </a>
              <a href="#" className="text-sm transition hover:text-[#79e2c5]">
                Champions League
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Kicscore
            </h3>

            <div className="mt-8 flex flex-col gap-5 text-white/70">
              <a href="#" className="text-sm transition hover:text-[#79e2c5]">
                About Us
              </a>
            </div>
          </div>

          <div>
            <div className="mt-0 flex flex-col gap-5 text-white/70 lg:mt-10">
              <a href="#" className="text-sm transition hover:text-[#79e2c5]">
                Privacy Policy
              </a>
              <a href="#" className="text-sm transition hover:text-[#79e2c5]">
                Terms of Service
              </a>
              <a href="#" className="text-sm transition hover:text-[#79e2c5]">
                Cookie Policy
              </a>
              <a href="#" className="text-sm transition hover:text-[#79e2c5]">
                Data Settings
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-6 text-white/60 md:flex-row md:items-center md:justify-between">
          <p className="text-sm">© 2026 Kicscore. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <span className="text-sm text-white/60">Follow Us on</span>

            <a href="#" className="transition hover:text-[#79e2c5]">
              <Play className="h-5 w-5" />
            </a>

            <a href="#" className="transition hover:text-[#79e2c5]">
              <Play className="h-5 w-5" />
            </a>

            <a href="#" className="transition hover:text-[#79e2c5]">
              <Play className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
