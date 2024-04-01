## Getting Started

After cloning repository install node packages:

```bash
npm install
```

Commands to run application:

```bash
# Development
npm run dev
<<<<<<< HEAD
<<<<<<< HEAD
# or
yarn dev
# or
pnpm dev
=======

# Production
npm run start
>>>>>>> 608a60e (Upgrading database schema with adding multiple service providers per client, by adding service provider type....)
=======

# Production
npm run start 
>>>>>>> feature/initial-db-merge
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Database setup

<<<<<<< HEAD
## Database setup

To learn more about Next.js, take a look at the following resources:
=======
Install prisma database server: https://www.postgresql.org/download/
>>>>>>> feature/initial-db-merge

Create empty database using pgAdmin application: [https://www.postgresql.org/ftp/pgadmin/pgadmin4/v7.6/windows/] (https://www.postgresql.org/ftp/pgadmin/pgadmin4/v7.6/windows/)

Generate prisma client: npx prisma generate

Generate migration: npx prisma migrate dev --name initialCreate

Apply migration to database: prisma migrate up


<<<<<<< HEAD
Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
Generate migration: npx prisma migrate dev --name initialCreate

Apply migration to database or create database if not exist: prisma migrate dev

Enable running scripts in windows (if commands regarding Prisma not work): Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
Disable running scripts in windows: Set-ExecutionPolicy Restricted -Scope CurrentUser
=======
>>>>>>> feature/initial-db-merge
