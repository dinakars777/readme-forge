# readme-forge 🧰

> Visual builder for GitHub README files.

🔗 **[Live Demo](https://dinakars777.github.io/readme-forge/)**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev)

Block-based editor on the left. Live GitHub preview on the right. No Markdown syntax wrestling.

---

## Features

- ✨ **Block-Based Editing** — 10 structured blocks: Title, Badges, Description, TOC, Features, Installation, Usage, Tech Stack, Contributing, License
- 🎨 **Template Presets** — CLI tools, React libraries, APIs
- 🏷️ **Smart Badges** — npm, license, downloads, build status
- 🛠️ **Tech Stack Selector** — 13 popular technologies with auto-generated badges
- 🔄 **Real-Time Preview** — `react-markdown` simulates GitHub rendering
- 🏗️ **Reorder Sections** — up/down buttons
- 💾 **1-Click Export** — copy to clipboard or download `README.md`
- 📋 **Auto-Generated Content** — TOC and Contributing sections

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
