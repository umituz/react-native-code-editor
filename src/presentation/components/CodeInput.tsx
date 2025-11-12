/**
 * CodeInput Component
 *
 * Editable code input with line numbers and formatting.
 * Multiline text input optimized for code editing.
 */

import React from 'react';
import { View, TextInput, Text, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-design-system-theme';
import type { ProgrammingLanguage } from '../../domain/entities/CodeEditor';
import { CodeEditorUtils } from '../../domain/entities/CodeEditor';

// ============================================================================
// TYPES
// ============================================================================

interface CodeInputProps {
  value: string;
  onChangeText: (text: string) => void;
  language?: ProgrammingLanguage;
  placeholder?: string;
  showLineNumbers?: boolean;
  minHeight?: number;
  maxHeight?: number;
  editable?: boolean;
  style?: StyleProp<ViewStyle>;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const CodeInput: React.FC<CodeInputProps> = ({
  value,
  onChangeText,
  language = 'plaintext',
  placeholder = 'Enter code here...',
  showLineNumbers = true,
  minHeight = 200,
  maxHeight = 600,
  editable = true,
  style,
}) => {
  const tokens = useAppDesignTokens();

  const lines = value.split('\n');
  const lineCount = lines.length;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: tokens.colors.surfaceSecondary,
      borderRadius: tokens.borders.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      overflow: 'hidden',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: tokens.colors.border,
      backgroundColor: tokens.colors.surface,
      gap: tokens.spacing.xs,
    },
    languageText: {
      ...tokens.typography.bodySmall,
      color: tokens.colors.textSecondary,
      fontWeight: '600',
    },
    editorContainer: {
      flexDirection: 'row',
      minHeight,
      maxHeight,
    },
    lineNumbers: {
      backgroundColor: tokens.colors.surface,
      paddingVertical: tokens.spacing.md,
      paddingHorizontal: tokens.spacing.sm,
      borderRightWidth: 1,
      borderRightColor: tokens.colors.border,
    },
    lineNumber: {
      ...tokens.typography.bodySmall,
      fontFamily: 'monospace',
      color: tokens.colors.textTertiary,
      textAlign: 'right',
      lineHeight: 20,
      minWidth: 32,
    },
    inputContainer: {
      flex: 1,
      padding: tokens.spacing.md,
    },
    input: {
      ...tokens.typography.bodyMedium,
      fontFamily: 'monospace',
      color: tokens.colors.textPrimary,
      flex: 1,
      textAlignVertical: 'top',
      lineHeight: 20,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      borderTopWidth: 1,
      borderTopColor: tokens.colors.border,
      backgroundColor: tokens.colors.surface,
    },
    statsText: {
      ...tokens.typography.bodySmall,
      color: tokens.colors.textSecondary,
    },
  });

  return (
    <View style={[styles.container, style]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.languageText}>{CodeEditorUtils.getLanguageName(language)}</Text>
      </View>

      {/* Editor */}
      <View style={styles.editorContainer}>
        {/* Line Numbers */}
        {showLineNumbers && (
          <View style={styles.lineNumbers}>
            {Array.from({ length: Math.max(lineCount, 10) }, (_, i) => (
              <Text key={i} style={styles.lineNumber}>
                {i + 1}
              </Text>
            ))}
          </View>
        )}

        {/* Code Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={tokens.colors.textTertiary}
            multiline
            editable={editable}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            keyboardType="default"
            textAlignVertical="top"
          />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.statsText}>
          {lineCount} {lineCount === 1 ? 'line' : 'lines'}
        </Text>
        <Text style={styles.statsText}>{value.length} characters</Text>
      </View>
    </View>
  );
};

