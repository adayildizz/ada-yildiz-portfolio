"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "technicalNotes";

function formatDate(iso: string) {
  return new Date(iso).toISOString().slice(0, 10);
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filtered, setFiltered] = useState<Note[]>([]);
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setNotes(parsed);
      setFiltered(parsed);
    }
  }, []);

  useEffect(() => {
    let result = notes;
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
  }, [notes, query, selectedTag]);

  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags)));

  const save = (updated: Note[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setNotes(updated);
  };

  const openNew = () => {
    setEditing(null);
    setTitle("");
    setContent("");
    setTags("");
    setPreview(false);
    setEditorOpen(true);
  };

  const openEdit = (note: Note) => {
    setEditing(note);
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags.join(", "));
    setPreview(false);
    setEditorOpen(true);
  };

  const saveNote = () => {
    if (!title.trim() || !content.trim()) return;
    const parsedTags = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (editing) {
      save(
        notes.map((n) =>
          n.id === editing.id
            ? { ...n, title, content, tags: parsedTags, updatedAt: new Date().toISOString() }
            : n
        )
      );
    } else {
      save([
        {
          id: Date.now().toString(),
          title,
          content,
          tags: parsedTags,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...notes,
      ]);
    }
    setEditorOpen(false);
  };

  const deleteNote = (id: string) => {
    if (confirm("delete?")) save(notes.filter((n) => n.id !== id));
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
        <code className={className} {...props}>
          {children}
        </code>
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
          <p
            style={{
              fontSize: "0.7rem",
              color: "var(--dim)",
              letterSpacing: "0.1em",
              marginBottom: "0.5rem",
            }}
          >
            NOTES
          </p>
          <h1
            style={{
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              fontWeight: 400,
              color: "var(--text)",
            }}
          >
            Lab notebook
          </h1>
        </div>
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
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--amber)";
            e.currentTarget.style.color = "var(--bg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "none";
            e.currentTarget.style.color = "var(--amber)";
          }}
        >
          + new
        </button>
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
              style={{
                fontSize: "0.65rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: selectedTag === null ? "var(--amber)" : "var(--dim)",
                padding: 0,
                fontFamily: "inherit",
                letterSpacing: "0.05em",
              }}
            >
              all
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                style={{
                  fontSize: "0.65rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: selectedTag === tag ? "var(--amber)" : "var(--dim)",
                  padding: 0,
                  fontFamily: "inherit",
                  letterSpacing: "0.05em",
                }}
              >
                [{tag}]
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Notes list */}
      {filtered.length === 0 ? (
        <div
          style={{
            paddingTop: "4rem",
            textAlign: "center",
            color: "var(--dim)",
            fontSize: "0.8rem",
          }}
        >
          {notes.length === 0 ? "no entries yet." : "no results."}
        </div>
      ) : (
        <div>
          {filtered.map((note) => {
            const isExpanded = expanded === note.id;
            return (
              <article
                key={note.id}
                style={{
                  borderBottom: "1px solid var(--border)",
                  padding: "1.25rem 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "0.25rem",
                    cursor: "pointer",
                  }}
                  onClick={() => setExpanded(isExpanded ? null : note.id)}
                >
                  <span style={{ fontSize: "0.65rem", color: "var(--dim)", flexShrink: 0 }}>
                    {isExpanded ? "▾" : "▸"}
                  </span>
                  <h2
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: "var(--text)",
                      flex: 1,
                    }}
                  >
                    {note.title}
                  </h2>
                  <span style={{ fontSize: "0.65rem", color: "var(--dim)", flexShrink: 0 }}>
                    {formatDate(note.createdAt)}
                  </span>
                </div>

                {note.tags.length > 0 && (
                  <div
                    style={{
                      paddingLeft: "1.5rem",
                      display: "flex",
                      gap: "0.5rem",
                      marginBottom: isExpanded ? "1rem" : 0,
                    }}
                  >
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{ fontSize: "0.6rem", color: "var(--amber)", letterSpacing: "0.05em" }}
                      >
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
                        style={{
                          fontSize: "0.65rem",
                          color: "var(--dim)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          fontFamily: "inherit",
                          letterSpacing: "0.05em",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}
                      >
                        edit
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        style={{
                          fontSize: "0.65rem",
                          color: "var(--dim)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          fontFamily: "inherit",
                          letterSpacing: "0.05em",
                        }}
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
                <button
                  onClick={() => setPreview(!preview)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: preview ? "var(--amber)" : "var(--dim)",
                    fontSize: "0.7rem",
                    fontFamily: "inherit",
                    letterSpacing: "0.05em",
                  }}
                >
                  {preview ? "edit" : "preview"}
                </button>
                <button
                  onClick={saveNote}
                  style={{
                    background: "none",
                    border: "1px solid var(--amber)",
                    color: "var(--amber)",
                    cursor: "pointer",
                    fontSize: "0.7rem",
                    fontFamily: "inherit",
                    letterSpacing: "0.05em",
                    padding: "0.3rem 0.75rem",
                  }}
                >
                  save
                </button>
                <button
                  onClick={() => setEditorOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--dim)",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontFamily: "inherit",
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              {preview ? (
                <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
                  <h1
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 500,
                      color: "var(--text)",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {title || "untitled"}
                  </h1>
                  <div className="prose">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                      {content || "*empty*"}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    padding: "1.5rem",
                    gap: "1rem",
                  }}
                >
                  <input
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                      background: "none",
                      border: "none",
                      borderBottom: "1px solid var(--border)",
                      padding: "0.5rem 0",
                      color: "var(--text)",
                      fontSize: "1rem",
                      fontFamily: "inherit",
                      outline: "none",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="tags: comma, separated"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    style={{
                      background: "none",
                      border: "none",
                      borderBottom: "1px solid var(--border)",
                      padding: "0.4rem 0",
                      color: "var(--dim)",
                      fontSize: "0.75rem",
                      fontFamily: "inherit",
                      outline: "none",
                    }}
                  />
                  <textarea
                    placeholder="markdown..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{
                      flex: 1,
                      background: "none",
                      border: "none",
                      color: "var(--text)",
                      fontSize: "0.8rem",
                      fontFamily: "inherit",
                      resize: "none",
                      outline: "none",
                      lineHeight: 1.7,
                    }}
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
