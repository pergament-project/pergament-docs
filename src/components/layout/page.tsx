import type { ReactNode } from "react";

/** Page shell: a title, optional lead paragraph, and the reading column body. */
export function Page({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <article className="prose-docs">
      <h1 className="mb-3 text-3xl">{title}</h1>
      {lead && <p className="mb-8 max-w-[65ch] text-[17px] leading-relaxed text-muted">{lead}</p>}
      <div className="flex flex-col gap-5 text-[15px] leading-relaxed text-fg">{children}</div>
    </article>
  );
}

/** A short callout box for warnings or notes. */
export function Callout({ tone = "note", children }: { tone?: "note" | "warn"; children: ReactNode }) {
  const border = tone === "warn" ? "border-amber-500/50 bg-amber-500/5" : "border-line bg-bar";
  return <div className={`rounded-lg border px-4 py-3 text-[14px] ${border}`}>{children}</div>;
}