import styles from "./components.module.css";

type AnimatedGradientTextProps = {
  text: string;
  from?: string;
  via?: string;
  to?: string;
};

export function AnimatedGradientText(props: AnimatedGradientTextProps) {
  const from = props.from || 'from-primary';
  const via = props.via || 'via-violet-500';
  const to = props.to || 'to-cyan-500';

  return (
    <>
      <span
        className={`bg-gradient-to-r font-black ${from} ${via} ${to} text-transparent bg-clip-text ${styles.animate_gradient}`}
      >
        {props.text}
      </span>
    </>
  );
}
