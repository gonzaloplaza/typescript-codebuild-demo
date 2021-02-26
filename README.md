# TypeScript CodeBuild Demo

[![made-with-typescript](https://img.shields.io/badge/Made%20with-TypeScript-1f425f.svg)](https://www.typescriptlang.org/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/gonzaloplaza/typescript-codebuild-demo/graphs/commit-activity)

Sample TypeScript+Express demo with Jest and AWS CodeBuild specs for testing and ECR image creation.

## Installation

```sh
# Install dependencies
npm install

# Start typescript server (ts-node)
npm run start

# Build JS
npm run build

# Execute tests and generate coverage
npm run test
npm run coverage
```

## Build Docker image

```sh
# Generate Docker image
docker build --no-cache -t typescript-codebuild-demo .

# Run container in background
docker run --rm -d -p 8080:8080 --name typescript-codebuild-demo typescript-codebuild-demo
```

## Access service

You can access local container running on [http://localhost:8080](http://localhost:8080)

```json
{
  "success": true,
  "message": "Hello World"
}
```

## Stop and remove container

```sh
docker stop typescript-codebuild-demo
```
