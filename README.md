# readme-forge 🧰

> A visual, drag-and-drop builder for beautiful GitHub README files.

🔗 **[Live Demo](https://dinakars777.github.io/readme-forge/)**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev)

Stop wrestling with Markdown syntax. `readme-forge` gives you a clean block-based editor on the left and a live GitHub-flavored preview on the right.

---

## Features

- ✨ **Block-Based Editing** — build your README from 10 structured blocks: Title, Badges, Description, TOC, Features, Installation, Usage, Tech Stack, Contributing, License
- 🎨 **Template Presets** — start with pre-configured templates for CLI tools, React libraries, or APIs
- 🏷️ **Smart Badges** — add npm, license, downloads, and build status badges with one click
- 🛠️ **Tech Stack Selector** — choose from 13 popular technologies with auto-generated badges
- 🔄 **Real-Time Preview** — powered by `react-markdown` to simulate exactly how GitHub renders your file
- 🏗️ **Drag to Reorder** — rearrange sections with up/down buttons
- 💾 **1-Click Export** — copy raw Markdown to clipboard or download `README.md` directly
- 📋 **Auto-Generated Content** — TOC and Contributing sections generate automatically

---

## 🚀 Getting Started

```bash
git clone https://github.com/dinakars777/readme-forge
cd readme-forge
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to start building.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite | Build tool & dev server |
| `react-markdown` | Live GitHub-flavored preview |
| `lucide-react` | Icons |
| Vanilla CSS | Styling |

---

## Roadmap

- [x] Badges block (shields.io integration)
- [x] Contributing block
- [x] License block
- [x] Table of Contents auto-generation
- [x] Template presets (CLI tool, React library, API)
- [ ] Drag-and-drop reordering
- [ ] Custom badge creator
- [ ] Export to multiple formats (HTML, PDF)
- [ ] Save/load projects from localStorage

---

## License

MIT
