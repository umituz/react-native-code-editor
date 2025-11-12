# @umituz/react-native-code-editor

Code editing and syntax highlighting for React Native apps - 25+ programming languages, code blocks, editable code input.

## Features

- ✅ **25+ Programming Languages** - TypeScript, JavaScript, Python, Java, C#, C++, Swift, Kotlin, Go, Rust, PHP, Ruby, HTML, CSS, SCSS, JSON, XML, YAML, Markdown, SQL, Bash, Shell, Dockerfile, Plain Text
- ✅ **CodeBlock Component** - Read-only code display with syntax highlighting
- ✅ **CodeInput Component** - Editable code input with line numbers
- ✅ **Language Detection** - Auto-detect language from file extension
- ✅ **Code Statistics** - Line count, character count, file size
- ✅ **Code Validation** - Validate code length and snippet data
- ✅ **Copy to Clipboard** - One-click code copying
- ✅ **Line Numbers** - Optional line number display
- ✅ **Type-Safe** - Full TypeScript support

## Installation

```bash
npm install @umituz/react-native-code-editor
```

## Peer Dependencies

```bash
npm install @umituz/react-native-design-system-theme @umituz/react-native-icon @umituz/react-native-clipboard @umituz/react-native-toast
```

## Usage

### Display Code (Read-Only)

```tsx
import { CodeBlock } from '@umituz/react-native-code-editor';

<CodeBlock
  code={snippetCode}
  language="typescript"
  showLineNumbers
  showCopyButton
/>
```

### Edit Code

```tsx
import { CodeInput } from '@umituz/react-native-code-editor';

const [code, setCode] = useState('');

<CodeInput
  value={code}
  onChangeText={setCode}
  language="javascript"
  placeholder="Enter your code..."
  showLineNumbers
/>
```

### Utilities

```tsx
import { CodeEditorUtils } from '@umituz/react-native-code-editor';

// Detect language from filename
const lang = CodeEditorUtils.detectLanguage('App.tsx'); // 'typescript'

// Count lines
const lines = CodeEditorUtils.countLines(code);

// Validate code length
const valid = CodeEditorUtils.isValidLength(code);

// Get preview
const preview = CodeEditorUtils.getCodePreview(code, 5);

// Format file size
const size = CodeEditorUtils.formatFileSize(1024); // "1.0 KB"

// Get language info
const name = CodeEditorUtils.getLanguageName('typescript'); // "TypeScript"
const icon = CodeEditorUtils.getLanguageIcon('typescript'); // "FileCode"
const ext = CodeEditorUtils.getFileExtension('typescript'); // ".ts"
```

### Code Snippet Management

```tsx
import { CodeEditorUtils, type CodeSnippet } from '@umituz/react-native-code-editor';

// Generate snippet ID
const id = CodeEditorUtils.generateSnippetId();

// Validate snippet
const validation = CodeEditorUtils.validateSnippet({
  title: 'My Snippet',
  code: 'console.log("Hello");',
  language: 'javascript',
});

if (validation.valid) {
  // Save snippet
} else {
  console.error(validation.errors);
}
```

## API Reference

### `CodeBlock`

Read-only code display component.

**Props:**
- `code: string` - Code to display
- `language?: ProgrammingLanguage` - Programming language (default: 'plaintext')
- `showLineNumbers?: boolean` - Show line numbers (default: true)
- `maxHeight?: number` - Maximum height (default: 400)
- `showCopyButton?: boolean` - Show copy button (default: true)
- `style?: ViewStyle` - Custom container style

### `CodeInput`

Editable code input component.

**Props:**
- `value: string` - Code value
- `onChangeText: (text: string) => void` - Change handler
- `language?: ProgrammingLanguage` - Programming language (default: 'plaintext')
- `placeholder?: string` - Placeholder text
- `showLineNumbers?: boolean` - Show line numbers (default: true)
- `minHeight?: number` - Minimum height (default: 200)
- `maxHeight?: number` - Maximum height (default: 600)
- `editable?: boolean` - Editable state (default: true)
- `style?: ViewStyle` - Custom container style

### `CodeEditorUtils`

Utility class for code operations.

**Methods:**
- `detectLanguage(filename: string): ProgrammingLanguage` - Detect language from filename
- `formatForDisplay(code: string, maxLength?: number): string` - Format code for display
- `countLines(code: string): number` - Count lines in code
- `countCharacters(code: string): number` - Count characters
- `isValidLength(code: string): boolean` - Validate code length
- `getLanguageIcon(language: ProgrammingLanguage): string` - Get language icon
- `getLanguageName(language: ProgrammingLanguage): string` - Get language display name
- `getFileExtension(language: ProgrammingLanguage): string` - Get file extension
- `getCodePreview(code: string, lines?: number): string` - Get code preview
- `formatFileSize(bytes: number): string` - Format file size
- `generateSnippetId(): string` - Generate snippet ID
- `validateSnippet(snippet: Partial<CodeSnippet>): { valid: boolean; errors: string[] }` - Validate snippet

## Supported Languages

- TypeScript (`.ts`, `.tsx`)
- JavaScript (`.js`, `.jsx`)
- Python (`.py`)
- Java (`.java`)
- C# (`.cs`)
- C++ (`.cpp`, `.cc`)
- C (`.c`, `.h`)
- Swift (`.swift`)
- Kotlin (`.kt`)
- Go (`.go`)
- Rust (`.rs`)
- PHP (`.php`)
- Ruby (`.rb`)
- HTML (`.html`, `.htm`)
- CSS (`.css`)
- SCSS (`.scss`, `.sass`)
- JSON (`.json`)
- XML (`.xml`)
- YAML (`.yaml`, `.yml`)
- Markdown (`.md`)
- SQL (`.sql`)
- Bash (`.sh`, `.bash`)
- Shell (`.sh`)
- Dockerfile (`Dockerfile`)
- Plain Text (`.txt`)

## Types

- `ProgrammingLanguage` - Supported programming languages
- `CodeTheme` - 'light' | 'dark' | 'auto'
- `CodeSnippet` - Code snippet structure
- `CodeEditorConfig` - Editor configuration
- `SyntaxToken` - Syntax highlighting token
- `TokenType` - Token types for syntax highlighting

## Use Cases

- Code snippet manager
- JSON/SQL formatter
- Code generator tools
- Text encoder/decoder
- HTML template maker
- Markdown editor
- Developer documentation
- Code sharing apps

## License

MIT

## Author

Ümit UZ <umit@umituz.com>

