import type { NextApiRequest, NextApiResponse } from 'next'
import cmsClient from '@shared/pages-utils/cmsClient'
import { gql } from 'graphql-request'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { token, entryUid } = req.query

  const client = cmsClient(token || null)

  const pageQuery = gql`
		query($uid: [String]) {
			entry(uid: $uid) {
				id
				uri
				typeHandle
			}
		}
	`

  const data = await client.request(pageQuery, {
    uid: req.query.entryUid,
  })


  if (!data?.entry?.uri) {
    res.status(404).json({
      message: `URL of the entry ${req.query.entryUid} could not be fetched`,
    })
    return
  }


  const {
    entry: { uri, typeHandle },
  } = data

  const isHome = uri === '__home__' || uri === 'home';

  const location = `/${isHome ? '' : uri}`
  res.setPreviewData({
    token,
    entryUid,
    typeHandle,
  }).redirect(location).end('Preview Mode Enabled')



}
