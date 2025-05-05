export default function Button({ className = "", children }) {
  return (
    <button type="button" className={`w-full ${className}`}>
      {children}
    </button>
  );
}
