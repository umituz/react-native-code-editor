/**
 * Code Editor Domain - Entities
 *
 * Core types and utilities for code editing and syntax highlighting.
 */

// ============================================================================
// TYPES
// ============================================================================

/**
 * Supported programming languages for syntax highlighting
 */
export type ProgrammingLanguage =
  | 'typescript'
  | 'javascript'
  | 'python'
  | 'java'
  | 'csharp'
  | 'cpp'
  | 'c'
  | 'swift'
  | 'kotlin'
  | 'go'
  | 'rust'
  | 'php'
  | 'ruby'
  | 'html'
  | 'css'
  | 'scss'
  | 'json'
  | 'xml'
  | 'yaml'
  | 'markdown'
  | 'sql'
  | 'bash'
  | 'shell'
  | 'dockerfile'
  | 'plaintext';

/**
 * Code editor theme
 */
export type CodeTheme = 'light' | 'dark' | 'auto';

/**
 * Code snippet structure
 */
export interface CodeSnippet {
  id: string;
  title: string;
  description?: string;
  code: string;
  language: ProgrammingLanguage;
  category?: string;
  tags?: string[];
  isFavorite?: boolean;
  createdAt: Date;
  updatedAt: Date;
  usageCount?: number;
}

/**
 * Code editor configuration
 */
export interface CodeEditorConfig {
  language: ProgrammingLanguage;
  theme: CodeTheme;
  fontSize: number;
  lineNumbers: boolean;
  wordWrap: boolean;
  tabSize: number;
  readOnly: boolean;
}

/**
 * Syntax highlighting token
 */
export interface SyntaxToken {
  type: TokenType;
  value: string;
  start: number;
  end: number;
}

/**
 * Token types for syntax highlighting
 */
export type TokenType =
  | 'keyword'
  | 'string'
  | 'number'
  | 'comment'
  | 'operator'
  | 'punctuation'
  | 'function'
  | 'variable'
  | 'type'
  | 'tag'
  | 'attribute'
  | 'property'
  | 'plaintext';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Language display names and file extensions
 */
export const LANGUAGE_INFO: Record<
  ProgrammingLanguage,
  { name: string; extension: string; icon: string }
> = {
  typescript: { name: 'TypeScript', extension: '.ts', icon: 'FileCode' },
  javascript: { name: 'JavaScript', extension: '.js', icon: 'FileCode' },
  python: { name: 'Python', extension: '.py', icon: 'FileCode' },
  java: { name: 'Java', extension: '.java', icon: 'FileCode' },
  csharp: { name: 'C#', extension: '.cs', icon: 'FileCode' },
  cpp: { name: 'C++', extension: '.cpp', icon: 'FileCode' },
  c: { name: 'C', extension: '.c', icon: 'FileCode' },
  swift: { name: 'Swift', extension: '.swift', icon: 'FileCode' },
  kotlin: { name: 'Kotlin', extension: '.kt', icon: 'FileCode' },
  go: { name: 'Go', extension: '.go', icon: 'FileCode' },
  rust: { name: 'Rust', extension: '.rs', icon: 'FileCode' },
  php: { name: 'PHP', extension: '.php', icon: 'FileCode' },
  ruby: { name: 'Ruby', extension: '.rb', icon: 'FileCode' },
  html: { name: 'HTML', extension: '.html', icon: 'FileCode' },
  css: { name: 'CSS', extension: '.css', icon: 'FileCode' },
  scss: { name: 'SCSS', extension: '.scss', icon: 'FileCode' },
  json: { name: 'JSON', extension: '.json', icon: 'Braces' },
  xml: { name: 'XML', extension: '.xml', icon: 'FileCode' },
  yaml: { name: 'YAML', extension: '.yaml', icon: 'FileCode' },
  markdown: { name: 'Markdown', extension: '.md', icon: 'FileText' },
  sql: { name: 'SQL', extension: '.sql', icon: 'Database' },
  bash: { name: 'Bash', extension: '.sh', icon: 'Terminal' },
  shell: { name: 'Shell', extension: '.sh', icon: 'Terminal' },
  dockerfile: { name: 'Dockerfile', extension: 'Dockerfile', icon: 'Box' },
  plaintext: { name: 'Plain Text', extension: '.txt', icon: 'FileText' },
};

/**
 * Default editor configuration
 */
