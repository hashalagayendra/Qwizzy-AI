# Qwizzy-AI

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1.8-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.9.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-API-4285F4?style=for-the-badge&logo=google&logoColor=white)

**Qwizzy-AI** is an advanced AI-powered platform designed to streamline the process of creating, assigning, and taking assessments. Leverage the power of Google Gemini to automatically generate comprehensive quizzes from your documents (PDFs) or raw text, manage exam papers, and track user performance seamlessly.

> 🌟 **Live Demo**: [Access Qwizzy-AI Here](https://qwizzy-ai.vercel.app/)
>
> 👨‍💻 **Portfolio & Details**: [Check out my Portfolio](https://hasalagayendra.vercel.app/Projects/QwizzyAI)

## 🚀 Features

- 🤖 **AI-Powered Question Generation**: Instantly generate quizzes from uploaded PDFs or text content using Google Generative AI.
- 📝 **Smart Paper Management**: Create detailed exam papers with custom titles, descriptions, and strict time limits.
- 👥 **Assignment System**: Easily assign papers to specific users (students/employees) and track assignment status (Pending, Completed, Failed).
- ⏱️ **Timed Examinations**: Enforce time constraints on assessments to simulate real exam conditions.
- 📊 **Performance Tracking**: View marks and status updates for assigned papers.
- 🔒 **Secure Authentication**: Robust user authentication system powered by NextAuth.
- 🎨 **Modern & Responsive UI**: A sleek, user-friendly interface built with Tailwind CSS and Lucide React icons.

## 📖 User Workflows

### 1. 🔐 Authentication

- **Sign Up/Login**: Users (Teachers or Students) must log in to access the platform.
- **Secure Access**: Powered by NextAuth.js to ensure user data protection.

### 2. 🏠 Dashboard

- **Overview**: The central hub where users can see their activities.
- **My Papers**:
  - **Created Papers**: Papers you have made.
  - **Answered Papers**: Papers you have completed.
  - **Papers Assigned to You**: Pending assessments waiting for you.
- **Make Your Paper**: A prominent button to start the paper creation process.

### 3. 📝 Creating a Paper (Teacher/Admin)

1.  **Initiate**: Click on "Make Your Paper" in the dashboard.
2.  **Paper Details**: Enter the **Paper Name**, **Description**, and **Time Limit** (in minutes).
3.  **Assign Users**: Select specific users to assign the paper to, or assign it to everyone.
4.  **Add Questions**:
    - **Manual Mode**: Add Multiple Choice Questions (MCQs) one by one.
    - **AI Mode**: Use the "AI Generate" button to upload a PDF or paste text. Google Gemini will automatically generate questions for you.
5.  **Save**: Once finished, save the paper. It will immediately appear in the assignees' dashboards.

### 4. ✍️ Taking an Exam (Student/User)

1.  **Select Paper**: Go to "Papers Assigned to You" and click on a paper.
2.  **Start**: Review the instructions and click "Start Paper".
3.  **Timed Test**: A timer counts down based on the limit set by the creator.
4.  **Submit**: Answers are auto-submitted when the time runs out, or can be submitted manually.

### 5. 📊 Viewing Results

- **Instant Grading**: The system automatically grades the MCQs.
- **Review**: Go to "Answered Papers" to see your score.
- **Detailed Report**: Click on a completed paper to view which answers were correct or incorrect.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: Next.js API Routes, [Prisma ORM](https://www.prisma.io/)
- **Database**: PostgreSQL (configured via Prisma)
- **AI Integration**: [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **PDF Processing**: `react-pdf/renderer`, `html2canvas`, `jspdf`, `react-pdftotext`

## 📦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm, yarn, pnpm, or bun

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/Qwizzy-AI.git
    cd Qwizzy-AI
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up Environment Variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/qwizzy_ai_db?schema=public"
    NEXTAUTH_SECRET="your-super-secret-key"
    NEXTAUTH_URL="http://localhost:3000"
    GOOGLE_API_KEY="your-google-gemini-api-key"
    ```

4.  **Database Setup:**

    Run the Prisma migration to create the database schema:

    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Run the Development Server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
Qwizzy-AI/
├── src/
│   ├── app/
│   │   ├── answers/                # View answered papers
│   │   │   └── [answerpaperID]/
│   │   ├── api/                    # Backend API routes
│   │   │   ├── answering_papers/   # Exam submission logic
│   │   │   ├── auth/               # NextAuth endpoints
│   │   │   ├── cheack_Resetable/   # Reset paper logic
│   │   │   ├── deletepaper/        # Paper deletion
│   │   │   ├── geminai/            # Google Gemini AI integration
│   │   │   ├── paper/              # Paper management
│   │   │   └── user/               # User management
│   │   ├── components/             # UI Components
│   │   │   ├── AiGenarator.jsx     # AI Question Generator
│   │   │   ├── MCQ_QuestionCreator # Question Editor
│   │   │   ├── PaperCard.jsx       # Dashboard Paper Card
│   │   │   └── ...
│   │   ├── create_paper/           # Paper creation flow
│   │   │   └── [id]/
│   │   ├── dashboard/              # User Dashboard
│   │   ├── login/                  # Login Page
│   │   ├── signup/                 # Signup Page
│   │   ├── starting/               # Exam Taking Interface
│   │   │   └── [paperID]/
│   │   ├── globals.css             # Global Styles
│   │   ├── layout.js               # Root Layout
│   │   └── page.jsx                # Landing Page
│   ├── assest/                     # Static Assests (Images)
│   ├── lib/                        # Utilities
│   │   └── store.js                # Zustand Store
│   └── ...
├── prisma/                         # Database Schema
│   └── schema.prisma
├── public/                         # Public Assets
├── .env                            # Environment Variables
├── package.json                    # Dependencies
└── README.md                       # Documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
