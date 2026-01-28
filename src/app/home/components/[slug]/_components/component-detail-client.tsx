"use client";

/**
 * Component Detail Client
 *
 * Client-side component that renders the full component detail view.
 * Separated from the page to keep server component benefits while
 * enabling client interactivity for previews and code copying.
 */

import { getComponentMeta } from "../../_registry/metadata";
import { CodeBlock } from "../../_components/code-block";
import {
  ComponentDetailLayout,
  DetailSection,
  PreviewContainer,
  InfoCard,
  AnimationIcon,
  PerformanceIcon,
  AccessibilityIcon,
} from "../../_components/component-detail-layout";

interface ComponentDetailClientProps {
  slug: string;
}

export function ComponentDetailClient({ slug }: ComponentDetailClientProps) {
  const meta = getComponentMeta(slug);

  if (!meta) {
    return (
      <div className="px-4 sm:px-12 py-12">
        <p className="text-muted-foreground">Component metadata not found.</p>
      </div>
    );
  }

  return (
    <ComponentDetailLayout
      title={meta.title}
      description={meta.description}
      tags={meta.tags}
    >
      {/* Live Preview */}
      <DetailSection title="Live Preview">
        <PreviewContainer>{meta.preview}</PreviewContainer>
      </DetailSection>

      {/* Usage Example */}
      <DetailSection title="Usage">
        <CodeBlock
          code={meta.usage}
          language="tsx"
          title="example.tsx"
          showLineNumbers={false}
        />
      </DetailSection>

      {/* Full Source Code */}
      <DetailSection title="Source Code">
        <CodeBlock code={meta.code} language="tsx" title={`${slug}.tsx`} />
      </DetailSection>

      {/* Technical Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <InfoCard icon={<AnimationIcon />} title="Animation Breakdown">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <FormattedNotes content={meta.animationNotes} />
          </div>
        </InfoCard>

        <InfoCard icon={<PerformanceIcon />} title="Performance Notes">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <FormattedNotes content={meta.performanceNotes} />
          </div>
        </InfoCard>
      </div>

      {/* Accessibility Notes (if provided) */}
      {meta.accessibilityNotes && (
        <div className="mb-12">
          <InfoCard
            icon={<AccessibilityIcon />}
            title="Accessibility Considerations"
          >
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <FormattedNotes content={meta.accessibilityNotes} />
            </div>
          </InfoCard>
        </div>
      )}

      {/* Navigation to other components */}
      <NavigationFooter currentSlug={slug} />
    </ComponentDetailLayout>
  );
}

/**
 * Simple markdown-like formatter for notes content.
 * Handles bold text, code blocks, and line breaks.
 */
function FormattedNotes({ content }: { content: string }) {
  // Split into paragraphs
  const paragraphs = content.split("\n\n");

  return (
    <>
      {paragraphs.map((paragraph, index) => {
        // Check if it's a code block
        if (paragraph.startsWith("```")) {
          const code = paragraph.replace(/```\w*\n?/g, "").trim();
          return (
            <pre
              key={index}
              className="bg-muted p-3 rounded-md text-xs overflow-x-auto my-3"
            >
              <code>{code}</code>
            </pre>
          );
        }

        // Handle headers (lines starting with **)
        if (paragraph.startsWith("**") && paragraph.includes(":**")) {
          const [header, ...rest] = paragraph.split(":**");
          return (
            <div key={index} className="my-3">
              <strong className="block text-foreground mb-1">
                {header.replace(/\*\*/g, "")}:
              </strong>
              <span>{formatInlineElements(rest.join(":**"))}</span>
            </div>
          );
        }

        // Handle list items
        if (paragraph.includes("\n-") || paragraph.startsWith("-")) {
          const lines = paragraph.split("\n");
          const listItems = lines.filter((line) => line.startsWith("-"));
          const nonListContent = lines.filter((line) => !line.startsWith("-"));

          return (
            <div key={index} className="my-3">
              {nonListContent.length > 0 && (
                <p className="mb-2">
                  {formatInlineElements(nonListContent.join(" "))}
                </p>
              )}
              <ul className="list-disc list-inside space-y-1">
                {listItems.map((item, i) => (
                  <li key={i}>
                    {formatInlineElements(item.replace(/^-\s*/, ""))}
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        // Regular paragraph with inline formatting
        return (
          <p key={index} className="my-2">
            {formatInlineElements(paragraph)}
          </p>
        );
      })}
    </>
  );
}

/**
 * Format inline elements like bold and code
 */
function formatInlineElements(text: string): React.ReactNode {
  // Split by ** for bold and ` for code
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Check for bold
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    // Check for inline code
    const codeMatch = remaining.match(/`([^`]+)`/);

    if (boldMatch && (!codeMatch || boldMatch.index! <= codeMatch.index!)) {
      // Add text before bold
      if (boldMatch.index! > 0) {
        parts.push(remaining.slice(0, boldMatch.index));
      }
      // Add bold text
      parts.push(<strong key={key++}>{boldMatch[1]}</strong>);
      remaining = remaining.slice(boldMatch.index! + boldMatch[0].length);
    } else if (codeMatch) {
      // Add text before code
      if (codeMatch.index! > 0) {
        parts.push(remaining.slice(0, codeMatch.index));
      }
      // Add code
      parts.push(
        <code key={key++} className="bg-muted px-1.5 py-0.5 rounded text-xs">
          {codeMatch[1]}
        </code>,
      );
      remaining = remaining.slice(codeMatch.index! + codeMatch[0].length);
    } else {
      // No more matches, add remaining text
      parts.push(remaining);
      break;
    }
  }

  return parts;
}

/**
 * Footer navigation to browse other components
 */
function NavigationFooter({ currentSlug }: { currentSlug: string }) {
  const { componentRegistry } = require("../../_registry");
  const currentIndex = componentRegistry.findIndex(
    (c: { slug: string }) => c.slug === currentSlug,
  );
  const prevComponent = componentRegistry[currentIndex - 1];
  const nextComponent = componentRegistry[currentIndex + 1];

  return (
    <div className="border-t pt-8 mt-8">
      <div className="flex justify-between items-center">
        {prevComponent ? (
          <a
            href={`/components/${prevComponent.slug}`}
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeftIcon className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>{prevComponent.title}</span>
          </a>
        ) : (
          <div />
        )}

        {nextComponent ? (
          <a
            href={`/components/${nextComponent.slug}`}
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>{nextComponent.title}</span>
            <ChevronRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}