export const DEFAULT_EDITOR_CONFIG: CodeEditorConfig = {
  language: 'javascript',
  theme: 'auto',
  fontSize: 14,
  lineNumbers: true,
  wordWrap: true,
  tabSize: 2,
  readOnly: false,
};

/**
 * Code editor constants
 */
export const CODE_EDITOR_CONSTANTS = {
  MIN_FONT_SIZE: 10,
  MAX_FONT_SIZE: 24,
  DEFAULT_FONT_SIZE: 14,
  MIN_TAB_SIZE: 2,
  MAX_TAB_SIZE: 8,
  DEFAULT_TAB_SIZE: 2,
  MAX_CODE_LENGTH: 50000, // 50KB max for performance
  PREVIEW_LENGTH: 150, // Characters to show in previews
} as const;

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Code editor utility functions
 */
export class CodeEditorUtils {
  /**
   * Detect programming language from file extension
   */
  static detectLanguage(filename: string): ProgrammingLanguage {
    const ext = filename.toLowerCase().split('.').pop() || '';

    const languageMap: Record<string, ProgrammingLanguage> = {
      ts: 'typescript',
      tsx: 'typescript',
      js: 'javascript',
      jsx: 'javascript',
      py: 'python',
      java: 'java',
      cs: 'csharp',
      cpp: 'cpp',
      cc: 'cpp',
      c: 'c',
      h: 'c',
      swift: 'swift',
      kt: 'kotlin',
      go: 'go',
      rs: 'rust',
      php: 'php',
      rb: 'ruby',
      html: 'html',
      htm: 'html',
      css: 'css',
      scss: 'scss',
      sass: 'scss',
      json: 'json',
      xml: 'xml',
      yaml: 'yaml',
      yml: 'yaml',
      md: 'markdown',
      sql: 'sql',
      sh: 'bash',
      bash: 'bash',
      dockerfile: 'dockerfile',
      txt: 'plaintext',
    };

    return languageMap[ext] || 'plaintext';
  }

  /**
   * Format code for display (truncate long code)
   */
  static formatForDisplay(code: string, maxLength: number = CODE_EDITOR_CONSTANTS.PREVIEW_LENGTH): string {
    if (code.length <= maxLength) {
      return code;
    }

    const truncated = code.substring(0, maxLength);
    const lastNewline = truncated.lastIndexOf('\n');

    // Try to break at a newline for cleaner display
    if (lastNewline > maxLength * 0.7) {
      return truncated.substring(0, lastNewline) + '\n...';
    }

    return truncated + '...';
  }

  /**
   * Count lines in code
   */
  static countLines(code: string): number {
    if (!code) return 0;
    return code.split('\n').length;
  }

  /**
   * Count characters in code
   */
  static countCharacters(code: string): number {
    return code.length;
  }

  /**
   * Validate code length
   */
  static isValidLength(code: string): boolean {
    return code.length <= CODE_EDITOR_CONSTANTS.MAX_CODE_LENGTH;
  }

  /**
   * Get language icon
   */
  static getLanguageIcon(language: ProgrammingLanguage): string {
    return LANGUAGE_INFO[language]?.icon || 'FileCode';
  }

  /**
   * Get language display name
   */
  static getLanguageName(language: ProgrammingLanguage): string {
    return LANGUAGE_INFO[language]?.name || language;
  }

  /**
   * Get file extension for language
   */
  static getFileExtension(language: ProgrammingLanguage): string {
    return LANGUAGE_INFO[language]?.extension || '.txt';
  }

  /**
   * Extract code preview (first few lines)
   */
  static getCodePreview(code: string, lines: number = 3): string {
    const codeLines = code.split('\n');
    const preview = codeLines.slice(0, lines).join('\n');

    if (codeLines.length > lines) {
      return preview + '\n...';
    }

    return preview;
  }

  /**
   * Format file size for display
   */
  static formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  /**
   * Generate snippet ID
   */
  static generateSnippetId(): string {
    return `snippet_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Validate snippet data
   */
  static validateSnippet(snippet: Partial<CodeSnippet>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!snippet.title?.trim()) {
      errors.push('Title is required');
    }

    if (!snippet.code?.trim()) {
      errors.push('Code is required');
    }

    if (snippet.code && !this.isValidLength(snippet.code)) {
      errors.push(`Code exceeds maximum length of ${this.formatFileSize(CODE_EDITOR_CONSTANTS.MAX_CODE_LENGTH)}`);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

