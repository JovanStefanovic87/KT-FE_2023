## Getting Started

After cloning repository install node packages:

```bash
npm install
```

Commands to run application:

```bash
# Development
npm run dev

# Production
npm run start 
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Database setup

Install prisma database server: https://www.postgresql.org/download/

Create empty database using pgAdmin application: [https://www.postgresql.org/ftp/pgadmin/pgadmin4/v7.6/windows/] (https://www.postgresql.org/ftp/pgadmin/pgadmin4/v7.6/windows/)

Generate prisma client: npx prisma generate

Generate migration: npx prisma migrate dev --name initialCreate

Apply migration to database: prisma migrate up


