/**
 * @umituz/react-native-code-editor - Public API
 *
 * Code editing and syntax highlighting for React Native apps
 * 25+ programming languages, code blocks, editable code input
 *
 * Usage:
 *   import { CodeBlock, CodeInput, CodeEditorUtils, LANGUAGE_INFO } from '@umituz/react-native-code-editor';
 */

// =============================================================================
// DOMAIN LAYER - Entities
// =============================================================================

export type {
  ProgrammingLanguage,
  CodeTheme,
  CodeSnippet,
  CodeEditorConfig,
  SyntaxToken,
  TokenType,
} from './domain/entities/CodeEditor';

export {
  LANGUAGE_INFO,
  DEFAULT_EDITOR_CONFIG,
  CODE_EDITOR_CONSTANTS,
  CodeEditorUtils,
} from './domain/entities/CodeEditor';

// =============================================================================
// PRESENTATION LAYER - Components
// =============================================================================

export { CodeBlock } from './presentation/components/CodeBlock';
export { CodeInput } from './presentation/components/CodeInput';

