import { Helmet } from 'react-helmet-async'

function MetaComponent({
  title = 'A-Z Store || E-Commerce',
  description = 'Shop the best products online at AccioJob E-Commerce. Fast delivery, secure payments, and great deals every day!',
  keywords = 'e-commerce, online shopping, deals, AccioJob, buy online, shop',
  image = '/images/logo.png',
  url = 'https://atoz-store.onrender.com/'
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

export default MetaComponent

