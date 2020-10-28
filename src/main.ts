import * as core from '@actions/core'
import {Inputs, Reposter} from './repost-comment'

async function run(): Promise<void> {
  try {
    const inputs: Inputs = {
      checkOnlyFirstline: core.getInput('checkOnlyFirstline') === 'true',
      comment: core.getInput('comment'),
      issueNumber: Number(core.getInput('issue-number')),
      repository: core.getInput('repository'),
      token: core.getInput('token')
    }

    const reposter = new Reposter(inputs)
    await reposter.repostComment()
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
