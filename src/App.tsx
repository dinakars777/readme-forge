import { useState } from 'react';
import { PenTool, Copy, Download, Plus, Trash2, GripVertical } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import './App.css';
import { INITIAL_BLOCKS, generateMarkdown, type Block, type BlockType, TEMPLATES, TECH_STACK_BADGES } from './store';

function App() {
  const [blocks, setBlocks] = useState<Block[]>(INITIAL_BLOCKS);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('cli-tool');

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: Math.random().toString(36).substring(7),
      type,
      content: type === 'features' ? { items: [''] } : {},
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const updateBlock = (id: string, content: any) => {
    setBlocks(blocks.map(b => (b.id === id ? { ...b, content } : b)));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;

    const newBlocks = [...blocks];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[swapIndex]] = [newBlocks[swapIndex], newBlocks[index]];
    setBlocks(newBlocks);
  };

  const handleCopy = async () => {
    const md = generateMarkdown(blocks);
    await navigator.clipboard.writeText(md);
    alert('Copied to clipboard!');
  };

  const markdown = generateMarkdown(blocks);

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header">
        <h1>
          <PenTool size={24} color="var(--primary)" />
          readme-forge
        </h1>
        <div className="header-actions">
          <select 
            value={selectedTemplate} 
            onChange={(e) => {
              setSelectedTemplate(e.target.value);
              setBlocks(TEMPLATES[e.target.value as keyof typeof TEMPLATES]);
            }}
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-secondary)' }}
          >
            <option value="cli-tool">CLI Tool Template</option>
            <option value="react-library">React Library Template</option>
            <option value="api">API Template</option>
          </select>
          <button className="btn btn-secondary" onClick={handleCopy}>
            <Copy size={16} />
            Copy Markdown
          </button>
          <button className="btn btn-primary" onClick={() => {
            const blob = new Blob([markdown], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'README.md';
            a.click();
          }}>
            <Download size={16} />
            Download
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* LEFT PANE: EDITOR */}
        <section className="editor-pane">

          <div className="editor-sidebar">
            <button className="add-block-btn" onClick={() => addBlock('title')}>+ Title</button>
            <button className="add-block-btn" onClick={() => addBlock('badges')}>+ Badges</button>
            <button className="add-block-btn" onClick={() => addBlock('description')}>+ Description</button>
            <button className="add-block-btn" onClick={() => addBlock('toc')}>+ Table of Contents</button>
            <button className="add-block-btn" onClick={() => addBlock('features')}>+ Features</button>
            <button className="add-block-btn" onClick={() => addBlock('installation')}>+ Installation</button>
            <button className="add-block-btn" onClick={() => addBlock('usage')}>+ Usage</button>
            <button className="add-block-btn" onClick={() => addBlock('techstack')}>+ Tech Stack</button>
            <button className="add-block-btn" onClick={() => addBlock('contributing')}>+ Contributing</button>
            <button className="add-block-btn" onClick={() => addBlock('license')}>+ License</button>
          </div>

          <div className="blocks-container">
            {blocks.map((block, index) => (
              <div key={block.id} className="editor-block">

                <div className="block-header">
                  <div className="block-title">
                    <GripVertical size={16} color="var(--text-muted)" style={{ cursor: 'grab' }} />
                    {block.type}
                  </div>
                  <div className="block-actions">
                    <button className="icon-btn" onClick={() => moveBlock(index, 'up')} disabled={index === 0}>↑</button>
                    <button className="icon-btn" onClick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1}>↓</button>
                    <button className="icon-btn danger" onClick={() => removeBlock(block.id)}><Trash2 size={16} /></button>
                  </div>
                </div>

                <div className="block-content">
                  {/* Dynamic Form based on Type */}

                  {block.type === 'title' && (
                    <div className="form-group">
                      <label>Project Title</label>
                      <input
                        value={block.content.title || ''}
                        onChange={(e) => updateBlock(block.id, { ...block.content, title: e.target.value })}
                        placeholder="e.g. Awesome Project"
                      />
                    </div>
                  )}

                  {block.type === 'badges' && (
                    <div className="form-group">
                      <label>Select Badges</label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {['npm', 'license', 'downloads', 'build'].map(badge => (
                          <label key={badge} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                              type="checkbox"
                              checked={(block.content.badges || []).includes(badge)}
                              onChange={(e) => {
                                const badges = block.content.badges || [];
                                if (e.target.checked) {
                                  updateBlock(block.id, { ...block.content, badges: [...badges, badge] });
                                } else {
                                  updateBlock(block.id, { ...block.content, badges: badges.filter((b: string) => b !== badge) });
                                }
                              }}
                            />
                            {badge.charAt(0).toUpperCase() + badge.slice(1)}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {block.type === 'description' && (
                    <div className="form-group">
                      <label>Description Text</label>
                      <textarea
                        rows={3}
                        value={block.content.text || ''}
                        onChange={(e) => updateBlock(block.id, { ...block.content, text: e.target.value })}
                        placeholder="Write a clear, concise description..."
                      />
                    </div>
                  )}

                  {block.type === 'toc' && (
                    <div className="form-group">
                      <label>Table of Contents</label>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        Auto-generated from section headers
                      </p>
                    </div>
                  )}

                  {block.type === 'features' && (
                    <div className="form-group">
                      <label>Feature Items</label>
                      {(block.content.items || []).map((item: string, i: number) => (
                        <div key={i} className="feature-item">
                          <input
                            className="w-full"
                            value={item}
                            onChange={(e) => {
                              const newItems = [...block.content.items];
                              newItems[i] = e.target.value;
                              updateBlock(block.id, { ...block.content, items: newItems });
                            }}
                            placeholder="Feature description..."
                          />
                          <button
                            className="icon-btn danger"
                            onClick={() => {
                              const newItems = block.content.items.filter((_: any, idx: number) => idx !== i);
                              updateBlock(block.id, { ...block.content, items: newItems });
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                      <button
                        className="btn btn-secondary"
                        style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
                        onClick={() => {
                          updateBlock(block.id, { ...block.content, items: [...(block.content.items || []), ''] });
                        }}
                      >
                        <Plus size={14} /> Add Feature
                      </button>
                    </div>
                  )}

                  {(block.type === 'installation' || block.type === 'usage') && (
                    <>
                      <div className="form-group">
                        <label>Language</label>
                        <input
                          value={block.content.language || ''}
                          onChange={(e) => updateBlock(block.id, { ...block.content, language: e.target.value })}
                          placeholder="e.g. bash, javascript"
                        />
                      </div>
                      <div className="form-group">
                        <label>Code Snippet</label>
                        <textarea
                          rows={4}
                          style={{ fontFamily: 'monospace' }}
                          value={block.content.code || ''}
                          onChange={(e) => updateBlock(block.id, { ...block.content, code: e.target.value })}
                          placeholder="Code here..."
                        />
                      </div>
                    </>
                  )}

                  {block.type === 'techstack' && (
                    <div className="form-group">
                      <label>Select Technologies</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                        {TECH_STACK_BADGES.map(tech => (
                          <label key={tech.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                              type="checkbox"
                              checked={(block.content.stack || []).includes(tech.name)}
                              onChange={(e) => {
                                const stack = block.content.stack || [];
                                if (e.target.checked) {
                                  updateBlock(block.id, { ...block.content, stack: [...stack, tech.name] });
                                } else {
                                  updateBlock(block.id, { ...block.content, stack: stack.filter((s: string) => s !== tech.name) });
                                }
                              }}
                            />
                            {tech.name}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {block.type === 'contributing' && (
                    <div className="form-group">
                      <label>Contributing Guidelines</label>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        Auto-generated standard contributing guidelines
                      </p>
                    </div>
                  )}

                  {block.type === 'license' && (
                    <div className="form-group">
                      <label>License Type</label>
                      <select
                        value={block.content.license || 'MIT'}
                        onChange={(e) => updateBlock(block.id, { ...block.content, license: e.target.value })}
                        style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', width: '100%' }}
                      >
                        <option value="MIT">MIT</option>
                        <option value="Apache-2.0">Apache 2.0</option>
                        <option value="GPL-3.0">GPL 3.0</option>
                        <option value="BSD-3-Clause">BSD 3-Clause</option>
                        <option value="ISC">ISC</option>
                        <option value="Unlicense">Unlicense</option>
                      </select>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>

        </section>

        {/* RIGHT PANE: PREVIEW */}
        <section className="preview-pane">
          <div className="markdown-preview">
            <ReactMarkdown>
              {markdown}
            </ReactMarkdown>
          </div>
        </section>

      </main>
    </div>
  );
}

export default App;
