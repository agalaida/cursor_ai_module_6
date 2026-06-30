interface StatItemProps {
  label: string;
  value: number;
}

export function StatItem({ label, value }: StatItemProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xl font-bold text-gray-900 dark:text-white">
        {value.toLocaleString()}
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  );
}
