import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
export default defineConfig(({command, mode, ssrBuild}) => { 
  if (mode == 'production')  {
    return {
      plugins: [react()],
      base:'/restaurant/',
      envDir:'src',
      envPrefix:'ENV_',
    }
  } else {
    return {
      plugins: [react()],
      envDir:'src',
      envPrefix:'ENV_',
      
      server: {
            host: '192.168.1.39',
            port: process.env.PORT || 3000,
          },
    }
  }
  
}
  
)
