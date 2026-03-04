export type BlockType = 'title' | 'description' | 'features' | 'installation' | 'usage';

export interface Block {
    id: string;
    type: BlockType;
    content: any;
}

export const INITIAL_BLOCKS: Block[] = [
    {
        id: '1',
        type: 'title',
        content: {
            title: 'Project Name',
            badges: ['npm version', 'license MIT'],
        }
    },
    {
        id: '2',
        type: 'description',
        content: {
            text: 'A brief description of what this project does and who it is for.',
        }
    },
    {
        id: '3',
        type: 'features',
        content: {
            items: ['Amazing feature one', 'Blazing fast', 'Zero configuration'],
        }
    },
    {
        id: '4',
        type: 'installation',
        content: {
            code: 'npm install project-name',
            language: 'bash'
        }
    }
];

export function generateMarkdown(blocks: Block[]): string {
    let md = '';

    blocks.forEach((block) => {
        switch (block.type) {
            case 'title':
                md += `# ${block.content.title}\n\n`;
                if (block.content.badges && block.content.badges.length > 0) {
                    const badgeLabels = block.content.badges.filter((b: string) => b.trim());
                    if (badgeLabels.length > 0) {
                        // Simulated badges for now
                        md += badgeLabels.map((b: string) => `![badge](https://img.shields.io/badge/-${encodeURIComponent(b)}-blue)`).join(' ');
                        md += '\n\n';
                    }
                }
                break;
            case 'description':
                if (block.content.text) {
                    md += `${block.content.text}\n\n`;
                }
                break;
            case 'features':
                if (block.content.items && block.content.items.length > 0) {
                    md += `## Features\n\n`;
                    block.content.items.filter((i: string) => i.trim()).forEach((item: string) => {
                        md += `- ${item}\n`;
                    });
                    md += '\n';
                }
                break;
            case 'installation':
                md += `## Installation\n\n`
                if (block.content.code) {
                    md += `\`\`\`${block.content.language || 'bash'}\n${block.content.code}\n\`\`\`\n\n`;
                }
                break;
            case 'usage':
                md += `## Usage\n\n`
                if (block.content.code) {
                    md += `\`\`\`${block.content.language || 'javascript'}\n${block.content.code}\n\`\`\`\n\n`;
                }
                break;
        }
    });

    return md.trim();
}
