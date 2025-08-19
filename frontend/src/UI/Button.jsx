export default function Button({
  className = "",
  children,
  btnCaption = "",
  btnIcon,
  icon,
  ...props
}) {
  return (
    <button className={className} {...props}>
      {btnIcon && <span>{icon}</span>}
      {btnCaption}
      {children}
    </button>
  );
}
