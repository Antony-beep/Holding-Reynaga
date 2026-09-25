export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=61588196065630",
  instagram: "https://www.instagram.com/holdingreynaga/",
  tiktok: "https://www.tiktok.com/@inmobiliariaholding",
} as const;

export type SocialNetwork = keyof typeof SOCIAL_LINKS;

export const NETWORK_LABELS: Record<SocialNetwork, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
};

export function isValidNetwork(value: string): value is SocialNetwork {
  return value === "facebook" || value === "instagram" || value === "tiktok";
}

/** "hace X" a partir de la fecha del post; tolera ISO con 'T' o espacio. */
export function relativeTimeEs(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const iso = dateStr.replace(" ", "T");
  const ms = Date.parse(iso.endsWith("Z") ? iso : `${iso}Z`);
  if (Number.isNaN(ms)) return null;
  const days = Math.floor((Date.now() - ms) / 86_400_000);
  if (days <= 0) return "Hoy";
  if (days === 1) return "Ayer";
  if (days < 14) return `Hace ${days} días`;
  if (days < 60) return `Hace ${Math.floor(days / 7)} semanas`;
  return `Hace ${Math.floor(days / 30)} meses`;
}
