# TaskFlow - Employee Task Dashboard 🚀

> A production-ready task management system built with React 18, TypeScript & Tailwind CSS

Run command- pnpm run
Why Pnpm-
1.Speed - 2x
2.Disk Space-less compared to npm
3.Strict + Safe
4.Monorepo Support

**Live Demo**: [taskflow-dashboard.vercel.app]((https://task-flow-employee-task-dashboard-7.vercel.app/)) | **GitHub**: [gamechangerSumit/TaskFlow-Employee-Task-Dashboard](https://github.com/gamechangerSumit/TaskFlow-Employee-Task-Dashboard)

## 📸 Screenshots

Dashboard - (./public/Dashboard.png))
Add New Task - (./public/AddTask.png)
Edit Task - (./public/EditTask.png) 
Dark Mode - (./public/DarkMode.png)

## 🎯 Problem It Solves

It Manages Employees daily tasks instead of use Excel or paper. **TaskFlow** is a centralized dashboard where:
- Tasks can be create/edit/delete 
- Priority wise planning 
- Can Track Due dates
- Progress monitor

## ✨ Features

### **Task Management**
- ✅ **Full CRUD**: Create, Read, Update, Delete operations
- 📊 **Analytics Dashboard**: Real-time stats - Total, Pending, Completed
- 🎯 **Priority Levels**: High 🔴 | Medium 🟠 | Low 🟣 with color coding
- 📅 **Due Date Picker**: Calendar input with past-date validation
- 🔄 **Status Toggle**: Mark tasks as Pending/Completed

### **Filtering & Search**
- 🔍 **Smart Search**: Real-time search by task title
- 📂 **Status Filter**: All | Pending | Completed
- 🎨 **Priority Filter**: All | High | Medium | Low
- 🧹 **Clear Filters**: One-click reset

### **User Experience**
- 📱 **100% Responsive**: Mobile, Tablet, Desktop optimized
- ⚡ **Instant Updates**: No page refresh needed, Context API
- 💾 **Data Persistence**: LocalStorage - no loss on refresh
- 🎨 **Modern UI**: Clean cards, smooth animations, Lucide icons
- ⚠️ **Form Validation**: Real-time error messages
- 🔙 **Smart Routing**: Back navigation with React Router

## 🛠️ Tech Stack

| Layer | Technology | Why Used |
| **Framework** | React 18.3 | Component-based, Virtual DOM, Hooks |
| **Language** | TypeScript 5.6 | Type safety, IntelliSense, Fewer bugs |
| **Build Tool** | Vite 6.0 | Fast HMR, Optimized builds, ESM |
| **Styling** | Tailwind CSS 3.4 | Utility-first, Responsive, No CSS files |
| **Routing** | React Router DOM 6 | SPA navigation, Dynamic routes |
| **Icons** | Lucide React | Tree-shakeable, Consistent design |
| **State** | Context API + Hooks | No Redux needed, Built-in React |
| **Storage** | LocalStorage API | Client-side persistence, No backend |
| **Linting** | ESLint + TS ESLint | Code quality, Consistent style |

## 📁 Project Structure

TaskFlow-Employee-Task-Dashboard/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── task/
│   │   │   ├── TaskCard.tsx       # Single task display card
│   │   │   ├── TaskForm.tsx       # Reusable add/edit form
│   │   │   ├── TaskList.tsx       # Grid of all tasks
│   │   │   └── TaskFilter.tsx     # Search + filter controls
│   │   └── ui/
│   │       ├── Button.tsx         # Primary/Danger/Secondary
│   │       ├── Input.tsx          # Text/Date/Select/Textarea
│   │       ├── Badge.tsx          # Priority/Status badges
│   │       ├── Layout.tsx         # Page wrapper + header
│   │       └── StatCard.tsx       # Dashboard metric cards
│   ├── context/
│   │   └── TaskContext.tsx        # Global task state + CRUD
│   ├── hooks/
│   │   └── useTasks.ts            # Custom hook for task ops
│   ├── pages/
│   │   ├── Dashboard.tsx          # Main page - /
│   │   ├── AddTask.tsx            # Create page - /add-task
│   │   └── EditTask.tsx           # Update page - /edit/:id
│   ├── types/
│   │   └── task.ts                # Task, Priority, Status types
│   ├── utils/
│   │   └── validateTaskForm.ts    # Form validation logic
│   ├── App.tsx                    # Router setup
│   ├── main.tsx                   # React DOM render
│   └── index.css                  # Tailwind directives
├── .eslintrc.cjs                  # ESLint config
├── .gitignore                     # Git ignore rules
├── index.html                     # Entry HTML
├── package.json                   # Dependencies
├── tailwind.config.js             # Tailwind config
├── tsconfig.json                  # TS config
└── vite.config.ts                 # Vite config


## 🚀 Getting Started

### **Prerequisites**
```bash
Node.js >= 18.0.0
pnpm >= 9.0.0   # npm install -g pnpm
Git


### **Installation Steps**

1.Clone repositorybashgit clone https://github.com/gamechangerSumit/TaskFlow-Employee-Task-Dashboard.git
cd TaskFlow-Employee-Task-Dashboard

2.Install dependencies
bash pnpm install

3.Start development server
bash pnpm dev

4.Open in browser
http://localhost:5173


### **Build for Production**
pnpm build        # Creates /dist folder
pnpm preview      # Test production build locally

Available Scripts
pnpm dev         # Start dev server with HMR
pnpm build       # Build for production to /dist
pnpm preview     # Preview production build
pnpm lint        # Run ESLint checks

VALIDATION RULES
1. Title: Required, min 3 characters
2. DueDate: Required, cannot be past date
3. Priority: Must be High/Medium/Low
4. Status: Must be Pending/Completed


🙏 Tech Credits
React Team - For amazing framework
Tailwind Labs - For utility CSS
Lucide - For beautiful icons
Vercel - For free hosting

👨‍💻 Developer
Sumit Pandey
GitHub: @gamechangerSumit
Project: TaskFlow-Employee-Task-Dashboard
