export function formatFcfa(amount: number) {
  if (amount === 0) return "Gratuit";
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}

export function PriceTag({
  price,
  originalPrice,
}: {
  price: number;
  originalPrice?: number;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-heading text-lg font-bold text-brand-primary">
        {formatFcfa(price)}
      </span>
      {originalPrice && (
        <span className="text-sm text-muted-foreground line-through">
          {formatFcfa(originalPrice)}
        </span>
      )}
    </div>
  );
}
