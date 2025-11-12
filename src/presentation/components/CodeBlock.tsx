/**
 * CodeBlock Component
 *
 * Displays code with syntax highlighting and copy functionality.
 * Read-only display component for code snippets.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, type StyleProp, type ViewStyle } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-design-system-theme';
import { AtomicIcon } from '@umituz/react-native-design-system-atoms';
import { useClipboard } from '@umituz/react-native-clipboard';
import { useToast } from '@umituz/react-native-toast';
import type { ProgrammingLanguage } from '../../domain/entities/CodeEditor';
import { CodeEditorUtils } from '../../domain/entities/CodeEditor';

// ============================================================================
// TYPES
// ============================================================================

interface CodeBlockProps {
  code: string;
  language?: ProgrammingLanguage;
  showLineNumbers?: boolean;
  maxHeight?: number;
  showCopyButton?: boolean;
  style?: StyleProp<ViewStyle>;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'plaintext',
  showLineNumbers = true,
  maxHeight = 400,
  showCopyButton = true,
  style,
}) => {
  const tokens = useAppDesignTokens();
  const { copy } = useClipboard();
  const { showSuccess } = useToast();

  const lines = code.split('\n');
  const lineCount = lines.length;

  const handleCopy = async () => {
    await copy(code);
    showSuccess('Code copied to clipboard');
  };

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
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: tokens.colors.border,
      backgroundColor: tokens.colors.surface,
    },
    languageTag: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.xs,
    },
    languageText: {
      ...tokens.typography.bodySmall,
      color: tokens.colors.textSecondary,
      fontWeight: '600',
    },
    copyButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.xs,
      paddingHorizontal: tokens.spacing.sm,
      paddingVertical: tokens.spacing.xs,
      borderRadius: tokens.borders.radius.sm,
      backgroundColor: tokens.colors.surfaceSecondary,
    },
    copyText: {
      ...tokens.typography.bodySmall,
      color: tokens.colors.primary,
      fontWeight: '600',
    },
    codeContainer: {
      maxHeight,
    },
    codeContent: {
      padding: tokens.spacing.md,
    },
    line: {
      flexDirection: 'row',
      marginBottom: tokens.spacing.xs,
    },
    lineNumber: {
      ...tokens.typography.bodySmall,
      fontFamily: 'monospace',
      color: tokens.colors.textTertiary,
      minWidth: 40,
      textAlign: 'right',
      marginRight: tokens.spacing.md,
      userSelect: 'none',
    },
    lineCode: {
      ...tokens.typography.bodyMedium,
      fontFamily: 'monospace',
      color: tokens.colors.textPrimary,
      flex: 1,
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
        <View style={styles.languageTag}>
          <AtomicIcon name={CodeEditorUtils.getLanguageIcon(language)} size="sm" color="secondary" />
          <Text style={styles.languageText}>{CodeEditorUtils.getLanguageName(language)}</Text>
        </View>

        {showCopyButton && (
          <TouchableOpacity style={styles.copyButton} onPress={handleCopy} activeOpacity={0.7}>
            <AtomicIcon name="Copy" size="sm" color="primary" />
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Code */}
      <ScrollView style={styles.codeContainer} horizontal showsHorizontalScrollIndicator>
        <View style={styles.codeContent}>
          {lines.map((line, index) => (
            <View key={index} style={styles.line}>
              {showLineNumbers && <Text style={styles.lineNumber}>{index + 1}</Text>}
              <Text style={styles.lineCode}>{line || ' '}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.statsText}>
          {lineCount} {lineCount === 1 ? 'line' : 'lines'}
        </Text>
        <Text style={styles.statsText}>{CodeEditorUtils.formatFileSize(code.length)}</Text>
      </View>
    </View>
  );
};

