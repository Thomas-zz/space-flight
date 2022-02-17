import { defineStore } from 'pinia'

export default defineStore({
  id: 'app',

  state() {
    return {
      pageInfo: [
        { name: '起航', href: '#home' },
        { name: '星辰', href: '#stars' },
        { name: '牧星人', href: '#human' },
        { name: '征途', href: '#journey' },
      ],
      name: 'haha',
    }
  },
})
