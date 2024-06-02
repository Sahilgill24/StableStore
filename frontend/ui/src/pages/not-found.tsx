import { AnimatedGradientText } from "@/components/animated-gradient-text";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex items-center flex-col gap-4 justify-center">
        <h1 className="text-9xl mx-auto"><AnimatedGradientText text="404" /></h1>
        <p className="text-lg text-muted-foreground uppercase ml-6" style={{letterSpacing: '10px'}}>Came the wrong way perhaps?</p>
    </div>
  );
}
