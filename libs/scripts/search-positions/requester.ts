import axios from 'axios'

export const requester = ({ query }: { query: string }) => {
  return axios.get(
    'https://zakupki.mos.ru/newapi/api/SkuSearch/QueryAutocomplete',
    {
      params: {
        queryFilter: JSON.stringify({
          take: 5,
          filter: {
            keyword: query,
            productionDirectoryTreePathId: { value: '.1.', startsWith: true },
          },
          order: [{ field: 'relevance', desc: true }],
          withCount: true,
        }),
      },
    },
  )
}

export const getFullSearchLink = (query: string) =>
  `https://zakupki.mos.ru/catalog/goods/1/list?filter=${encodeURI(
    JSON.stringify({ keyword: query }),
  )}`

export const getImageSrc = (imageId: string | number) =>
  `https://zakupki.mos.ru/newapi/api/Core/Thumbnail/${imageId}/300/300`
