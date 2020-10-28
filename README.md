# Create Comment
[![CI](https://github.com/KeisukeYamashita/create-comment/workflows/build-test/badge.svg)](https://github.com/KeisukeYamashita/create-comment/actions?query=workflow%3Abuild-test)
[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Create%20Comment-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAM6wAADOsB5dZE0gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAERSURBVCiRhZG/SsMxFEZPfsVJ61jbxaF0cRQRcRJ9hlYn30IHN/+9iquDCOIsblIrOjqKgy5aKoJQj4O3EEtbPwhJbr6Te28CmdSKeqzeqr0YbfVIrTBKakvtOl5dtTkK+v4HfA9PEyBFCY9AGVgCBLaBp1jPAyfAJ/AAdIEG0dNAiyP7+K1qIfMdonZic6+WJoBJvQlvuwDqcXadUuqPA1NKAlexbRTAIMvMOCjTbMwl1LtI/6KWJ5Q6rT6Ht1MA58AX8Apcqqt5r2qhrgAXQC3CZ6i1+KMd9TRu3MvA3aH/fFPnBodb6oe6HM8+lYHrGdRXW8M9bMZtPXUji69lmf5Cmamq7quNLFZXD9Rq7v0Bpc1o/tp0fisAAAAASUVORK5CYII=)](https://github.com/marketplace/actions/create-comment)

A GitHub Action that post comment on a GitHub Issue or Pull Request.
If the same content is posted before, this action will delete the existing one and post a new one.

This action extract the number from an issue or a pull request which has triggered this by default. You don't need to specify the issue number by `${{ github.event.issue.number }}` or `${{ github.event.pull_request.number }}` if you want to post to its issue or pull request.

## Usage

```yml
      - name: Create Comment
        uses: KeisukeYamashita/create-comment@v1
        with:
          number: 1
          comment: Comment for Issue or GitHub Pull Request
```

### Close issues where the title does not match a specified prefix

This is just an example to show one way in which this action can be used.

```yml
on: push
jobs:
  commit-message-check:
    runs-on: ubuntu-latest
    steps:
      - name: Post comment
        uses: KeisukeYamashita/create-comment@v1
        with:
          comment: |
            Issue title must start with 'ABC-'.
            Auto-closing this issue.
```

### Action inputs

| Name | Description | Default |
| --- | --- | --- |
| `check-only-first-line` | If `true`, If the first line is same, it is considered to be the same post. It works when `unique` is `true`. | `false` |  
| `comment` | Comment to post. | - (Required) |
| `unique` | If `true`, existing comment with same body will be deleted. | `true` |
| `number` | The number of the issue to post. | `github.event.issue.number` |
| `repository` | The GitHub repository containing the issue or pr. | Current repository |
| `token` | `GITHUB_TOKEN` or a `repo` scoped [PAT](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token). | `GITHUB_TOKEN` |

### Action outputs

| Name | Description |
| --- | --- | --- |
| `deleted-comment` | If there was existing same comments or not that was deleted |
| `deleted-comment-id` | The deleted comment ID | 
| `comment-id` | The posted comment ID | 
| `match-first-line` | If match first line or not | 

### Accessing issues in other repositories

You can close issues in another repository by using a [PAT](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) instead of `GITHUB_TOKEN`.
The user associated with the PAT must have write access to the repository.

## Acknowledgement
I've derived the design for this action from @peter-evans's GitHub Actions.
Thanks to @perter-evans and the contributors for all the hard work and sharing it as an opensource project.

## License

[MIT](LICENSE)
