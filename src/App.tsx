import { useState } from 'react';
import { PenTool, Copy, Download, Plus, Trash2, GripVertical } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import './App.css';
import { INITIAL_BLOCKS, generateMarkdown, type Block, type BlockType } from './store';

function App() {
  const [blocks, setBlocks] = useState<Block[]>(INITIAL_BLOCKS);

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
            <button className="add-block-btn" onClick={() => addBlock('description')}>+ Description</button>
            <button className="add-block-btn" onClick={() => addBlock('features')}>+ Features</button>
            <button className="add-block-btn" onClick={() => addBlock('installation')}>+ Installation</button>
            <button className="add-block-btn" onClick={() => addBlock('usage')}>+ Usage</button>
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
