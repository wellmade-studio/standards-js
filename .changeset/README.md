# Changesets

This directory holds [changesets](https://github.com/changesets/changesets) for the three
`@wellmade/*` packages.

Add a changeset by running `npx changeset` and following the prompts. The CI release workflow
will open or update a release PR that, when merged, runs `changeset publish` and ships the
selected packages to npm.
