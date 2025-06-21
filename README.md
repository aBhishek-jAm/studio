# WasteWise

WasteWise is a smart web application designed to help users manage waste more effectively using the power of AI. It provides tools for classifying waste and reporting illegal dumping, promoting a cleaner and more sustainable environment.

## Features

-   **AI-Powered Waste Classification:** Upload a photo of any waste item, and our AI model will classify it as biodegradable, recyclable, or other, providing you with proper disposal information.
-   **Facts and Best Practices:** Learn more about different waste categories with helpful facts and tips for better waste management.
-   **Illegal Dumping Reporting:** Quickly report illegally dumped waste by uploading a photo and capturing your current location. This helps local communities keep public spaces clean.
-   **User-Friendly Interface:** A clean, modern, and responsive interface built with Next.js and ShadCN UI.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **AI/ML:** [Genkit](https://firebase.google.com/docs/genkit)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [ShadCN UI](httpss://ui.shadcn.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

### Installation & Running Locally

1.  **Clone the repository:**
    ```sh
    git clone <your-repo-url>
    ```
2.  **Install NPM packages:**
    ```sh
    npm install
    ```
3.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

4.  **Run the Genkit development server:**
    In a separate terminal, run:
    ```sh
    npm run genkit:dev
    ```
    This starts the Genkit flows required for the AI features.

---

Built with ❤️ for a better planet.
