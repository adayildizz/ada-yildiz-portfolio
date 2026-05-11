"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { supabase, type Note } from "@/lib/supabase";

function formatDate(iso: string) {
  return new Date(iso).toISOString().slice(0, 10);
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filtered, setFiltered] = useState<Note[]>([]);
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      setNotes(data);
      setFiltered(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    let result = showAll ? notes : notes.filter((n) => n.is_public);
    if (query) {
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(query.toLowerCase()) ||
          n.content.toLowerCase().includes(query.toLowerCase()) ||
          n.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      );
    }
    if (selectedTag) {
      result = result.filter((n) => n.tags.includes(selectedTag));
    }
    setFiltered(result);
  }, [notes, query, selectedTag, showAll]);

  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags)));

  const openNew = () => {
    setEditing(null);
    setTitle("");
    setContent("");
    setTags("");
    setIsPublic(false);
    setPreview(false);
    setEditorOpen(true);
  };

  const openEdit = (note: Note) => {
    setEditing(note);
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags.join(", "));
    setIsPublic(note.is_public);
    setPreview(false);
    setEditorOpen(true);
  };

  const saveNote = async () => {
    if (!title.trim() || !content.trim()) return;
    setSaving(true);
    const parsedTags = tags.split(",").map((t) => t.trim()).filter(Boolean);

    if (editing) {
      await supabase
        .from("notes")
        .update({ title, content, tags: parsedTags, is_public: isPublic, updated_at: new Date().toISOString() })
        .eq("id", editing.id);
    } else {
      await supabase
        .from("notes")
        .insert({ title, content, tags: parsedTags, is_public: isPublic });
    }

    await fetchNotes();
    setSaving(false);
    setEditorOpen(false);
  };

  const deleteNote = async (id: string) => {
    if (!confirm("delete?")) return;
    await supabase.from("notes").delete().eq("id", id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const markdownComponents = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    code({ inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>{children}</code>
      );
    },
  };

  return (
    <main
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        paddingTop: "8rem",
        paddingBottom: "4rem",
        paddingLeft: "clamp(1.5rem, 5vw, 4rem)",
        paddingRight: "clamp(1.5rem, 5vw, 4rem)",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "3rem",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "1.5rem",
        }}
      >
        <div>
          <p style={{ fontSize: "0.7rem", color: "var(--dim)", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
            NOTES
          </p>
          <h1 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 400, color: "var(--text)" }}>
            Lab notebook
          </h1>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button
            onClick={() => setShowAll(!showAll)}
            style={{
              fontSize: "0.65rem",
              color: showAll ? "var(--dim)" : "var(--amber)",
              background: "none",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.05em",
              fontFamily: "inherit",
            }}
          >
            {showAll ? "all" : "public"}
          </button>
          <button
            onClick={openNew}
            style={{
              fontSize: "0.75rem",
              color: "var(--amber)",
              background: "none",
              border: "1px solid var(--amber)",
              padding: "0.4rem 0.9rem",
              cursor: "pointer",
              letterSpacing: "0.05em",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--amber)"; e.currentTarget.style.color = "var(--bg)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--amber)"; }}
          >
            + new
          </button>
        </div>
      </header>

      {/* Search + tags */}
      <div style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            background: "none",
            border: "none",
            borderBottom: "1px solid var(--border)",
            padding: "0.5rem 0",
            color: "var(--text)",
            fontSize: "0.8rem",
            letterSpacing: "0.03em",
            outline: "none",
            marginBottom: "1rem",
            fontFamily: "inherit",
          }}
        />
        {allTags.length > 0 && (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              onClick={() => setSelectedTag(null)}
              style={{ fontSize: "0.65rem", background: "none", border: "none", cursor: "pointer", color: selectedTag === null ? "var(--amber)" : "var(--dim)", padding: 0, fontFamily: "inherit", letterSpacing: "0.05em" }}
            >
              all
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                style={{ fontSize: "0.65rem", background: "none", border: "none", cursor: "pointer", color: selectedTag === tag ? "var(--amber)" : "var(--dim)", padding: 0, fontFamily: "inherit", letterSpacing: "0.05em" }}
              >
                [{tag}]
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Notes list */}
      {loading ? (
        <div style={{ color: "var(--dim)", fontSize: "0.75rem" }}>loading...</div>
      ) : filtered.length === 0 ? (
        <div style={{ paddingTop: "4rem", textAlign: "center", color: "var(--dim)", fontSize: "0.8rem" }}>
          {notes.length === 0 ? "no entries yet." : "no results."}
        </div>
      ) : (
        <div>
          {filtered.map((note) => {
            const isExpanded = expanded === note.id;
            return (
              <article key={note.id} style={{ borderBottom: "1px solid var(--border)", padding: "1.25rem 0" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.25rem", cursor: "pointer" }}
                  onClick={() => setExpanded(isExpanded ? null : note.id)}
                >
                  <span style={{ fontSize: "0.65rem", color: "var(--dim)", flexShrink: 0 }}>
                    {isExpanded ? "▾" : "▸"}
                  </span>
                  <h2 style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text)", flex: 1 }}>
                    {note.title}
                  </h2>
                  {note.is_public && (
                    <span style={{ fontSize: "0.6rem", color: "var(--amber)", letterSpacing: "0.05em", flexShrink: 0 }}>
                      public
                    </span>
                  )}
                  <span style={{ fontSize: "0.65rem", color: "var(--dim)", flexShrink: 0 }}>
                    {formatDate(note.created_at)}
                  </span>
                </div>

                {note.tags.length > 0 && (
                  <div style={{ paddingLeft: "1.5rem", display: "flex", gap: "0.5rem", marginBottom: isExpanded ? "1rem" : 0 }}>
                    {note.tags.map((tag) => (
                      <span key={tag} style={{ fontSize: "0.6rem", color: "var(--amber)", letterSpacing: "0.05em" }}>
                        [{tag}]
                      </span>
                    ))}
                  </div>
                )}

                {isExpanded && (
                  <div style={{ paddingLeft: "1.5rem" }}>
                    <div className="prose" style={{ marginBottom: "1rem" }}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                        {note.content}
                      </ReactMarkdown>
                    </div>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <button
                        onClick={() => openEdit(note)}
                        style={{ fontSize: "0.65rem", color: "var(--dim)", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit", letterSpacing: "0.05em" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}
                      >
                        edit
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        style={{ fontSize: "0.65rem", color: "var(--dim)", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit", letterSpacing: "0.05em" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#c0392b")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* Editor modal */}
      {editorOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(10,10,10,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "760px",
              height: "85vh",
              border: "1px solid var(--border)",
              background: "var(--bg)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 1.5rem",
                borderBottom: "1px solid var(--border)",
                fontSize: "0.75rem",
                color: "var(--dim)",
              }}
            >
              <span>{editing ? "edit entry" : "new entry"}</span>
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer", fontSize: "0.7rem" }}>
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    style={{ accentColor: "var(--amber)", width: "12px", height: "12px" }}
                  />
                  <span style={{ color: isPublic ? "var(--amber)" : "var(--dim)" }}>public</span>
                </label>
                <button
                  onClick={() => setPreview(!preview)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: preview ? "var(--amber)" : "var(--dim)", fontSize: "0.7rem", fontFamily: "inherit", letterSpacing: "0.05em" }}
                >
                  {preview ? "edit" : "preview"}
                </button>
                <button
                  onClick={saveNote}
                  disabled={saving}
                  style={{ background: "none", border: "1px solid var(--amber)", color: "var(--amber)", cursor: saving ? "not-allowed" : "pointer", fontSize: "0.7rem", fontFamily: "inherit", letterSpacing: "0.05em", padding: "0.3rem 0.75rem", opacity: saving ? 0.5 : 1 }}
                >
                  {saving ? "saving..." : "save"}
                </button>
                <button
                  onClick={() => setEditorOpen(false)}
                  style={{ background: "none", border: "none", color: "var(--dim)", cursor: "pointer", fontSize: "1rem", fontFamily: "inherit", lineHeight: 1 }}
                >
                  ×
                </button>
              </div>
            </div>

            <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              {preview ? (
                <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
                  <h1 style={{ fontSize: "1.25rem", fontWeight: 500, color: "var(--text)", marginBottom: "1.5rem" }}>
                    {title || "untitled"}
                  </h1>
                  <div className="prose">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                      {content || "*empty*"}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "1.5rem", gap: "1rem" }}>
                  <input
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ background: "none", border: "none", borderBottom: "1px solid var(--border)", padding: "0.5rem 0", color: "var(--text)", fontSize: "1rem", fontFamily: "inherit", outline: "none" }}
                  />
                  <input
                    type="text"
                    placeholder="tags: comma, separated"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    style={{ background: "none", border: "none", borderBottom: "1px solid var(--border)", padding: "0.4rem 0", color: "var(--dim)", fontSize: "0.75rem", fontFamily: "inherit", outline: "none" }}
                  />
                  <textarea
                    placeholder="markdown..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ flex: 1, background: "none", border: "none", color: "var(--text)", fontSize: "0.8rem", fontFamily: "inherit", resize: "none", outline: "none", lineHeight: 1.7 }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
