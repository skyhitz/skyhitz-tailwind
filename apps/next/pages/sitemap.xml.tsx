import { blogIndex, ratingEntriesIndex, usersIndex } from 'app/api/algolia'
import { Hit } from '@algolia/client-search'
import { Entry, PublicUser } from 'app/api/graphql'
import { Post } from 'app/types'
import { GetServerSideProps } from 'next'

//pages/sitemap.xml.js
const SITE_URL = 'https://skyhitz.io'

const ROUTES = ['/dashboard/chart', '/dashboard/search', '/blog']

function generateSiteMap({
  posts,
  users,
  entries,
}: {
  posts: Hit<Post>[]
  users: Hit<PublicUser>[]
  entries: Hit<Entry>[]
}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${`${SITE_URL}`}</loc>
     </url>
    ${ROUTES.map((route) => {
      return `
        <url>
            <loc>${`${SITE_URL}${route}`}</loc>
        </url>
    `
    }).join('')}
    
     ${posts
       .map(({ id }) => {
         return `
       <url>
           <loc>${`${SITE_URL}/blog/${id}`}</loc>
       </url>
     `
       })
       .join('')}

    ${users
      .map(({ id }) => {
        return `
        <url>
            <loc>${`${SITE_URL}/dashboard/collector/${id}`}</loc>
        </url>
      `
      })
      .join('')}

    ${entries
      .map(({ id }) => {
        return `
            <url>
                <loc>${`${SITE_URL}/dashboard/beat/${id}`}</loc>
            </url>
          `
      })
      .join('')}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const [{ hits: entries }, { hits: posts }, { hits: users }] =
    await Promise.all([
      await ratingEntriesIndex.search<Entry>(''),
      await blogIndex.search<Post>(''),
      await usersIndex.search<PublicUser>(''),
    ])

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap({ entries, posts, users })

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
