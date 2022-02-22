import request from '@/request'

export function getStarsMessage() {
  const url = `/starsMessage`
  return request.get(url)
}
