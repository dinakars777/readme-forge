export type BlockType = 'title' | 'description' | 'badges' | 'features' | 'installation' | 'usage' | 'techstack' | 'contributing' | 'license' | 'toc';

export interface Block {
    id: string;
    type: BlockType;
    content: any;
}

export const TECH_STACK_BADGES = [
    { name: 'React', badge: '![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)' },
    { name: 'TypeScript', badge: '![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)' },
    { name: 'JavaScript', badge: '![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)' },
    { name: 'Node.js', badge: '![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)' },
    { name: 'Next.js', badge: '![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)' },
    { name: 'Vite', badge: '![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)' },
    { name: 'Tailwind CSS', badge: '![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwind-css&logoColor=white)' },
    { name: 'Python', badge: '![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)' },
    { name: 'Go', badge: '![Go](https://img.shields.io/badge/Go-00ADD8?logo=go&logoColor=white)' },
    { name: 'Rust', badge: '![Rust](https://img.shields.io/badge/Rust-000000?logo=rust&logoColor=white)' },
    { name: 'PostgreSQL', badge: '![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)' },
    { name: 'MongoDB', badge: '![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)' },
    { name: 'Docker', badge: '![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)' },
];

export const TEMPLATES: Record<string, Block[]> = {
    'cli-tool': [
        { id: '1', type: 'title' as BlockType, content: { title: 'my-cli-tool' } },
        { id: '2', type: 'badges' as BlockType, content: { badges: ['npm', 'license', 'downloads'] } },
        { id: '3', type: 'description' as BlockType, content: { text: 'A powerful CLI tool that does amazing things.' } },
        { id: '4', type: 'features' as BlockType, content: { items: ['Zero configuration', 'Lightning fast', 'Beautiful UI'] } },
        { id: '5', type: 'installation' as BlockType, content: { code: 'npm install -g my-cli-tool', language: 'bash' } },
        { id: '6', type: 'usage' as BlockType, content: { code: 'my-cli-tool --help', language: 'bash' } },
        { id: '7', type: 'license' as BlockType, content: { license: 'MIT' } },
    ],
    'react-library': [
        { id: '1', type: 'title' as BlockType, content: { title: 'react-awesome-lib' } },
        { id: '2', type: 'badges' as BlockType, content: { badges: ['npm', 'license'] } },
        { id: '3', type: 'description' as BlockType, content: { text: 'A React component library for building beautiful UIs.' } },
        { id: '4', type: 'features' as BlockType, content: { items: ['TypeScript support', 'Tree-shakeable', 'Fully customizable'] } },
        { id: '5', type: 'installation' as BlockType, content: { code: 'npm install react-awesome-lib', language: 'bash' } },
        { id: '6', type: 'usage' as BlockType, content: { code: 'import { Button } from "react-awesome-lib";\n\nfunction App() {\n  return <Button>Click me</Button>;\n}', language: 'jsx' } },
        { id: '7', type: 'techstack' as BlockType, content: { stack: ['React', 'TypeScript', 'Vite'] } },
        { id: '8', type: 'contributing' as BlockType, content: {} },
        { id: '9', type: 'license' as BlockType, content: { license: 'MIT' } },
    ],
    'api': [
        { id: '1', type: 'title' as BlockType, content: { title: 'awesome-api' } },
        { id: '2', type: 'badges' as BlockType, content: { badges: ['build', 'license'] } },
        { id: '3', type: 'description' as BlockType, content: { text: 'A RESTful API for managing awesome resources.' } },
        { id: '4', type: 'features' as BlockType, content: { items: ['RESTful endpoints', 'JWT authentication', 'Rate limiting'] } },
        { id: '5', type: 'installation' as BlockType, content: { code: 'git clone https://github.com/user/awesome-api\ncd awesome-api\nnpm install', language: 'bash' } },
        { id: '6', type: 'usage' as BlockType, content: { code: 'npm run dev', language: 'bash' } },
        { id: '7', type: 'techstack' as BlockType, content: { stack: ['Node.js', 'TypeScript', 'PostgreSQL'] } },
        { id: '8', type: 'contributing' as BlockType, content: {} },
        { id: '9', type: 'license' as BlockType, content: { license: 'MIT' } },
    ],
};

