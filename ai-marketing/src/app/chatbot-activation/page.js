import Link from 'next/link';

export default function ChatbotActivation() {
  return (
    <div style={styles.container}>
      <h1>Chatbot Activation</h1>
      <p>
        Before activating your chatbot, please configure its custom traits and characteristics.
      </p>
      <Link href="/chatbot-config" style={styles.button}>
        Configure Your Chatbot
      </Link>
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
  button: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
    marginTop: '1rem'
  }
};
