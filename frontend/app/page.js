"use client";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="title">Aims Portal</h1>
      <a href="/signin" className="signin-link">Sign In</a>
      <style jsx>{`
        .home-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
        }
        .title {
          font-size: 4rem;
          color: #333;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }
        .signin-link {
          margin-top: 20px;
          font-size: 1.2rem;
          color: #0070f3;
          text-decoration: none;
        }
        .signin-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
