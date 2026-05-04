# 📚 ShelfSpot | Modern Library Management

> **Status:** 🚧 **Project under active development**

ShelfSpot is a high-performance library management platform designed to deliver a seamless and reactive user experience. Built with **Angular 19+**, it showcases modern framework architectures including Signal-based reactivity and strict Zod data validation.

---

## 🚀 **Completed Features**

- ⚡ **Reactive Core Architecture:**  
  State management via Angular **Signals** for fine-grained reactivity and ultra-fast UI updates.

- 🔎 **Discovery Hub:**  
  Advanced book search using the **OpenLibrary API**, leveraging RxJS (`switchMap`, `toSignal`) for efficient async data streams.

- 🖼️ **Native Modal Book Details:**  
  Uses the native `<dialog>` element for high-performance modals, including focus trapping for accessibility and deep-linking via URL parameters.

- 🛡️ **Runtime Validation with Zod:**  
  **Zod** schemas validate and sanitize API responses, maintaining strict, type-safe data models (`BookDetail`, `BookSearchResult`).

- 🔗 **Type-Safe Services:**  
  Decoupled architecture using **Injection Tokens** for API configs and strict TypeScript interfaces throughout the data layer.

- 🟦 **Bento Grid UI:**  
  Modern, responsive design powered by **Tailwind CSS** with custom icons and a refined color palette.

---

## 🛠 **Currently in Development (Forms & UX/UI)**

- 📬 **Signal-Based Contact Form:**  
  Modern messaging form using signal-driven state instead of `ReactiveFormsModule` for lighter, faster UX.

- ✅ **Advanced Defensive Validation:**  
  Custom email validators for professional domains, with errors triggered post-user interaction (touched state only).

- ♿ **A11y & UX Optimization:**  
  Enhanced accessibility with `aria-invalid`, `aria-describedby`, and dynamic screen reader alerts (`role="alert"`).

- 💾 **Loan & Favorites Persistence:**  
  Finalizing **LoanService** and **FavoriteService** for robust, real-time local data persistence.

- ✨ **Refined UI Feedback:**  
  Implementing skeleton loaders, micro-interactions for button states (loading / success / error), and smooth transitions.

---

## 🧰 **Tech Stack**

| 🧩 Feature             | ⚙️ Technology / Framework                      |
|-----------------------|-----------------------------------------------|
| 🏗️ Framework          | Angular 19+ (Signals, Standalone Components)  |
| 🎨 Styling            | Tailwind CSS / Lucide Icons                   |
| 🔄 State Management   | Signals / RxJS (Interop)                      |
| ✔️ Validation         | Zod / Signal-based Form Logic                  |
| 🌐 API Integration    | OpenLibrary API                               |

---

## 📝 **Note for Recruiters**

This project is a showcase of specialization in **Zoneless-ready Angular** applications. The goal is to demonstrate how to build complex, accessible, and high-performance interfaces by leveraging modern framework APIs and functional programming patterns.

---

## 🔗 **Quick Links**

- 🚀 [Live Demo](#)
- 📂 [API Documentation](#)
- 🛠 [Main Repository](#)