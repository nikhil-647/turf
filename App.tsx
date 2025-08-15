import './global.css';
import { Stack } from 'expo-router/stack';
import { useEffect } from 'react';
import { initializeApp } from './lib/init';

export default function App() {
  useEffect(() => {
    initializeApp();
  }, []);

  return <Stack />;
}
