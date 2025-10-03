import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  return (
    <>
      <div className="flex justify-center items-center h-[100vh]">
        <h1 className="text-red-600 flex justify-center items-center">
          GSAP Animation Mastary
        </h1>
      </div>
    </>
  );
}

export default App;
