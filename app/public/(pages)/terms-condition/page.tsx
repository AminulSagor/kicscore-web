import LegalPage from "@/app/public/(pages)/_components/legal-page";

const termsSections = [
    {
        title: "1. Acceptance of Terms",
        description:
            "By accessing or using the KICSCORE platform, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not access the service. These terms apply to all visitors, users, and others who access or use the Service.",
    },
    {
        title: "2. Live Data Accuracy & Delays",
        description:
            "KICSCORE strives to provide accurate and real-time football scores, match statistics, and news. However, live sports data is subject to inherent delays and human error. All match data is provided as-is for informational and entertainment purposes only, and we do not guarantee 100% accuracy of live timers, scorelines, or VAR decisions.",
    },
    {
        title: "3. Not for betting purposes",
        highlight:
            "The information provided within KICSCORE should not be relied upon for placing financial wagers or betting, and we are not liable for any financial losses incurred based on the data displayed in this application.",
    },
    {
        title: "4. Team Logos & Trademarks",
        description:
            "All team names, club logos, league badges, and player images displayed in the app are the property of their respective owners and are used strictly under fair use for identification and news reporting purposes.",
    },
];

const TermsConditionPage = () => {
    return (
        <LegalPage
            title="Terms & Condition"
            lastUpdated="April 18, 2026"
            sections={termsSections}
        />
    );
};

export default TermsConditionPage;