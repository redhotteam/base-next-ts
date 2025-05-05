export default function ImageWrapper({ className = "", onClick, children }) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
