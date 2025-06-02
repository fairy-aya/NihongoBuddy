import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, Title, Paragraph } from 'react-native-paper';
import { theme, spacing } from '../constants/theme';

// ホーム画面のプレースホルダー実装
const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>ようこそ、Nihongo Tandemへ</Text>
        <Text style={styles.subtitleText}>共に学び、共に成長する</Text>
      </View>
      
      <Card style={styles.card}>
        <Card.Content>
          <Title>今日の学習を始めましょう</Title>
          <Paragraph>継続は力なり。毎日の学習が日本語上達の鍵です。</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained">学習を開始</Button>
        </Card.Actions>
      </Card>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>おすすめカテゴリ</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['日常挨拶編', '自己紹介編', '数字編', '買い物編', 'レストラン編'].map((category, index) => (
            <Card key={index} style={styles.categoryCard}>
              <Card.Content>
                <Title>{category}</Title>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>復習が必要なフレーズ</Text>
        <Card style={styles.phraseCard}>
          <Card.Content>
            <Title style={styles.japaneseText}>おはようございます</Title>
            <Paragraph style={styles.romajiText}>Ohayou gozaimasu</Paragraph>
            <Paragraph>Good morning</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.phraseCard}>
          <Card.Content>
            <Title style={styles.japaneseText}>ありがとうございます</Title>
            <Paragraph style={styles.romajiText}>Arigatou gozaimasu</Paragraph>
            <Paragraph>Thank you</Paragraph>
          </Card.Content>
        </Card>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>パートナーとの学習</Text>
        <Card style={styles.card}>
          <Card.Content>
            <Title>パートナーを招待しましょう</Title>
            <Paragraph>友達や家族と一緒に学ぶと、より効果的に日本語を習得できます。</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button mode="outlined">招待する</Button>
          </Card.Actions>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: spacing.l,
    backgroundColor: theme.colors.primary,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitleText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: spacing.xs,
  },
  card: {
    margin: spacing.m,
  },
  section: {
    marginVertical: spacing.m,
    paddingHorizontal: spacing.m,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.s,
    color: theme.colors.primary,
  },
  categoryCard: {
    width: 150,
    marginRight: spacing.m,
  },
  phraseCard: {
    marginBottom: spacing.m,
  },
  japaneseText: {
    fontSize: 18,
  },
  romajiText: {
    fontSize: 14,
    color: theme.colors.placeholder,
  },
});

export default HomeScreen;
