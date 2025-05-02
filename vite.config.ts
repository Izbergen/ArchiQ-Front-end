import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import dotenv from "dotenv"

import process from 'process'

dotenv.config()


const PORT = parseInt(process.env.PORT  || '3000');
const HOST = process.env.HOST || 'localhost';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  preview: {
    allowedHosts: ['localhost', 'slyamgazy.kz'],
    port: PORT,
    host: HOST,

  },
})
