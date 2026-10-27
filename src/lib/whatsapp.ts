/** Build a wa.me click-to-chat URL, optionally prefilled with a message. */
export function buildWhatsAppHref(number: string, message?: string) {
  const base = `https://wa.me/${number.replace(/\D/g, "")}`;
  const text = message?.trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
