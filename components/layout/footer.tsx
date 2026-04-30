import { Play } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="mx-auto w-full border-t border-[#D8E7DF] bg-white/90 pt-16 pb-7 text-[#0B1F1A] padding-x dark:border-transparent dark:bg-[#091716] dark:text-white">
        <div className="grid grid-cols-1 gap-12 border-b border-[#D8E7DF] pb-14 md:grid-cols-2 lg:grid-cols-5 dark:border-white/5">
          <div className="max-w-[280px]">
            <h2 className="text-[18px] font-semibold tracking-tight text-[#008A63] dark:text-[#79e2c5]">
              KICSCORE
            </h2>

            <p className="mt-8 text-sm leading-8 text-[#61736D] dark:text-white/70">
              Fotgram is the essential football app. Immerse yourself in the
              beautiful game with unrivaled stats, news, and live updates.
            </p>

            <h3 className="mt-14 text-sm font-semibold uppercase tracking-[0.18em] text-[#0B1F1A] dark:text-white">
              Get The App
            </h3>

            <button className="mt-5 flex items-center gap-3 rounded-full border border-[#D8E7DF] bg-white px-5 py-3 shadow-[0_10px_30px_rgba(16,32,27,0.08)] transition hover:border-[#008A63]/30 hover:bg-[#F8FBFA] dark:border-transparent dark:bg-white/6 dark:shadow-none dark:hover:bg-white/10">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF3EF] dark:bg-white/8">
                <Play className="h-4 w-4 fill-[#008A63] text-[#008A63] dark:fill-white dark:text-white" />
              </div>

              <div className="text-left leading-tight">
                <p className="text-[10px] uppercase tracking-wide text-[#61736D] dark:text-white/50">
                  Get it on
                </p>
                <p className="text-sm font-semibold text-[#0B1F1A] dark:text-white">
                  Google Play
                </p>
              </div>
            </button>
          </div>

          {[
            { title: "Explore", links: ["Matches", "News", "Leagues"] },
            {
              title: "Popular Leagues",
              links: [
                "Premier League",
                "La Liga",
                "Serie A",
                "Bundesliga",
                "Champions League",
              ],
            },
            { title: "Kicscore", links: ["About Us"] },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0B1F1A] dark:text-white">
                {section.title}
              </h3>

              <div className="mt-8 flex flex-col gap-5 text-[#61736D] dark:text-white/70">
                {section.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-sm transition hover:text-[#008A63] dark:hover:text-[#79e2c5]"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div>
            <div className="mt-0 flex flex-col gap-5 text-[#61736D] lg:mt-10 dark:text-white/70">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "Data Settings",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm transition hover:text-[#008A63] dark:hover:text-[#79e2c5]"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-7 text-[#61736D] md:flex-row md:items-center md:justify-between dark:text-white/60">
          <p className="text-sm">© 2026 Kicscore. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <span className="text-sm text-[#61736D] dark:text-white/60">
              Follow Us on
            </span>

            {[
              { icon: FaInstagram, label: "Instagram" },
              { icon: FaFacebookF, label: "Facebook" },
              { icon: FaXTwitter, label: "X" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="transition hover:text-[#008A63] dark:hover:text-[#79e2c5]"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
