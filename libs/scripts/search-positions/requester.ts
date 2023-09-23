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
