import { ContentHandler, PreHandleResult } from '../content-handler'

export class GolangHandler extends ContentHandler {
  constructor() {
    super()
    this.senderRegex = /<.+@golangweekly.com>/
    this.urlRegex = /<a href=["']([^"']*)["'].*>Read on the Web<\/a>/
    this.name = 'golangweekly'
  }

  shouldPreHandle(url: string, dom?: Document): boolean {
    const host = this.name + '.com'
    // check if url ends with golangweekly.com
    return new URL(url).hostname.endsWith(host)
  }

  async preHandle(url: string, dom: Document): Promise<PreHandleResult> {
    const body = dom.querySelector('body')

    // this removes the "Subscribe" button
    body?.querySelector('.el-splitbar')?.remove()
    // this removes the title
    body?.querySelector('.el-masthead')?.remove()

    return Promise.resolve({ dom })
  }
}
