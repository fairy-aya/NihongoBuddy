import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Card, Title, Paragraph } from 'react-native-paper';
import { theme, spacing } from '../constants/theme';

// 共通コンポーネント: カテゴリーカード
export const CategoryCard = ({ title, description, imageSource, onPress }) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Cover source={imageSource} />
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{description}</Paragraph>
      </Card.Content>
    </Card>
  );
};

// 共通コンポーネント: フレーズアイテム
export const PhraseItem = ({ japanese, romaji, english, onPress }) => {
  return (
    <Card style={styles.phraseCard} onPress={onPress}>
      <Card.Content>
        <Title style={styles.japaneseText}>{japanese}</Title>
        <Paragraph style={styles.romajiText}>{romaji}</Paragraph>
        <Paragraph style={styles.englishText}>{english}</Paragraph>
      </Card.Content>
    </Card>
  );
};

// 共通コンポーネント: プライマリーボタン
export const PrimaryButton = ({ title, onPress, disabled = false }) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      disabled={disabled}
      style={styles.primaryButton}
    >
      {title}
    </Button>
  );
};

// 共通コンポーネント: セカンダリーボタン
export const SecondaryButton = ({ title, onPress, disabled = false }) => {
  return (
    <Button
      mode="outlined"
      onPress={onPress}
      disabled={disabled}
      style={styles.secondaryButton}
    >
      {title}
    </Button>
  );
};

// 共通コンポーネント: セクションヘッダー
export const SectionHeader = ({ title, subtitle }) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
    </View>
  );
};

// 共通コンポーネント: エンプティステート
export const EmptyState = ({ message, icon, actionButton }) => {
  return (
    <View style={styles.emptyState}>
      {icon}
      <Text style={styles.emptyStateMessage}>{message}</Text>
      {actionButton}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.m,
    elevation: 2,
  },
  phraseCard: {
    marginBottom: spacing.s,
    elevation: 1,
  },
  japaneseText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  romajiText: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginBottom: spacing.xs,
  },
  englishText: {
    fontSize: 16,
  },
  primaryButton: {
    marginVertical: spacing.m,
    paddingVertical: spacing.xs,
  },
  secondaryButton: {
    marginVertical: spacing.m,
    paddingVertical: spacing.xs,
  },
  sectionHeader: {
    marginVertical: spacing.m,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: theme.colors.placeholder,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyStateMessage: {
    fontSize: 16,
    color: theme.colors.placeholder,
    textAlign: 'center',
    marginVertical: spacing.m,
  },
});
