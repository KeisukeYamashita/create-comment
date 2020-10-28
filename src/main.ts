import * as core from '@actions/core'
import * as github from '@actions/github';
import {Inputs, Reposter} from './repost-comment'

async function run(): Promise<void> {
  try {
    const inputs: Inputs = {
      checkOnlyFirstLine: core.getInput('check-only-first-line') === 'true',
      comment: core.getInput('comment'),
      number: core.getInput('number') === '' ? github.context.issue.number : Number(core.getInput('number')),
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
