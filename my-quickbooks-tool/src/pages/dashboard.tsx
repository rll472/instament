// pages/dashboard.tsx

import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const { status } = router.query;

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {status === 'success' ? (
        <h1>QuickBooks connected successfully!</h1>
      ) : (
        <h1>Dashboard</h1>
      )}
    </div>
  );
}
