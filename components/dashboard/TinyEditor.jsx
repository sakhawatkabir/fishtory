"use client";
import { Editor } from "@tinymce/tinymce-react";

export default function TinyEditor({ value, onChange }) {
  return (
    <Editor
      tinymceScriptSrc="https://cdn.jsdelivr.net/npm/tinymce@7/tinymce.min.js"
      value={value}
      onEditorChange={(content) => onChange(content)}
      init={{
        height: 280,
        menubar: false,
        branding: false,
        promotion: false,
        resize: false,
        skin: "oxide",
        content_css: "default",
        plugins: [
          "lists",
          "link",
          "autolink",
          "wordcount",
        ],
        toolbar:
          "blocks | bold italic underline strikethrough | " +
          "bullist numlist | blockquote link | removeformat",
        block_formats: "Paragraph=p; Heading 2=h2; Heading 3=h3",
        placeholder: "Describe the product — freshness, origin, serving suggestions…",
        content_style: `
          body {
            font-family: ui-sans-serif, system-ui, sans-serif;
            font-size: 14px;
            color: #374151;
            padding: 8px 12px;
            margin: 0;
          }
          p { margin: 0 0 0.5em; }
        `,
      }}
    />
  );
}
