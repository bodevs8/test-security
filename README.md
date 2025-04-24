# T08LEGA

## Table of contents

### Project Structure

    ├── public                  # Public static assets
    ├── environments            # Deploy environments
    ├── src
    │   ├── app                 # NextJS App
    │   ├── components          # React Components
    │   ├── modals              # Modal view
    │   ├── constant            # Config constants
    │   ├── containers          # Container subview for page ( include by component view, modal view, etc... )
    │   ├── contexts            # React context
    │   ├── enums               # Define enums
    │   ├── hooks               # React hooks
    │   ├── i18n                # Multiple languages
    │   ├── stores              # Zustand stores
    │   ├── providers           # React providers
    │   ├── services            # Api services
    │   ├── styles              # Define styles with scss files
    │   ├── types               # Define types for each module
    │   ├── utils               # Define helper functions
    ├── .env                    # ENV config
    ├── .env.example            # ENV config info ( helpful clone to .env file )
    ├── .eslintrc               # EsLint config
    ├── .prettierignore         # Ignore validate Prettier some files
    ├── .prettierrc             # Prettier config
    ├── package.json
    ├── tsconfig.json           # Typescript config
    ├── yarn.lock
    └── ...

### Install project dependencies

- Install [Yarn](https://yarnpkg.com/) latest version
- Install Nodejs 20 ( Should be use [NVM](https://github.com/nvm-sh/nvm) for install NodeJS )

### Install package dependencies for Editor tool

- Typescript
- EsLint
- Prettier

### Builder Info

- nextJS 15
- react 19
- tailwind 4
- shadcn
- react-query
- zustand
- react-hook-form

### Run project

- Use nodejs version 20
- `Clone .env.development to .env file`

```
APP_URL=
API_BASE_URL=
NEXT_PUBLIC_WS_URL=
```

- Install node_modules `yarn install`
- Run server-dev local `yarn dev`
  - `NODE_ENV=development`
- Build production `yarn build`
  - `NODE_ENV=production`

```
### Before do task
* Please create new brand with your issue.
* Please pull new code from **develop** brand before checkout your brand
* Branch naming
  - feat/T08LEGA-xxx
  - fix/T08LEGA-xxx
  - refactor/T08LEGA-xxx
  - docs/T08LEGA-xxx
  - style/T08LEGA-xxx
  - perf/T08LEGA-xxx
  - vendor/T08LEGA-xxx
  - chore/T08LEGA-xxx

### Before commit
* Please don't include anything that not been developed by you.
* Please don't commit anything that can be regenerated from other things that were committed such as node_modules.
* Your code, you must be cleanup and please check format code before commit ( tabs, spaces, blank )
* In your message commit, please reference your issue for review task. Ex: `git commit -m"feat(T08LEGA-1): Message`
* Commit message `MUST` clean ( commit code detail, message fix bug, etc... ) [How to write good message](https://chris.beams.io/posts/git-commit/)
* Please using **develop** brand for development and don't use **master** brand.

### Optional commit
* Merge code from **develop** brand and if conflict please fix conflict.

### Before push
* Make sure eslint / tslint has verified ( please don't use git commit option `--no-verify` )
* Don't use `git rebase` `git reset` `git force`

### Gitlab target
* Create new pull request with your brand and merge to **develop** brand.
* Add reviewers for review your pull request.
* When you create new pull request if you see conflict, please decline pull request and fix.
```
