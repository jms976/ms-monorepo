export type ButtonProps = {
  label: string;
  onClick?: () => void;
};

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 16px',
        borderRadius: 4,
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
      }}>
      {label}
    </button>
  );
};

export default Button;
