[![ci](https://github.com/leondelaimy/nx-monorepo-example/actions/workflows/ci.yml/badge.svg)](https://github.com/leondelaimy/nx-monorepo-example/actions/workflows/ci.yml)

# Nx Monorepo Example

## Requirements

- Node
- pnpm
- Go
- Nx
- Docker

## Contents
- [Install dependencies](#install-dependencies)
- [Run tasks](#run-tasks)
- [Custom run commands](#custom-run-commands)
- [Add new projects](#add-new-projects)
- [CI/CD pipelines](#ci--cd-pipelines)
- [Conventional commits](#conventional-commits)
- [Troubleshooting](#troubleshooting)

## Install dependencies

To install node packages, run:
```sh
pnpm i
```

## Run tasks

To run tasks with Nx use:

```sh
nx <target> <project-name>
```

Targets include `serve`, `lint`, `test` and `build` (depending on the project - see their `project.json`)

Currently services / packages include

### Backend
- `go_1`
- `go_2`

### Frontend
- `typescript-react`

### Shared libraries
- `go_lib_1`
- `typescript_lib`

For example you can run them individually:

```sh
nx serve go_1
nx serve typescript-react

nx lint go_1
nx lint typescript-react

nx test go_1
nx test typescript-react

nx build go_1
nx build typescript-react
```

Or run them all

```sh
nx run-many -t lint test build
```

Or run only those that have been changed

```sh
nx affected -t lint test build
```

## Custom run commands

You can also define custom run commands (depending on the project - see their `project.json`)

For example, to build Docker containers:

```json
...
"container": {
      "executor": "nx:run-commands",
      "options": {
        "command": "docker build -t ghcr.io/field/spring-os-tracking -f services/tracking/Dockerfile ."
      }
    }
...
```

And to execute run:

```sh
nx container go_1
```

## Add new projects

There is an ecosystem of plugins that can be used to make code generation easier for initial setup

> [!NOTE]
> These are usually community built and could be opinionated. Try them and see if generated code fits our use case. The least required set up can be achieved by adding a `project.json` and `package.json`

```sh
npx nx add @nx/go
```

Use the plugin's generator to create new projects. For example, to create a Go project:

```sh
# Generate an app
npx nx g @nx-go/nx-go:application services/go-new-service

# Generate a library
npx nx g @nx-go/nx-go:library services/go-new-library
```

## CI / CD Pipelines

Workflows found in `.github`

- `ci.yml`
- `pr.yml`
- reusable setup `action.yml`

## Conventional Commits

To trigger a release, squash a PR with the following commit format:

```
<version_type>(<project_name>): commit message
```

- `fix` prefix correlates to `PATCH`
- `feat` prefix correlates to `MINOR`
- `fix!` or `feat!` correlates to `MAJOR`
- `chore` or `docs` are also allowed and will not trigger CI

For example a release will trigger with the following commit message:

```
fix(backend/go_1): patch release
feat(frontend/typescript_react): minor release
fix!(backend/go_2): major release
```

But not for the following:
```
docs: update README
chore: tidy up
ci: test ci
```

For further information see https://www.conventionalcommits.org/en/v1.0.0/

## Troubleshooting

Sometimes the node environment can get out of sync, to clean up run:
```sh
pnpm clean
# reinstall dependencies
pnpm i
```

Sometimes the nx dependency graph can get out of sync, to reset run:
```sh
nx reset
```
