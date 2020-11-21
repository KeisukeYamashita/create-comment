import * as core from '@actions/core'
import * as github from '@actions/github'
import {inspect} from 'util'

export interface Inputs {
  checkOnlyFirstLine: boolean
  comment: string
  unique: boolean
  number: number
  repository: string
  token: string
}

export class Reposter {
  private checkOnlyFirstLine: boolean
  private comment: string
  private unique: boolean
  private number: number
  private owner: string
  private repo: string
  private token: string

  constructor(inputs: Inputs) {
    this.checkOnlyFirstLine = inputs.checkOnlyFirstLine
    this.number = inputs.number
    this.comment = inputs.comment
    this.unique = inputs.unique

    const [owner, repo] = inputs.repository.split('/')
    this.owner = owner
    this.repo = repo
    this.token = inputs.token
  }

  async repostComment(): Promise<void> {
    const client = github.getOctokit(this.token)
    const {data: comments} = await client.issues.listComments({
      owner: this.owner,
      repo: this.repo,
      issue_number: this.number
    })

    if (this.unique) {
      for (const comment of comments) {
        if (this.checkOnlyFirstLine) {
          const oldFirstLine = comment.body.split('\n')[0]
          const newFirstLine = this.comment.split('\n')[0]
          if (oldFirstLine === newFirstLine) {
            await client.issues.deleteComment({
              owner: this.owner,
              repo: this.repo,
              comment_id: comment.id
            })

            core.debug(
              `matched first oldline:"${oldFirstLine}" and newline:"${newFirstLine}" of comment:${comment.id}`
            )
            core.setOutput('match-first-line', true)
            core.setOutput('deleted-comment-id', comment.id)
            core.setOutput('deleted-comment', true)
            break
          }
        }

        if (comment.body === this.comment) {
          await client.issues.deleteComment({
            owner: this.owner,
            repo: this.repo,
            comment_id: comment.id
          })

          core.debug(
            `matched ${inspect(comment.body)} of comment:${comment.id}`
          )
          core.setOutput('match-first-line', false)
          core.setOutput('deleted-comment-id', comment.id)
          core.setOutput('deleted-comment', true)
          break
        }
      }
    }

    const {data: createCommentResponse} = await client.issues.createComment({
      owner: this.owner,
      repo: this.repo,
      issue_number: this.number,
      body: this.comment
    })

    core.setOutput('comment-id', createCommentResponse.id)
  }
}

export default {
  Reposter
}
