export default function customImageLoader({ src, width, quality }) {
  if (src.startsWith('http')) {
    return src
  }
  // For production, use the full URL
  if (process.env.NODE_ENV === 'production') {
    return `https://zone-shop.netlify.app${src}?w=${width}&q=${quality || 75}`;
  }
  // For development, use relative path
  return `${src}?w=${width}&q=${quality || 75}`;
}
