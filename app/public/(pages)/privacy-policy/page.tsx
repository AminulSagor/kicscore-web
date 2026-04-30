import LegalPage from "@/app/public/(pages)/_components/legal-page";

const privacySections = [
    {
        title: "1. Introduction",
        description:
            "Welcome to KICSCORE. We are committed to protecting your personal information and your right to privacy. This policy explains how we collect and use your data when you use our mobile application to follow live football scores, news, and team updates.",
    },
    {
        title: "2. Information We Collect",
        description:
            "To provide you with personalized match updates, push notifications for your favorite teams, and sync your preferences across devices, we collect account information if you choose to sign in and device identifiers. We may also collect non-precise location data to show you localized leagues and relevant news.",
    },
    {
        title: "3. How We Use Your Information",
        description:
            "Your data is used strictly to enhance your app experience. This includes delivering real-time goal alerts, tailoring the Following tab to your selected clubs and leagues, and improving app stability through crash reporting.",
    },
];

const PrivacyPolicyPage = () => {
    return (
        <LegalPage
            title="Privacy Policy"
            lastUpdated="April 18, 2026"
            sections={privacySections}
            showContact
            contactText="If you have questions about this privacy policy, please contact our support team at:"
        />
    );
};

export default PrivacyPolicyPage;