import { LLMS_MARKDOWN } from "@/lib/agent-content";

export const dynamic = "force-static";

export async function GET() {
  return new Response(LLMS_MARKDOWN, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
