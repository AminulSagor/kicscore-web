import LegalPage from "@/app/public/(pages)/_components/legal-page";

const privacySections = [
  {
    title: "1. Introduction",
    description:
      "Welcome to KICSCORE. This privacy policy explains how we collect, use, store, and protect information when you use our website and Android app to view live football scores, league details, team details, match details, upcoming and previous fixtures, World Cup information, player details, coach details, and football news.",
  },
  {
    title: "2. Information We Collect",
    description:
      "We may collect account information when you register or sign in, such as your name, email address, profile photo, account status, and authentication details. We also collect app or browser information needed to keep the service working, including a unique installation ID for users who are not signed in.",
  },
  {
    title: "3. Follow Data and Installation ID",
    description:
      "You can follow leagues, teams, players, coaches, or matches whether you are registered or not. If you are registered, your follow data is saved with your account. If you are not registered, your follow data is saved against a unique device or app installation ID so your followed items can still work without creating an account.",
  },
  {
    title: "4. Notifications",
    description:
      "KICSCORE may send push notifications and in-app notifications for followed matches, teams, leagues, players, coaches, football updates, and news. News notifications may be enabled by default, but you can turn off news notifications, match alerts, team alerts, league alerts, player alerts, push notifications, and in-app notifications from the settings page.",
  },
  {
    title: "5. Football Content and Usage Data",
    description:
      "To provide live scores and football information, we may process the leagues, teams, matches, players, coaches, news, pages, and features you view or interact with. This helps us show relevant content, maintain your following list, improve search, troubleshoot issues, and keep the service reliable.",
  },
  {
    title: "6. How We Use Your Information",
    description:
      "We use your information to create and manage accounts, keep users signed in, save follow preferences, deliver live score updates and notifications, show football news, improve product performance, protect the service from misuse, and provide customer support.",
  },
  {
    title: "7. Registered and Non-Registered Users",
    description:
      "Registered and non-registered users can use the main follow and notification features. The main difference is that registered users have follow data linked to their account, while non-registered users have follow data linked to the unique installation ID used by the website or app.",
  },
  {
    title: "8. Cookies and Local Storage",
    description:
      "On the website, we may use cookies or local storage to keep authentication, theme, installation ID, follow, and preference data available across sessions. These technologies help the website remember your choices and provide a consistent experience.",
  },
  {
    title: "9. Data Sharing",
    description:
      "We do not sell your personal information. We may share limited information with trusted service providers only when needed to operate KICSCORE, such as hosting, analytics, file storage, authentication, football data, push notification delivery, security, and support services.",
  },
  {
    title: "10. Data Retention",
    description:
      "We keep account, follow, notification, and installation data for as long as needed to provide the service, comply with legal requirements, resolve disputes, protect the platform, or until you delete your account or request deletion where applicable.",
  },
  {
    title: "11. Your Choices and Rights",
    description:
      "You can update your profile, unfollow entities, change notification settings, turn off notification categories, and request account or data deletion where applicable. You can also control push notification permissions from your browser or Android device settings.",
  },
  {
    title: "12. Security",
    description:
      "We use reasonable technical and organizational measures to protect your information. However, no online service can guarantee absolute security, so you should keep your login credentials safe and contact us if you believe your account has been misused.",
  },
  {
    title: "13. Changes to This Policy",
    description:
      "We may update this privacy policy when we change our features, data practices, or legal requirements. The latest version will always show the updated date on this page.",
  },
];

const PrivacyPolicyPage = () => {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="May 31, 2026"
      sections={privacySections}
      showContact
      contactText="If you have questions about this privacy policy or want to make a data request, please contact our support team at:"
    />
  );
};

export default PrivacyPolicyPage;
