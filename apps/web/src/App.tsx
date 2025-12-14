export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>Welcome to Op</h1>
      <p>Full-stack TypeScript monorepo</p>
      <ul>
        <li>React + Vite frontend</li>
        <li>Express + TypeScript backend</li>
        <li>pnpm workspaces</li>
        <li>Shared tooling and configuration</li>
      </ul>
      <p>
        API running at: <code>{import.meta.env.VITE_API_URL || 'http://localhost:3001'}</code>
      </p>
    </div>
  );
}
