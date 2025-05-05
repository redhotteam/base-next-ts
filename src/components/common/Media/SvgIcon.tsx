import SVG from "/public/svg";

export default function SvgIcon({ name, ...IconSvgProps }) {
  return (
    <svg {...IconSvgProps}>
      <use href={`${SVG[name]}#root`} />
    </svg>
  );
}
