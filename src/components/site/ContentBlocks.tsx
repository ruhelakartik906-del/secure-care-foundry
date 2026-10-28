import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import type { ContentBlock, RichText } from "@/data/content-blocks";

function Rich({ parts }: { parts: RichText }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <span key={i}>{part}</span>
        ) : (
          <Link key={i} to={part.to as "/products"}>{part.label}</Link>
        ),
      )}
    </>
  );
}

/** Renders company-supplied verbatim sections inside a .prose-unicare article. */
export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "h2":
            return <h2 key={i}>{block.text}</h2>;
          case "h3":
            return <h3 key={i}>{block.text}</h3>;
          case "p":
            return <p key={i}><Rich parts={block.text} /></p>;
          case "ul":
            return <ul key={i}>{block.items.map((item, j) => <li key={j}><Rich parts={item} /></li>)}</ul>;
          case "ol":
            return <ol key={i}>{block.items.map((item, j) => <li key={j}><Rich parts={item} /></li>)}</ol>;
          case "table":
            return (
              <div key={i} className="mb-6 w-full max-w-full overflow-x-auto">
                <table className="min-w-full border border-border text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {block.head.map((cell, j) => <th key={j} className="bg-muted p-3 text-left font-semibold">{cell}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className="border-b border-border">
                        {row.map((cell, k) => (k === 0 ? <th key={k} className="bg-muted p-3 text-left font-semibold">{cell}</th> : <td key={k} className="p-3 text-muted-foreground">{cell}</td>))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "quote-cta":
            return (
              <div key={i} className="not-prose mt-6">
                <Button asChild size="lg" className="rounded-sm"><Link to="/get-a-quote">Get a Quote</Link></Button>
              </div>
            );
        }
      })}
    </>
  );
}
