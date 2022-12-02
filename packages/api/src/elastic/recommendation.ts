import { Page, PageContext, Recommendation } from './types'
import { createPage, getPageByParam, updatePage } from './pages'

export const addRecommendation = async (
  ctx: PageContext,
  page: Page,
  recommendation: Recommendation
): Promise<string | undefined> => {
  try {
    // check if the page is already recommended to the group
    const existingPage = await getPageByParam({
      userId: ctx.uid,
      url: page.url,
    })
    if (existingPage) {
      if (existingPage.recommendedBy?.includes(recommendation)) {
        return existingPage._id
      }

      // update recommendedBy in the existing page
      const recommendedBy = (existingPage.recommendedBy || []).concat(
        recommendation
      )

      await updatePage(
        existingPage.id,
        {
          recommendedBy,
        },
        ctx
      )
      return existingPage.id
    }

    // create a new page
    const newPage: Page = {
      ...page,
      id: '',
      recommendedBy: [recommendation],
      userId: ctx.uid,
      readingProgressPercent: 0,
      readingProgressAnchorIndex: 0,
      sharedAt: new Date(),
      highlights: [],
      readAt: undefined,
      labels: [],
    }

    return createPage(newPage, ctx)
  } catch (err) {
    console.error(err)
  }
}
