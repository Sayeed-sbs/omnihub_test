type Props = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="text-center space-y-3 mb-16">
      <h2 className="text-4xl font-bold">{title}</h2>

      {subtitle && (
        <p className="text-slate-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}