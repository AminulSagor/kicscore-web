import LegalPage from "@/app/public/(pages)/_components/legal-page";

const accountDeletionSections = [
  {
    title: "1. How to Delete Your Account",
    description:
      "If you want to delete your KICSCORE account, go to Profile Settings and open the Danger Zone section. From there, choose Delete Account, confirm the action, and follow the on-screen prompts to complete the request.",
  },
  {
    title: "2. Confirmation Required",
    description:
      "For security, the app asks you to confirm the deletion before it proceeds. This helps make sure account removal is intentional and prevents accidental deletions.",
    highlight:
      "Delete Account from Profile Settings > Danger Zone, then confirm the action to submit the request.",
  },
  {
    title: "3. What Happens After Deletion",
    description:
      "Once your account is deleted, you will be logged out and your account data will no longer be available in the app. Saved preferences and account-linked information are removed according to our service rules and retention requirements.",
  },
  {
    title: "4. Before You Delete",
    description:
      "Please review your followed teams, leagues, players, and notification settings before deleting your account. If you only want to stop notifications or unfollow content, you can do that without deleting your account.",
  },
  {
    title: "5. Need Help?",
    description:
      "If you are unable to access your account settings or need help with the deletion process, contact our support team and we will guide you through the next steps.",
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
    />
  );
};

export default AccountDeletionPage;