/** Contador de caracteres para textareas con límite. */
export default function CharCount({ value, max }: { value: string; max: number }) {
  const count = value.length;
  const near = count > max * 0.9;
  return (
    <span
      className={`absolute bottom-2 right-3 text-[10px] font-mono pointer-events-none ${
        near ? "text-red-500" : "text-deep-navy/30"
      }`}
    >
      {count}/{max}
    </span>
  );
}
