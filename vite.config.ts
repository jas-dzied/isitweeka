import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://jas-dzied.github.io/isitweeka/',
  plugins: [react()],
})
