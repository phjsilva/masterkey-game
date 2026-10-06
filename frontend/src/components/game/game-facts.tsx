export function GameFacts({ items }: { items: [string, string][] }) {
  return (
    <dl>
      {items.map(([label, value]) => (
        <div
          key={label}
          className="border-b border-line py-[13px] text-xs last:border-0"
        >
          <dt className="mb-[7px] text-[10px] text-muted">{label}</dt>
          <dd className="leading-[1.6]">{value || "Não informado"}</dd>
        </div>
      ))}
    </dl>
  );
}