export const INITIAL_BLOCKS: Block[] = TEMPLATES['cli-tool'];

export function generateMarkdown(blocks: Block[]): string {
    let md = '';
    const headers: string[] = [];

    blocks.forEach((block) => {
        switch (block.type) {
            case 'title':
                md += `# ${block.content.title || 'Project Name'}\n\n`;
                break;
                
            case 'badges':
                if (block.content.badges && block.content.badges.length > 0) {
                    const badges = block.content.badges.filter((b: string) => b.trim());
                    if (badges.length > 0) {
                        badges.forEach((badge: string) => {
                            if (badge === 'npm') {
                                md += `[![npm version](https://img.shields.io/npm/v/package-name.svg)](https://www.npmjs.com/package/package-name) `;
                            } else if (badge === 'license') {
                                md += `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) `;
                            } else if (badge === 'downloads') {
                                md += `[![npm downloads](https://img.shields.io/npm/dm/package-name.svg)](https://www.npmjs.com/package/package-name) `;
                            } else if (badge === 'build') {
                                md += `[![Build Status](https://img.shields.io/github/actions/workflow/status/user/repo/ci.yml)](https://github.com/user/repo/actions) `;
                            } else {
                                md += `![${badge}](https://img.shields.io/badge/-${encodeURIComponent(badge)}-blue) `;
                            }
                        });
                        md += '\n\n';
                    }
                }
                break;
                
            case 'description':
                if (block.content.text) {
                    md += `${block.content.text}\n\n`;
                }
                break;
                
            case 'toc':
                md += `## Table of Contents\n\n`;
                headers.forEach(h => {
                    const anchor = h.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    md += `- [${h}](#${anchor})\n`;
                });
                md += '\n';
                break;
                
            case 'features':
                if (block.content.items && block.content.items.length > 0) {
                    headers.push('Features');
                    md += `## Features\n\n`;
                    block.content.items.filter((i: string) => i.trim()).forEach((item: string) => {
                        md += `- ${item}\n`;
                    });
                    md += '\n';
                }
                break;
                
            case 'installation':
                headers.push('Installation');
                md += `## Installation\n\n`;
                if (block.content.code) {
                    md += `\`\`\`${block.content.language || 'bash'}\n${block.content.code}\n\`\`\`\n\n`;
                }
                break;
                
            case 'usage':
                headers.push('Usage');
                md += `## Usage\n\n`;
                if (block.content.code) {
                    md += `\`\`\`${block.content.language || 'javascript'}\n${block.content.code}\n\`\`\`\n\n`;
                }
                break;
                
            case 'techstack':
                if (block.content.stack && block.content.stack.length > 0) {
                    headers.push('Tech Stack');
                    md += `## Tech Stack\n\n`;
                    block.content.stack.forEach((tech: string) => {
                        const badge = TECH_STACK_BADGES.find(b => b.name === tech);
                        if (badge) {
                            md += `${badge.badge} `;
                        }
                    });
                    md += '\n\n';
                }
                break;
                
            case 'contributing':
                headers.push('Contributing');
                md += `## Contributing\n\n`;
                md += `Contributions are welcome! Please feel free to submit a Pull Request.\n\n`;
                md += `1. Fork the repository\n`;
                md += `2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)\n`;
                md += `3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)\n`;
                md += `4. Push to the branch (\`git push origin feature/AmazingFeature\`)\n`;
                md += `5. Open a Pull Request\n\n`;
                break;
                
            case 'license':
                headers.push('License');
                md += `## License\n\n`;
                md += `This project is licensed under the ${block.content.license || 'MIT'} License - see the LICENSE file for details.\n\n`;
                break;
        }
    });

    return md.trim();
}
