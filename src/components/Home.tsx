import { useTheme } from "../theme/theme";
import en from "../images/en.png";
import ru from "../images/russian.png";
import "../animation.css";
import { Link } from "react-router-dom";
import Button from "./Button";

const Home = () => {
  const { theme } = useTheme();
  return (
    <div>
      <section className="flex flex-col justify-center items-center text-center gap-4 pt-16 md:pt-24 lg:pt-32 px-4 md:px-8">
        <h1
          className={`text-focus-in ${theme ? "text-amber-100" : "text-[#3c4c61]"} font-bold text-3xl md:text-5xl lg:text-6xl flex gap-2 justify-center flex-wrap pb-4`}
        >
          Салом хуш омадед ба сомонаи
          <Link to={"/"}>
            <span className="text-blue-500 transition-all duration-200 cursor-pointer hover:underline hover:text-blue-600">
              Learning languages
            </span>
          </Link>
        </h1>

        <h3
          className={`text-focus-in ${theme ? "text-amber-100" : "text-[#3c4c61]"} font-semibold text-xl md:text-2xl pb-6`}
        >
          Дар ин сайт шумо метавонед забонҳои англисӣ ва русиро омӯзед.
        </h3>

        <p
          className={`tracking-in-expand ${theme ? "text-amber-100" : "text-gray-700"} text-base md:text-lg max-w-3xl`}
        >
          Дарсҳои мо аз грамматика, машқҳо ва тестҳо иборатанд. Умедворем, ки ин
          дарсҳо барои шумо муфид хоҳанд буд!
        </p>
        <p
          className={`tracking-in-expand ${theme ? "text-amber-100" : "text-gray-700"} text-base md:text-lg max-w-3xl`}
        >
          Мо барои шумо машқҳо омода кардем, ки бо онҳо шумо метавонед русӣ ва
          англисиро хеле осон аз худ кунед!
        </p>

        <div className="pt-16 flex flex-col gap-8 md:flex-row md:justify-center md:gap-10">
          <Link to="/exercises?lang=ru">
            <Button src={ru} theme={theme} name="Забони Русӣ" />
          </Link>
          <Link to="/exercises?lang=en">
            <Button src={en} theme={theme} name="Забони Англисӣ" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
