import LegalPage from "@/app/public/(pages)/_components/legal-page";

const accountDeletionSections = [
  {
    title: "Overview",
    description:
      "We respect your privacy and your right to control your data. You can permanently delete your Kickscore account using the in-app flow or by contacting support. Please read this page carefully — deletion is permanent.",
  },
  {
    title: "Important Notice",
    description:
      "Account deletion is permanent and cannot be undone. After confirmation, personal data is removed from active systems within 30 days. Backups may take up to 30 days to purge.",
  },
  {
    title: "In-App Deletion (Recommended)",
    description:
      "The fastest way to delete your account is from inside the Kickscore app. This verifies your identity and processes deletion automatically.",
    highlight:
      "Steps: Login → Settings → Edit Profile → Scroll to DELETE ACCOUNT → Enter your full name → Click 'Delete permanently'.",
  },
  {
    title: "Email Deletion Request",
    description:
      "If you cannot access the app (lost device, uninstalled, or other issues), request deletion by email. Send a message to our support address with the required details so we can verify your identity and process the request.",
  },
  {
    title: "What To Include In The Email",
    description:
      "Send to hello@kicsore.com with the subject 'Account Deletion Request' and include: your full name, your registered email address, and an optional reason for deletion. We will reply to verify your identity.",
  },
  {
    title: "What Gets Deleted",
    description:
      "When your account is deleted we remove profile information, activity, uploaded media, leaderboard and match history tied to your account, comments, and other personal data. Aggregated anonymized analytics may be retained.",
  },
  {
    title: "Deletion Timeline",
    description:
      "Immediate: Your account is deactivated and you will be signed out. All personal account data is deleted immediately and permanently; we do not preserve personal data tied to the account. We only retain non-personal, aggregated analytics for product insights.",
  },
  {
    title: "What Is Not Deleted",
    description:
      "Platform content that is not tied to your personal identity (for example, generic match data and public articles) remains available. Other users' data is unaffected. Personal account data and activity are not preserved.",
  },
  {
    title: "Alternatives",
    description:
      "If you don't want to delete your account, consider signing out temporarily or adjusting privacy settings to limit exposures without permanent deletion.",
  },
  {
    title: "Need Help?",
    description:
      "If you need assistance with deletion, identity verification, or have other questions, contact support at hello@kicsore.com. We usually respond within 24–48 hours on business days.",
  },
];

const AccountDeletionPage = () => {
  return (
    <LegalPage
      title="Account Deletion"
      lastUpdated="June 1, 2026"
      sections={accountDeletionSections}
      showContact
      contactText="If you need help deleting your account or have questions about the process, please contact our support team at:"
      contactEmail="hello@kicsore.com"
    />
  );
};

export default AccountDeletionPage;