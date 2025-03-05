<div align="center">
  <br />
    <a href="https://github.com/mlamine300/bibliotheque-app" target="_blank">
      <img src="https://ik.imagekit.io/lamine300/Slice%201.png" alt="Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="next.js" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logoColor=white&logo=postgresql&color=4169E1" alt="postgresql" />
    <img src="https://img.shields.io/badge/-Upstash-black?style=for-the-badge&logoColor=white&logo=upstash&color=00E9A3" alt="upstash" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>

  <h3 align="center">A University Library Management System with Admin Panel</h3>

   <div align="center">
Manage university Library, Create Your Account, log in, Borrowed, read and view Books, log to Admin dashboard Manage Users, Add, Delete and Update users and books Users requests and more
    </div>
</div>




## <a name="introduction">🤖 Introduction</a>

Developed using Next.js, TypeScript, and Postgres, the Bibliotheque App Management System is a high-performance platform designed for both public users and administrators. It provides a seamless book borrowing experience with reminders and receipts, comprehensive user management, automated workflows, and a cutting-edge tech stack optimized for scalability and real-world use.



## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- PostgreSQL
- Upstash
- ImageKit
- TypeScript
- Tailwind CSS

## <a name="features">🔋 Features</a>

### Features of the Bibliotheque App Management System Project

👉 **Open-source Authentication**: Personalized onboarding flow with email notifications.  

👉 **Home Page**: Highlighted books and newly added books with 3D effects.  

👉 **Library Page**: Advanced filtering, search, and pagination for book discovery.  

👉 **Book Detail Pages**: Availability tracking, book summaries, videos, and suggestions for similar books.  

👉 **Profile Page**: Manage accounts, track borrowed books, and download receipts.  

👉 **Onboarding Workflows**: Automated welcome emails when users sign up, with follow-ups based on inactivity or activity dates.  

👉 **Borrow Book Reminder**: Customized email notifications sent before, on, and after the due date, reminding users to return books or avoid charges. 

👉 **Borrow Book Receipt**: Automatically generates a customized PDF receipt when a book is successfully borrowed.  

👉 **Analytics Dashboard**: Statistics, new users, books, borrow requests, and more.  

👉 **All Users Page**: View and manage users, including approving or revoking access.  

👉 **Account Requests Page**: Admin approval for account requests, with email notifications for user verification.  

👉 **All Books Page**: List and manage all library books with advanced search, pagination, and filters. 

👉 **Book Management Forms**: Add new books and edit existing entries.  

👉 **Book Details Page**: Detailed book information for administrators.  

👉 **Borrow Records Page**: Complete borrow history with pagination and search.  

👉 **Role Management**: Change user roles to invite more admins, with email notifications sent upon role updates. 

👉 **Advanced Functionalities**: Caching, rate-limiting, DDoS protection, and custom notifications.  

👉 **Database Management**: Postgres with Neon for scalable and collaborative database handling.  

👉 **Real-time Media Processing**: ImageKit for image and video optimization and transformations. 

👉 **Efficient Caching**: Upstash Redis for caching, workflows, and triggers.  

👉 **Database ORM**: Drizzle ORM for simplified and efficient database interactions.  

👉 **Modern UI/UX**: Built with TailwindCSS, ShadCN, and other cutting-edge tools.  

👉 **Technology Stack**: Next.js with TypeScript for scalable development, and NextAuth for robust authentication.  

👉 **Seamless Email Handling**: nodemailer for automated email communications, including notifications and updates.  

and many more, including code architecture and reusability 

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/adrianhajdin/university-library-jsm.git
cd university-library-jsm
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
NEXT_PROD_API_ENDPOINT=
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=
NEXT_PUBLIC_IMAGEKIT_PUBLICKEY=
IMAGEKIT_PRIVATEKEY=
NEXT_PUBLIC_API_ENDPOINT=
DATABASE_URL=
AUTH_SECRET=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
UPSTASH_QSTASH_URL=
UPSTASH_QSTASH_TOKEN=
NEXT_PUBLIC_NODEMAILER_EMAIL_ADRESS=
NEXT_PUBLIC_NODEMAILER_EMAIL_PASS=

```

Replace the placeholder values with your actual ImageKit, NeonDB, and Upstash credentials. You can obtain these credentials by signing up on the [ImageKit](https://imagekit.io/), [NeonDB](https://fyi.neon.tech/) and [Upstash](https://upstash.com/). 

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.



