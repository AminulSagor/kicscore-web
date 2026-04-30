type FixtureDateSeparatorProps = {
  label: string;
};

export default function FixtureDateSeparator({
  label,
}: FixtureDateSeparatorProps) {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="h-px flex-1 bg-[#DDE8E3] dark:bg-white/10" />
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">
        {label}
      </p>
      <div className="h-px flex-1 bg-[#DDE8E3] dark:bg-white/10" />
    </div>
  );
}
