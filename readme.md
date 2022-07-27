This monorepo tries out _piping and currying_ in an attempt to get a code style similar to method chaining which was removed in Firebase JS SDK v9.

Requirements:
- Docker
- VS Code with the [Remote Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) plugin

## Setting up
- `git clone`
- `docker-compose up -d`. You are now running an idle Node 18 container & Firebase Emulator.
- VS Code: _Attach to Running Container..._ -> _dev_
- `cd` into `fb8/` or `fb9/`
- `yarn install`
- Play arround with `firebase.spec.js`
- `yarn test`
