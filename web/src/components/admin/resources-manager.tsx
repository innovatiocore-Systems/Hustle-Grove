"use client";

import * as React from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Loader2,
  BookOpen,
  Star,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import {
  listArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  type ArticleRow,
  type ArticleInput,
} from "@/lib/articles/api";
import { updateResourcesVisibility } from "@/lib/settings/api";
import { revalidateArticles } from "@/lib/articles/actions";
import { revalidateSiteSettings } from "@/lib/settings/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { EmptyState, ErrorState } from "@/components/states/states";

const CATEGORIES = ["Productivity", "Workplace", "Startups", "Remote Work"] as const;

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const today = new Date().toLocaleDateString("en-AU", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const EMPTY_FORM: ArticleInput = {
  slug: "",
  title: "",
  category: "Workplace",
  excerpt: "",
  content: [],
  author_name: "",
  author_role: "",
  author_avatar: "",
  date: today,
  read_time: "5 min read",
  image: "",
  featured: false,
  published: true,
};

export function ResourcesManager({
  initialResourcesVisible = true,
}: {
  initialResourcesVisible?: boolean;
}) {
  const [resourcesVisible, setResourcesVisible] = React.useState(initialResourcesVisible);
  const [togglingVisibility, setTogglingVisibility] = React.useState(false);
  const [articles, setArticles] = React.useState<ArticleRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [query, setQuery] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<ArticleRow | null>(null);
  const [form, setForm] = React.useState<ArticleInput>(EMPTY_FORM);
  const [contentText, setContentText] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<ArticleRow | null>(null);
  const [deleting, setDeleting] = React.useState(false);
  const [slugManual, setSlugManual] = React.useState(false);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setArticles(await listArticles());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  async function handleToggleVisibility() {
    setTogglingVisibility(true);
    try {
      const next = !resourcesVisible;
      const result = await updateResourcesVisibility(next);
      if (!result.ok) throw new Error(result.message);
      setResourcesVisible(next);
      await revalidateSiteSettings();
      toast.success(next ? "Resources section is now visible." : "Resources section is now hidden.");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setTogglingVisibility(false);
    }
  }

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter((a) =>
      [a.title, a.category, a.author_name].some((v) =>
        v.toLowerCase().includes(q)
      )
    );
  }, [articles, query]);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setContentText("");
    setSlugManual(false);
    setModalOpen(true);
  }

  function openEdit(a: ArticleRow) {
    setEditing(a);
    setForm({
      slug: a.slug,
      title: a.title,
      category: a.category,
      excerpt: a.excerpt,
      content: a.content,
      author_name: a.author_name,
      author_role: a.author_role,
      author_avatar: a.author_avatar,
      date: a.date,
      read_time: a.read_time,
      image: a.image,
      featured: a.featured,
      published: a.published,
    });
    setContentText(a.content.join("\n\n"));
    setSlugManual(true);
    setModalOpen(true);
  }

  function set<K extends keyof ArticleInput>(k: K, v: ArticleInput[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onTitleChange(v: string) {
    set("title", v);
    if (!slugManual) set("slug", slugify(v));
  }

  async function onSave() {
    if (!form.title.trim() || !form.slug.trim()) {
      toast.error("Title and slug are required.");
      return;
    }
    setSaving(true);
    try {
      const paragraphs = contentText
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean);
      const payload: ArticleInput = { ...form, content: paragraphs };

      if (editing) {
        const updated = await updateArticle(editing.id, payload);
        setArticles((prev) =>
          prev.map((a) => (a.id === updated.id ? updated : a))
        );
        toast.success("Article updated.");
      } else {
        const created = await createArticle(payload);
        setArticles((prev) => [created, ...prev]);
        toast.success("Article created.");
      }
      await revalidateArticles();
      setModalOpen(false);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteArticle(deleteTarget.id);
      setArticles((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      await revalidateArticles();
      toast.success("Article deleted.");
      setDeleteTarget(null);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setDeleting(false);
    }
  }

  async function togglePublished(a: ArticleRow) {
    try {
      const updated = await updateArticle(a.id, { published: !a.published });
      setArticles((prev) =>
        prev.map((x) => (x.id === updated.id ? updated : x))
      );
      await revalidateArticles();
      toast.success(
        updated.published ? "Article published." : "Article unpublished."
      );
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  return (
    <div className="space-y-6">
      {/* Visibility toggle */}
      <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card px-6 py-5">
        <div>
          <p className="font-semibold text-foreground">Resources visibility</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {resourcesVisible
              ? "Resources are visible on the website — navbar, footer, and all pages."
              : "Resources are hidden from the website. Direct URLs redirect to home."}
          </p>
        </div>
        <button
          onClick={handleToggleVisibility}
          disabled={togglingVisibility}
          className={cn(
            "relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            resourcesVisible ? "bg-primary" : "bg-muted"
          )}
          role="switch"
          aria-checked={resourcesVisible}
          aria-label="Toggle resources visibility"
        >
          {togglingVisibility ? (
            <Loader2 className="absolute left-1/2 size-4 -translate-x-1/2 animate-spin text-white" />
          ) : (
            <span
              className={cn(
                "pointer-events-none block size-5 rounded-full bg-white shadow-lg transition-transform",
                resourcesVisible ? "translate-x-5" : "translate-x-0"
              )}
            />
          )}
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">Resources</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {articles.length} article{articles.length !== 1 ? "s" : ""} ·{" "}
            {articles.filter((a) => a.published).length} published
          </p>
        </div>
        <Button onClick={openCreate} className="gap-2 self-start">
          <Plus className="size-4" />
          New article
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title, category, author…"
          className="h-11 w-full rounded-xl border border-input bg-card pl-10 pr-4 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-7 animate-spin text-primary" />
        </div>
      ) : error ? (
        <ErrorState description={error} onRetry={load} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="size-6 text-muted-foreground" />}
          title={query ? "No articles match" : "No articles yet"}
          description={
            query
              ? "Try a different search term."
              : "Create your first article to get started."
          }
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Featured</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="w-24" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="max-w-xs">
                    <p className="truncate font-medium text-foreground">
                      {a.title}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      /resources/{a.slug}
                    </p>
                  </TableCell>
                  <TableCell>
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      {a.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {a.author_name}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {a.date}
                  </TableCell>
                  <TableCell className="text-center">
                    {a.featured && (
                      <Star className="mx-auto size-4 fill-amber-400 text-amber-400" />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <button
                      onClick={() => togglePublished(a)}
                      title={a.published ? "Click to unpublish" : "Click to publish"}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
                        a.published
                          ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {a.published ? (
                        <Eye className="size-3" />
                      ) : (
                        <EyeOff className="size-3" />
                      )}
                      {a.published ? "Live" : "Draft"}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(a)}
                        className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        title="Edit"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(a)}
                        className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                        title="Delete"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create / Edit modal */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className="max-w-2xl"
        align="top"
      >
        <DialogHeader
          title={editing ? "Edit article" : "New article"}
          description={
            editing
              ? "Update the article details below."
              : "Fill in the details to publish a new article."
          }
          onClose={() => setModalOpen(false)}
        />

        <div className="max-h-[65vh] overflow-y-auto px-6 py-5">
          <div className="space-y-5">
            {/* Title */}
            <div>
              <Label htmlFor="a-title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="a-title"
                className="mt-1.5"
                value={form.title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="How to design your week for deep work"
              />
            </div>

            {/* Slug */}
            <div>
              <Label htmlFor="a-slug">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                id="a-slug"
                className="mt-1.5 font-mono text-sm"
                value={form.slug}
                onChange={(e) => {
                  setSlugManual(true);
                  set("slug", slugify(e.target.value));
                }}
                placeholder="how-to-design-your-week"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                /resources/{form.slug || "…"}
              </p>
            </div>

            {/* Category + Date + Read time */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="a-cat">Category</Label>
                <select
                  id="a-cat"
                  className="mt-1.5 h-10 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="a-date">Date</Label>
                <Input
                  id="a-date"
                  className="mt-1.5"
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                  placeholder="Jun 25, 2026"
                />
              </div>
              <div>
                <Label htmlFor="a-rt">Read time</Label>
                <Input
                  id="a-rt"
                  className="mt-1.5"
                  value={form.read_time}
                  onChange={(e) => set("read_time", e.target.value)}
                  placeholder="5 min read"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <Label htmlFor="a-excerpt">Excerpt</Label>
              <textarea
                id="a-excerpt"
                rows={2}
                className="mt-1.5 w-full resize-none rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
                value={form.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                placeholder="A short description shown in the article card…"
              />
            </div>

            {/* Content */}
            <div>
              <Label htmlFor="a-content">Content</Label>
              <p className="mb-1.5 text-xs text-muted-foreground">
                Separate paragraphs with a blank line.
              </p>
              <textarea
                id="a-content"
                rows={8}
                className="w-full resize-y rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
                value={contentText}
                onChange={(e) => setContentText(e.target.value)}
                placeholder={"First paragraph here.\n\nSecond paragraph here.\n\nAnd so on…"}
              />
            </div>

            {/* Cover image */}
            <div>
              <Label htmlFor="a-img">Cover image URL</Label>
              <Input
                id="a-img"
                className="mt-1.5"
                value={form.image}
                onChange={(e) => set("image", e.target.value)}
                placeholder="https://images.unsplash.com/…"
              />
              {form.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.image}
                  alt=""
                  className="mt-2 h-28 w-full rounded-xl object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
            </div>

            {/* Author */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="a-an">Author name</Label>
                <Input
                  id="a-an"
                  className="mt-1.5"
                  value={form.author_name}
                  onChange={(e) => set("author_name", e.target.value)}
                  placeholder="Sofia Alvarez"
                />
              </div>
              <div>
                <Label htmlFor="a-ar">Author role</Label>
                <Input
                  id="a-ar"
                  className="mt-1.5"
                  value={form.author_role}
                  onChange={(e) => set("author_role", e.target.value)}
                  placeholder="CEO, Hustle Grove"
                />
              </div>
              <div>
                <Label htmlFor="a-av">Author avatar URL</Label>
                <Input
                  id="a-av"
                  className="mt-1.5"
                  value={form.author_avatar}
                  onChange={(e) => set("author_avatar", e.target.value)}
                  placeholder="https://…"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="flex gap-6">
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  className="size-4 rounded accent-primary"
                  checked={form.featured}
                  onChange={(e) => set("featured", e.target.checked)}
                />
                <span className="text-sm font-medium text-foreground">
                  Featured
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  className="size-4 rounded accent-primary"
                  checked={form.published}
                  onChange={(e) => set("published", e.target.checked)}
                />
                <span className="text-sm font-medium text-foreground">
                  Published
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-border/70 p-6">
          <Button
            variant="outline"
            onClick={() => setModalOpen(false)}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button onClick={onSave} disabled={saving} className="gap-2">
            {saving && <Loader2 className="size-4 animate-spin" />}
            {editing ? "Save changes" : "Publish article"}
          </Button>
        </div>
      </Dialog>

      {/* Delete confirm */}
      <Dialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        className="max-w-sm"
      >
        <div className="p-6">
          <h2 className="font-display text-lg font-bold text-foreground">
            Delete article?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              &ldquo;{deleteTarget?.title}&rdquo;
            </span>{" "}
            will be permanently removed and the URL will stop working.
          </p>
          <div className="mt-6 flex gap-3">
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              disabled={deleting}
              className="flex-1"
            >
              Cancel
            </Button>
            <button
              onClick={onDelete}
              disabled={deleting}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:pointer-events-none disabled:opacity-50"
            >
              {deleting && <Loader2 className="size-4 animate-spin" />}
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
