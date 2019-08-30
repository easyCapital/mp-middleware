# Middleware

## Requirements

- Docker & Docker-compose

## Installation

1. Clone the repository

```bash
git clone git@github.com:robinfinance/middleware.git
```

2. Create a .env file from the example

```bash
cd middleware
cp .env.example .snv
```

3. Clone the infrastructure repository

```bash
cd ..
git clone git@github.com:robinfinance/infrastructure.git
```

4. Launch the containers

```bash
docker-compose up -d
```

5. Add the following line to your `hosts` file

```
127.0.0.1    middleware.local
```

6. Go to `http://middleware.local`

## Typescript

The project is writting in Typescript, so please respect the Typescript rules

## Pre-commit

There is a pre-commit for this project which checks multiple things before commiting

- Linter: We use `tslint`, so any linter errors will prevent the commit.
- Message format: We use `commitlint` to verify the commit message.
- Automatic code formatting: We use `prettier`.
