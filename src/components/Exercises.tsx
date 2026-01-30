import { useEffect, useState } from "react";
import Button from "./Button";
import { tests } from "../data/tests";
import { useTheme } from "../theme/theme";
import BallBox from "./BallBox";
import { ArrowRight } from "lucide-react";
import type { resultType, testItem } from "../type";
import { useSearchParams } from "react-router-dom";

export default function Exercises() {
  const { theme } = useTheme();
  const [showTenExercise, setShowTenExercise] = useState<boolean>(false);
  const [showTwentyExercise, setShowTwentyExercise] = useState<boolean>(false);
  const [showInfinityExercise, setShowInfinityExercise] =
    useState<boolean>(false);
  const [test, setTest] = useState<testItem[]>([]);
  const [testInfinity, setTestInfinity] = useState<testItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [fakeAnswer, setFakeAnswer] = useState<string[]>([]);
  const [addTest, setAddTest] = useState<string[]>([]);
  const [resultMessage, setResultMessage] = useState<resultType>(null);
  const [status, setStatus] = useState<(boolean | undefined)[]>(
    Array(10).fill(undefined),
  );
  const [checked, setChecked] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const [correctResult, setCorrectResult] = useState<string>("");
  const lang = searchParams.get("lang");

  const getTenTests = () => {
    const allTests = lang === "ru" ? tests.russian_tests : tests.english_tests;
    const getTest = [...allTests].sort(() => Math.random() - 0.5);
    setTest(getTest.slice(0, 10));
    setCurrentIndex(0);
    setStatus(Array(10).fill(undefined));
  };

  const getTwentyTest = () => {
    const allTests = lang === "ru" ? tests.russian_tests : tests.english_tests;
    const getTest = [...allTests].sort(() => Math.random() - 0.5);
    setTest(getTest.slice(0, 20));
    setCurrentIndex(0);
    setStatus(Array(20).fill(undefined));
  };

  const getTestsInfinty = () => {
    const allTests = lang == "ru" ? tests.russian_tests : tests.english_tests;
    const getTest = [...allTests].sort(() => Math.random() - 0.5);
    setTestInfinity(getTest.map((item) => item));
    setCurrentIndex(0);
  };

  const openShowTenExerCise = () => {
    getTenTests();
    setShowTenExercise(true);
    setShowTwentyExercise(false);
    setShowInfinityExercise(false);
    setIsFinished(false);
  };

  const openShowTwentyExerCise = () => {
    setShowTenExercise(false);
    getTwentyTest();
    setShowTwentyExercise(true);
    setShowInfinityExercise(false);
    setIsFinished(false);
  };

  const openShowInfinityExerCise = () => {
    setShowTenExercise(false);
    getTestsInfinty();
    setShowTwentyExercise(false);
    setShowInfinityExercise(true);
    setStatus([]);
  };

  const nextQuestion = () => {
    setChecked(false);
    if (showInfinityExercise) {
      if (currentIndex < testInfinity.length - 1) {
        setCurrentIndex((prev) =>
          prev === testInfinity.length - 1 ? 0 : prev + 1,
        );
      }
    } else {
      if (currentIndex < test.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsFinished(true);
      }
    }
  };

  useEffect(() => {
    if (showTenExercise || showTwentyExercise) {
      setFakeAnswer(test[currentIndex].test);
      setAddTest([]);
    } else if (showInfinityExercise && testInfinity.length > 0) {
      setFakeAnswer(testInfinity[currentIndex].test);
      setAddTest([]);
    }
  }, [
    currentIndex,
    test,
    testInfinity,
    showTenExercise,
    showTwentyExercise,
    showInfinityExercise,
  ]);

  const checkTests = () => {
    if (checked) return;

    const currentTest = showInfinityExercise
      ? testInfinity[currentIndex]
      : test[currentIndex];

    const isCorrect =
      addTest.length === currentTest.answer.length &&
      addTest.every((el, i) => el === currentTest.answer[i]);

    if (!showInfinityExercise) {
      setStatus((prev) => {
        const updated = [...prev];
        updated[currentIndex] = isCorrect;
        return updated;
      });
    }

    if (isCorrect) {
      setResultMessage({ text: "Дуруст!", color: "green" });
      setTimeout(() => {
        setResultMessage(null);
      }, 3000);
    } else {
      setResultMessage({ text: "Нодуруст!", color: "red" });
      setCorrectResult(currentTest.answer.join(" "));
      setTimeout(() => {
        setResultMessage(null);
        setCorrectResult("");
      }, 3000);
    }

    setChecked(true);
  };

  const correctCount = status.filter((s) => s === true).length;

  return (
    <div>
      <section className="pt-20">
        <h1
          className={`tracking-in-expand text-center text-focus-in pb-4 ${theme ? "text-amber-100" : "text-[#3c4c61]"} font-bold flex gap-2 justify-center text-4xl flex-wrap pb-2`}
        >
          Машқҳо аз забони {lang == "ru" ? "руси" : "англисӣ"}
        </h1>
        <p
          className={`tracking-in-expand ${theme ? "text-amber-100" : "text-gray-700"} font-sans text-lg text-center`}
        >
          Дар машқҳо, шумо ҷумлаҳои тоҷикиро ба забони
          {lang == "ru" ? "руси" : "англисӣ"} тарҷума мекунед :) Ҷумлаҳо бо
          забони тоҷикӣ навишта <br /> шудаанд ва дар Луғатҳои англисӣ дар поён
          ҷойгир шудаанд, шумо бояд Калимаҳоеро ҷойгир кунед, то ҷумлаи дуруст
          созед.
        </p>
        <div className="pt-20 flex flex-col text-center pb-10">
          <h1
            className={`tracking-in-expand text-3xl ${theme ? "text-amber-100" : ""}`}
          >
            Бо кадом забон машқ кардан мехоҳед?
          </h1>
          <div className="flex justify-center gap-7 flex-col pt-8 md:flex-row">
            <Button
              onClick={openShowTenExerCise}
              name="10 Машқ"
              theme={theme}
            />
            <Button
              onClick={openShowTwentyExerCise}
              name="20 Машқ"
              theme={theme}
            />
            <Button
              name="♾️ Беохир"
              theme={theme}
              onClick={openShowInfinityExerCise}
            />
          </div>
          <div className="flex justify-center items-center flex-col">
            {showTenExercise && !isFinished && test.length > 0 && (
              <div>
                <BallBox status={status} total={10} />
                <div className="flex flex-col pt-30 gap-30">
                  <div className="flex justify-center">
                    <div className="w-70 text-[15px] md:w-full md:text-2xl border-b-3 pb-1 text-left indent-1 border-solid border-cyan-700">
                      {currentIndex + 1}.{test[currentIndex].question}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-70 text-[15px] md:w-full md:text-2xl border-b-3 flex gap-2 flex-wrap pb-1 text-left indent-1 border-solid border-green-500">
                      {addTest.length === 0 ? (
                        <h1>Варинатҳои дурустро интихоб намоед!</h1>
                      ) : (
                        addTest.map((text, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setAddTest((prev) =>
                                prev.filter((_, index) => index !== i),
                              );
                              setFakeAnswer((prev: string[]) => [
                                text,
                                ...prev,
                              ]);
                            }}
                            className={`cursor-pointer border-2 px-3 py-1 border-cyan-700 ${theme ? "bg-gray-700" : "bg-[#f5fff5ce]"} rounded-xl w-auto h-auto`}
                          >
                            {text}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-70 text-[15px] md:w-full md:text-2xl flex-wrap flex gap-2 border-b-3 mt-10 pb-1 text-left indent-1 border-solid border-red-500">
                      {fakeAnswer.length > 0 ? (
                        fakeAnswer.map((elem: string, i: number) => (
                          <button
                            key={i}
                            onClick={() => {
                              setAddTest((prev: string[]) => {
                                return [...prev, elem];
                              });
                              setFakeAnswer((prev) =>
                                prev.filter((_, index) => index !== i),
                              );
                            }}
                            className={`cursor-pointer border-2 px-3 py-1 border-cyan-700 ${theme ? "bg-gray-700" : "bg-[#f5fff5ce]"} rounded-xl w-auto h-auto`}
                          >
                            {elem}
                          </button>
                        ))
                      ) : (
                        <h1 className="font-bold">Холи</h1>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showTwentyExercise && !isFinished && test.length > 0 && (
              <div>
                <BallBox status={status} total={20} />
                <div className="flex flex-col pt-30 gap-30">
                  <div className="flex justify-center">
                    <div className="w-70 text-[15px] md:w-full md:text-2xl border-b-3 pb-1 text-left indent-1 border-solid border-cyan-700">
                      {currentIndex + 1}.{test[currentIndex].question}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-70 text-[15px] md:w-full md:text-2xl border-b-3 flex gap-2 flex-wrap pb-1 text-left indent-1 border-solid  border-green-500">
                      {addTest.length === 0 ? (
                        <h1>Варинатҳои дурустро интихоб намоед!</h1>
                      ) : (
                        addTest.map((text, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setAddTest((prev) =>
                                prev.filter((_, index) => index !== i),
                              );
                              setFakeAnswer((prev: string[]) => [
                                text,
                                ...prev,
                              ]);
                            }}
                            className={`cursor-pointer border-2 px-3 py-1 border-cyan-700 ${theme ? "bg-gray-700" : "bg-[#f5fff5ce]"} rounded-xl w-auto h-auto`}
                          >
                            {text}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-70 text-[15px] md:w-full md:text-2xl flex-wrap flex gap-2 border-b-3 mt-10 pb-1 text-left indent-1 border-solid border-red-500">
                      {fakeAnswer.length > 0 ? (
                        fakeAnswer.map((elem: string, i: number) => (
                          <button
                            key={i}
                            onClick={() => {
                              setAddTest((prev: string[]) => {
                                return [...prev, elem];
                              });
                              setFakeAnswer((prev) =>
                                prev.filter((_, index) => index !== i),
                              );
                            }}
                            className={`cursor-pointer border-2 px-3 py-1 border-cyan-700 ${theme ? "bg-gray-700" : "bg-[#f5fff5ce]"} rounded-xl w-auto h-auto`}
                          >
                            {elem}
                          </button>
                        ))
                      ) : (
                        <h1 className="font-bold">Холи</h1>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showInfinityExercise && testInfinity.length > 0 && (
              <div>
                <div className="grid grid-cols-10">
                  <div className="w-20 h-5"></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="flex flex-col pt-30 gap-30">
                  <div className="flex justify-center">
                    <div className="w-70 text-[15px] md:w-full md:text-2xl border-b-3 pb-1 text-left indent-1 border-solid border-cyan-700">
                      {currentIndex + 1}.{testInfinity[currentIndex].question}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-70 text-[15px] md:w-full md:text-2xl border-b-3 flex gap-2 flex-wrap pb-1 text-left indent-1 border-solid border-green-500">
                      {addTest.length === 0 ? (
                        <h1>Варинатҳои дурустро интихоб намоед!</h1>
                      ) : (
                        addTest.map((text, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setAddTest((prev) =>
                                prev.filter((_, index) => index !== i),
                              );
                              setFakeAnswer((prev: string[]) => [
                                text,
                                ...prev,
                              ]);
                            }}
                            className={`cursor-pointer border-2 px-3 py-1 border-cyan-700 ${theme ? "bg-gray-700" : "bg-[#f5fff5ce]"} rounded-xl w-auto h-auto`}
                          >
                            {text}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-70 text-[15px] md:w-full md:text-2xl flex-wrap flex gap-2 border-b-3 mt-10 pb-1 text-left indent-1 border-solid border-red-500">
                      {fakeAnswer.length > 0 ? (
                        fakeAnswer.map((elem: string, i: number) => (
                          <button
                            key={i}
                            onClick={() => {
                              setAddTest((prev: string[]) => {
                                return [...prev, elem];
                              });
                              setFakeAnswer((prev) =>
                                prev.filter((_, index) => index !== i),
                              );
                            }}
                            className={`cursor-pointer border-2 px-3 py-1 border-cyan-700 ${theme ? "bg-gray-700" : "bg-[#f5fff5ce]"} rounded-xl w-auto h-auto`}
                          >
                            {elem}
                          </button>
                        ))
                      ) : (
                        <h1 className="font-bold">Холи</h1>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-6">
            {resultMessage && (
              <h3
                className="font-black"
                style={{ color: resultMessage.color }}
                id={
                  resultMessage.color === "green"
                    ? "tracking-in-expand"
                    : "tracking-in-expand2"
                }
              >
                {resultMessage.text}
              </h3>
            )}
            {correctResult && (
              <h1 className="font-bold text-blue-500 mt-4">
                Ҷавоби дуруст: "
                <span className="text-blue-600">{correctResult}</span>"
              </h1>
            )}
          </div>
          <div className="flex justify-center mt-6">
            <div className="flex justify-center gap-5 w-[45%]">
              {showTenExercise || showTwentyExercise || showInfinityExercise ? (
                !isFinished && (
                  <>
                    <button
                      disabled={
                        (showInfinityExercise && addTest.length === 0) ||
                        checked ||
                        fakeAnswer.length > 0
                      }
                      onClick={checkTests}
                      className="bg-blue-500 disabled:bg-blue-300 disabled:cursor-default hover:bg-blue-600 transition-all duration-300 cursor-pointer w-full h-auto px-3 rounded-lg text-white font-bold py-2"
                    >
                      Санҷидан
                    </button>
                    <button
                      onClick={nextQuestion}
                      disabled={!checked}
                      className="border-2 disabled:cursor-default disabled:border-1 disabled:border-cyan-900 disabled:hover:border-cyan-900 hover:border-cyan-500 flex gap-2 justify-center items-center transition-all duration-300 border-cyan-700 cursor-pointer w-full h-auto px-3 rounded-lg font-bold py-2"
                    >
                      Баъди
                      <ArrowRight />
                    </button>
                  </>
                )
              ) : (
                <></>
              )}
            </div>
          </div>
          {isFinished && (
            <div className="flex flex-col justify-center items-center gap-2 mt-10">
              <h1 className="font-black text-green-500">
                Машқҳо ба анҷом расиданд!
              </h1>
              <p className="font-bold">
                аз {test.length} тест {correctCount} тестро дуруст ҳал кардед
              </p>

              <button
                onClick={() => {
                  setIsFinished(false);
                  setCurrentIndex(0);
                  setChecked(false);
                  setAddTest([]);
                  setFakeAnswer([]);
                  setResultMessage(null);

                  if (showTenExercise) {
                    getTenTests();
                  } else if (showTwentyExercise) {
                    getTwentyTest();
                  }
                }}
                className="bg-blue-500 text-white hover:bg-blue-400 flex gap-2 justify-center items-center transition-all duration-300 border-0 cursor-pointer w-fit px-3 rounded-lg font-bold py-2"
              >
                Дубора бози кардан
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
