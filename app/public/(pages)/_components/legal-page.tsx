import { Mail } from "lucide-react";

type LegalSection = {
    title: string;
    description?: string;
    highlight?: string;
};

type LegalPageProps = {
    title: string;
    lastUpdated: string;
    sections: LegalSection[];
    contactText?: string;
    showContact?: boolean;
};

const LegalPage = ({
    title,
    lastUpdated,
    sections,
    contactText,
    showContact = false,
}: LegalPageProps) => {
    return (
        <main className="min-h-screen bg-[#F8FBFA] text-[#0B1F1A] dark:bg-[#07110F] dark:text-white">
            <section className="padding-x mx-auto max-w-[720px] pt-16 pb-24 lg:pt-16 lg:pb-28">
                <div>
                    <h1 className="text-[28px] font-bold tracking-tight md:text-[32px]">
                        {title}
                    </h1>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#61736D] dark:text-white/40">
                        Last Updated: {lastUpdated}
                    </p>
                </div>

                <div className="mt-14 space-y-11">
                    {sections.map((section) => (
                        <section key={section.title}>
                            <h2 className="text-sm font-bold tracking-tight">
                                {section.title}
                            </h2>

                            {section.description && (
                                <p className="mt-4 text-sm leading-7 text-[#40524C] dark:text-white/65">
                                    {section.description}
                                </p>
                            )}

                            {section.highlight && (
                                <div className="mt-4 border-l-4 border-[#00C48C] bg-white px-6 py-5 text-sm leading-7 text-[#40524C] dark:bg-white/5 dark:text-white/75">
                                    {section.highlight}
                                </div>
                            )}
                        </section>
                    ))}
                </div>

                {showContact && contactText && (
                    <div className="mt-20 border-t border-[#D8E7DF] pt-7 dark:border-white/8">
                        <div className="flex gap-4">
                            <Mail className="mt-1 h-5 w-5 text-[#008A63] dark:text-[#79e2c5]" />

                            <div>
                                <h3 className="text-sm font-semibold">Contact Us</h3>
                                <p className="mt-4 max-w-[270px] text-sm leading-7 text-[#61736D] dark:text-white/65">
                                    {contactText}
                                </p>
                                <a
                                    href="mailto:support@kicscore.com"
                                    className="mt-3 inline-block text-sm font-semibold text-[#008A63] transition hover:text-[#006C4D] dark:text-[#79e2c5]"
                                >
                                    support@kicscore.com →
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
};

export default LegalPage;