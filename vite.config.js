// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        detail: resolve(__dirname, './detail/detail.html'),
        actorInfo: resolve(__dirname, './actorInfo/actorInfo.html'),
        searchedMovies: resolve(__dirname, './searchedMovies/searchedMovies.html')
      },
    },
  },
})