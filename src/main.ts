import * as core from '@actions/core'
import * as github from '@actions/github'
import {inspect} from 'util'
import {Inputs, Reposter} from './repost-comment'

async function run(): Promise<void> {
  try {
    const inputs: Inputs = {
      checkOnlyFirstLine: core.getInput('check-only-first-line') === 'true',
      comment: core.getInput('comment', {required: true}),
      unique: core.getInput('unique') === 'true',
      number:
        core.getInput('number', {required: true}) === ''
          ? github.context.issue.number
          : Number(core.getInput('number')),
      repository: core.getInput('repository', {required: true}),
      token: core.getInput('token', {required: true})
    }

    core.debug(`Inputs: ${inspect(inputs)}`)

    const reposter = new Reposter(inputs)
    await reposter.repostComment()
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
