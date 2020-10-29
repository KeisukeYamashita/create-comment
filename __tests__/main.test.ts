import {Inputs, Reposter} from '../src/repost-comment'

let defaultInputs: Inputs = {
  comment: 'Test',
  number: 1,
  checkOnlyFirstLine: false,
  repository: 'KeisukeYamashita/repost-comment',
  token: 'test-token',
  unique: true
}

test('dummy test', () => {
  expect(1).toBe(1)
})
