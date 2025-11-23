"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Plus,
  Search,
  Tag,
  Calendar,
  Lock,
  Unlock,
  Edit2,
  Trash2,
  X,
  Save,
} from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showPrivateNotes, setShowPrivateNotes] = useState(true);

  // Editor state
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editorTitle, setEditorTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [editorTags, setEditorTags] = useState("");
  const [editorIsPublic, setEditorIsPublic] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("technicalNotes");
    if (savedNotes) {
      const parsed = JSON.parse(savedNotes);
      setNotes(parsed);
      setFilteredNotes(parsed);
    }
  }, []);

  // Filter notes based on search and tags
  useEffect(() => {
    let filtered = notes;

    // Filter by privacy
    if (!showPrivateNotes) {
      filtered = filtered.filter((note) => note.isPublic);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Filter by selected tag
    if (selectedTag) {
      filtered = filtered.filter((note) => note.tags.includes(selectedTag));
    }

    setFilteredNotes(filtered);
  }, [notes, searchQuery, selectedTag, showPrivateNotes]);

  // Get all unique tags
  const allTags = Array.from(new Set(notes.flatMap((note) => note.tags)));

  // Save notes to localStorage
  const saveToStorage = (updatedNotes: Note[]) => {
    localStorage.setItem("technicalNotes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  // Open editor for new note
  const openNewNote = () => {
    setEditingNote(null);
    setEditorTitle("");
    setEditorContent("");
    setEditorTags("");
    setEditorIsPublic(false);
    setIsPreview(false);
    setIsEditorOpen(true);
  };

  // Open editor for existing note
  const openEditNote = (note: Note) => {
    setEditingNote(note);
    setEditorTitle(note.title);
    setEditorContent(note.content);
    setEditorTags(note.tags.join(", "));
    setEditorIsPublic(note.isPublic);
    setIsPreview(false);
    setIsEditorOpen(true);
  };

  // Save note
  const saveNote = () => {
    if (!editorTitle.trim() || !editorContent.trim()) {
      alert("Title and content are required!");
      return;
    }

    const tags = editorTags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    if (editingNote) {
      // Update existing note
      const updatedNotes = notes.map((note) =>
        note.id === editingNote.id
          ? {
              ...note,
              title: editorTitle,
              content: editorContent,
              tags,
              isPublic: editorIsPublic,
              updatedAt: new Date().toISOString(),
            }
          : note
      );
      saveToStorage(updatedNotes);
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        title: editorTitle,
        content: editorContent,
        tags,
        isPublic: editorIsPublic,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      saveToStorage([newNote, ...notes]);
    }

    setIsEditorOpen(false);
  };

  // Delete note
  const deleteNote = (id: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      const updatedNotes = notes.filter((note) => note.id !== id);
      saveToStorage(updatedNotes);
    }
  };

  // Toggle note privacy
  const toggleNotePrivacy = (id: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === id
        ? {
            ...note,
            isPublic: !note.isPublic,
            updatedAt: new Date().toISOString(),
          }
        : note
    );
    saveToStorage(updatedNotes);
  };

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-stone-200 to-stone-100 bg-clip-text text-transparent">
                  Technical Notes
                </span>
              </h1>
              <p className="text-lg text-gray-400">
                Daily learnings, experiments, and technical discoveries
              </p>
            </div>

            <button
              onClick={openNewNote}
              className="flex items-center gap-2 px-6 py-3 bg-stone-200 text-black font-medium hover:bg-stone-100 transition-colors duration-300"
            >
              <Plus size={20} />
              New Note
            </button>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="text"
                placeholder="Search notes, tags, content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-stone-200 transition-colors duration-300"
              />
            </div>

            {/* Privacy Toggle */}
            <button
              onClick={() => setShowPrivateNotes(!showPrivateNotes)}
              className={`flex items-center gap-2 px-6 py-3 border transition-all duration-300 ${
                showPrivateNotes
                  ? "border-gray-700 text-gray-300 hover:border-gray-600"
                  : "border-stone-200 text-stone-200"
              }`}
            >
              {showPrivateNotes ? <Unlock size={20} /> : <Lock size={20} />}
              {showPrivateNotes ? "Show All" : "Public Only"}
            </button>
          </div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 text-sm border transition-colors duration-300 ${
                  selectedTag === null
                    ? "border-stone-200 text-stone-200"
                    : "border-gray-700 text-gray-400 hover:border-gray-600"
                }`}
              >
                All Tags
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 text-sm border transition-colors duration-300 ${
                    selectedTag === tag
                      ? "border-stone-200 text-stone-200"
                      : "border-gray-700 text-gray-400 hover:border-gray-600"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Notes List */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📝</div>
              <h3 className="text-2xl font-bold text-gray-400 mb-4">
                {notes.length === 0 ? "No notes yet" : "No notes found"}
              </h3>
              <p className="text-gray-500 mb-8">
                {notes.length === 0
                  ? "Start documenting your learning journey"
                  : "Try adjusting your search or filters"}
              </p>
              {notes.length === 0 && (
                <button
                  onClick={openNewNote}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-stone-200 text-black font-medium hover:bg-stone-100 transition-colors duration-300"
                >
                  <Plus size={20} />
                  Create First Note
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredNotes.map((note) => (
                <article
                  key={note.id}
                  className="group bg-gray-900/30 border border-gray-800/50 hover:border-gray-700 transition-all duration-300 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white group-hover:text-stone-200 transition-colors duration-300">
                          {note.title}
                        </h3>
                        {note.isPublic ? (
                          <Unlock size={16} className="text-stone-200" />
                        ) : (
                          <Lock size={16} className="text-gray-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(note.createdAt).toLocaleDateString()}
                        </span>
                        {note.tags.length > 0 && (
                          <div className="flex items-center gap-2">
                            <Tag size={14} />
                            {note.tags.map((tag) => (
                              <span key={tag} className="text-stone-200">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleNotePrivacy(note.id)}
                        className="p-2 text-gray-400 hover:text-stone-200 transition-colors duration-300"
                        title={note.isPublic ? "Make Private" : "Make Public"}
                      >
                        {note.isPublic ? (
                          <Unlock size={18} />
                        ) : (
                          <Lock size={18} />
                        )}
                      </button>
                      <button
                        onClick={() => openEditNote(note)}
                        className="p-2 text-gray-400 hover:text-stone-200 transition-colors duration-300"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-300"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="prose prose-invert prose-teal max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({
                          node,
                          inline,
                          className,
                          children,
                          ...props
                        }: any) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {note.content.length > 300
                        ? note.content.substring(0, 300) + "..."
                        : note.content}
                    </ReactMarkdown>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Editor Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-6xl h-[90vh] bg-gray-900 border border-gray-800 flex flex-col">
            {/* Editor Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white">
                {editingNote ? "Edit Note" : "New Note"}
              </h2>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editorIsPublic}
                    onChange={(e) => setEditorIsPublic(e.target.checked)}
                    className="w-4 h-4"
                  />
                  {editorIsPublic ? (
                    <>
                      <Unlock size={18} className="text-stone-200" />
                      <span>Public</span>
                    </>
                  ) : (
                    <>
                      <Lock size={18} className="text-gray-500" />
                      <span>Private</span>
                    </>
                  )}
                </label>
                <button
                  onClick={() => setIsPreview(!isPreview)}
                  className="px-4 py-2 border border-gray-700 text-gray-300 hover:border-gray-600 transition-colors duration-300"
                >
                  {isPreview ? "Edit" : "Preview"}
                </button>
                <button
                  onClick={saveNote}
                  className="flex items-center gap-2 px-6 py-2 bg-stone-200 text-black font-medium hover:bg-stone-100 transition-colors duration-300"
                >
                  <Save size={18} />
                  Save
                </button>
                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Editor Body */}
            <div className="flex-1 overflow-hidden">
              {isPreview ? (
                <div className="h-full overflow-y-auto p-6">
                  <h1 className="text-4xl font-bold mb-6 text-white">
                    {editorTitle || "Untitled"}
                  </h1>
                  <div className="prose prose-invert prose-teal max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({
                          node,
                          inline,
                          className,
                          children,
                          ...props
                        }: any) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {editorContent || "*No content yet*"}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col p-6 gap-4">
                  <input
                    type="text"
                    placeholder="Note title..."
                    value={editorTitle}
                    onChange={(e) => setEditorTitle(e.target.value)}
                    className="text-3xl font-bold bg-transparent border-none text-white placeholder-gray-600 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Tags (comma separated): react, threejs, ai"
                    value={editorTags}
                    onChange={(e) => setEditorTags(e.target.value)}
                    className="text-sm bg-transparent border border-gray-800 px-4 py-2 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-stone-200 transition-colors duration-300"
                  />
                  <textarea
                    placeholder="Write your note in Markdown...

Example:
# Heading
**bold** *italic* `code`

```javascript
const hello = 'world';
```

- List item
- Another item"
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                    className="flex-1 bg-transparent border border-gray-800 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-stone-200 transition-colors duration-300 resize-none font-mono"
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
