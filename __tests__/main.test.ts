import {Inputs, Reposter} from '../src/repost-comment'

let defaultInputs: Inputs = {
  comment: 'Test',
  issueNumber: 1,
  checkOnlyFirstLine: false,
  repository: 'KeisukeYamashita/repost-comment',
  token: 'test-token'
}

test('dummy test', () => {
  expect(1).toBe(1)
})
