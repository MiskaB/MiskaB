import React from "react";
import ReactDOM from "react-dom/client";

function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 p-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Hello, I'm Miska</h1>
          <p className="text-lg text-gray-600">
            Cloud Partner Lead at Eficode | Curious about tech, AI, sustainability, and connecting with people
          </p>
        </header>

        <section className="mb-8">
          <p className="mb-4">
            I’m someone who’s always been curious about how things work — especially in the world of technology. Over the years, that curiosity has grown into a career focused on helping people and organizations use technology in smarter, more sustainable, and more human-centered ways.
          </p>
          <p className="mb-4">
            I currently work at <strong>Eficode</strong> as a <strong>Cloud Partner Lead</strong>, where I get to collaborate with some of the industry’s leading cloud providers like AWS, Microsoft, and GitHub. What really drives me, though, is not just the tools, but the people — building connections, solving problems together, and working in agile, fast-moving environments where we can try new things and learn constantly.
          </p>
          <p className="mb-4">
            I’m especially interested in how <strong>AI</strong> and <strong>automation</strong> can reshape the way we build software, interact with systems, and live our everyday lives. I’m always keeping an eye out for what’s next — whether it’s a new framework, a platform update, or a shift in how we think about digital sustainability.
          </p>
          <p>
            This site is a place where I’ll share things I’m working on, learning about, or just find interesting — with the hope that it helps others or starts a conversation.
          </p>
        </section>

        <footer className="mt-12 border-t pt-4 text-sm text-gray-500">
          <p>
            Connect with me on <a href="https://www.linkedin.com/in/miskabraun" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </p>
        </footer>
      </div>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HomePage />);
