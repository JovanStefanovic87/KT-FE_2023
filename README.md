## Getting Started

After cloning repository install node packages:

```bash
npm install
```

Commands to run application:

```bash
# Development
npm run dev
# or
yarn dev
# or
pnpm dev

=======

# Production
npm run start

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database and DB tool installation

1. Install prisma database server, and set password used in this project: https://www.postgresql.org/download/

2. Install pgAdmin application, and set same password as in first step: [https://www.postgresql.org/ftp/pgadmin/pgadmin4/v7.6/windows/]

## Create database from project migrations

Apply migration to database or create database if not exist:

```bash
prisma migrate dev
```

## Prisma scripts does not work in terminal

Execute in Command Prompt or PowerShell:

Enable running scripts in windows (execute in Command Prompt or PowerShell):

```bash
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Disable running scripts in windows if needed for security reasons:

```bash
Set-ExecutionPolicy Restricted -Scope CurrentUser
```

## Prisma setup for new project only

1. Install Prisma CLI globally:

```bash
npm install prisma -g
```

2. Initialize a new Prisma project:

```bash
npx prisma init
```

3. Configure Prisma schema file ('schema.prisma') created in initialization (example)

```bash
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Company {
  id Int @id @default(autoincrement())
  name String @db.VarChar(100)
  serviceProviders ServiceProvider[]
}
```

4. Generate Prisma client (this is needed every time prisma schema changes)

```bash
npx prisma generate
```

5. Generate migration:

```bash
npx prisma migrate dev --name <migration-name>
```
