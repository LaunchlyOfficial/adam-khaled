export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  databaseURL: string;
  measurementId?: string;
}

export interface AnalyticsEvent {
  name: string;
  params?: {
    [key: string]: any;
  };
}