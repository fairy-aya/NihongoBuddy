import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// スクリーンのプレースホルダー
// 実際の実装では、これらは実際のコンポーネントにインポートされます
const HomeScreen = () => null;
const LearningScreen = () => null;
const PracticeScreen = () => null;
const PairScreen = () => null;
const ProfileScreen = () => null;
const LoginScreen = () => null;
const RegisterScreen = () => null;
const CategoryDetailScreen = () => null;
const PhraseDetailScreen = () => null;
const QuizScreen = () => null;
const PronunciationScreen = () => null;
const SharedPhrasebookScreen = () => null;
const DiaryScreen = () => null;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
    <Stack.Screen name="PhraseDetail" component={PhraseDetailScreen} />
  </Stack.Navigator>
);

const LearningStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Learning" component={LearningScreen} />
    <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
    <Stack.Screen name="PhraseDetail" component={PhraseDetailScreen} />
  </Stack.Navigator>
);

const PracticeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Practice" component={PracticeScreen} />
    <Stack.Screen name="Quiz" component={QuizScreen} />
    <Stack.Screen name="Pronunciation" component={PronunciationScreen} />
  </Stack.Navigator>
);

const PairStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Pair" component={PairScreen} />
    <Stack.Screen name="SharedPhrasebook" component={SharedPhrasebookScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Diary" component={DiaryScreen} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'HomeTab') {
          iconName = 'home';
        } else if (route.name === 'LearningTab') {
          iconName = 'book-open-variant';
        } else if (route.name === 'PracticeTab') {
          iconName = 'pencil';
        } else if (route.name === 'PairTab') {
          iconName = 'account-group';
        } else if (route.name === 'ProfileTab') {
          iconName = 'account';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen 
      name="HomeTab" 
      component={HomeStack} 
      options={{ title: 'ホーム' }}
    />
    <Tab.Screen 
      name="LearningTab" 
      component={LearningStack} 
      options={{ title: '学習' }}
    />
    <Tab.Screen 
      name="PracticeTab" 
      component={PracticeStack} 
      options={{ title: '練習' }}
    />
    <Tab.Screen 
      name="PairTab" 
      component={PairStack} 
      options={{ title: 'ペア' }}
    />
    <Tab.Screen 
      name="ProfileTab" 
      component={ProfileStack} 
      options={{ title: 'プロフィール' }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return isAuthenticated ? <MainTabs /> : <AuthStack />;
};

export default AppNavigator;
