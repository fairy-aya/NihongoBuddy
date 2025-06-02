import { SpeechRecognitionResult } from '../types';

export class SpeechService {
  private static instance: SpeechService;
  private constructor() {}

  public static getInstance(): SpeechService {
    if (!SpeechService.instance) {
      SpeechService.instance = new SpeechService();
    }
    return SpeechService.instance;
  }

  async recognizeSpeech(audioBlob: Blob): Promise<SpeechRecognitionResult> {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);

      const response = await fetch('/api/speech/recognize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Speech recognition failed');
      }

      const result = await response.json();
      return this.analyzePronunciation(result);
    } catch (error) {
      console.error('Error in speech recognition:', error);
      throw error;
    }
  }

  private analyzePronunciation(result: any): SpeechRecognitionResult {
    // 仮の実装：実際は音声分析APIの結果に基づいて評価
    const accuracy = Math.random() * 0.3 + 0.7; // 70-100%の範囲でランダム
    
    return {
      accuracy: accuracy,
      pronunciationScore: {
        intonation: result.intonation || 0.8,
        accent: result.accent || 0.8,
        speed: result.speed || 0.8,
        clarity: result.clarity || 0.8,
      },
      feedback: {
        positive: [
          'Your pronunciation is clear and easy to understand',
          'Good effort on the intonation'
        ].filter(msg => Math.random() > 0.5), // 50%の確率で表示
        areasForImprovement: [
          'Try to make your intonation more natural',
          'Work on the clarity of certain sounds'
        ].filter(msg => Math.random() > 0.5),
        recommendations: [
          'Practice speaking slower to improve clarity',
          'Listen to native speakers more often'
        ].filter(msg => Math.random() > 0.5),
      }
    };
  }

  async playAudio(url: string): Promise<void> {
    try {
      const audio = new Audio(url);
      await audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
      throw error;
    }
  }

  async recordAudio(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const mediaRecorder = new MediaRecorder();
      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        resolve(audioBlob);
      };

      mediaRecorder.onerror = (event) => {
        reject(event.error);
      };

      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          mediaRecorder.start();
          setTimeout(() => {
            mediaRecorder.stop();
            stream.getTracks().forEach(track => track.stop());
          }, 5000); // 5秒録音
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
