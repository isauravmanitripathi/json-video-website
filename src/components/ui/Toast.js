// src/components/ui/Toast.js
'use client';
import { Toaster } from 'react-hot-toast';

export default function ToastWrapper() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#333',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
        },
        success: {
          style: {
            background: '#059669',
          },
        },
        error: {
          style: {
            background: '#DC2626',
          },
        },
      }}
    />
  );
}