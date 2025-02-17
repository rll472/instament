import Link from 'next/link';

export default function Dashboard() {
  // Example user data; replace with real data as needed.
  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    company: {
      name: 'InnovateX',
      industry: 'Marketing & AI',
      website: 'https://www.innovatex.com'
    }
  };

  return (
    <div style={styles.container}>
      <h1>Welcome, {user.name}</h1>

      <section style={styles.section}>
        <h2>Personal Information</h2>
        <p><strong>Email:</strong> {user.email}</p>
      </section>

      <section style={styles.section}>
        <h2>Company Information</h2>
        <p><strong>Company Name:</strong> {user.company.name}</p>
        <p><strong>Industry:</strong> {user.company.industry}</p>
        <p>
          <strong>Website:</strong>{' '}
          <a href={user.company.website} target="_blank" rel="noopener noreferrer">
            {user.company.website}
          </a>
        </p>
      </section>

      <section style={styles.section}>
        <h2>Chatbot Activation</h2>
        <p>Ready to get started with your first chatbot?</p>
        <Link href="/chatbot-activation" style={styles.button}>
          Activate Your Chatbot
        </Link>
      </section>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto'
  },
  section: {
    marginBottom: '2rem'
  },
  button: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none'
  }
};
