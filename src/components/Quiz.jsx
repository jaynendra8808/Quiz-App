import { useState, useRef } from "react";
import { data } from "../assets/data";

export const Quiz = () => {
    let [index, setIndex] = useState(0);
    const [object, setObject] = useState(data[index]);
    const [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    const [result, setResult] = useState(false);

    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);
    const option4 = useRef(null);

    const option_array = [option1, option2, option3, option4];

    const checkAns = (e, ans) => {
        if (lock === false) {
            if (object.ans === ans) {
                e.target.classList.add("bg-green-400");
                setLock(true);
                setScore((prev) => prev + 1);
            } else {
                e.target.classList.add("bg-red-300");
                setLock(true);
                option_array[object.ans - 1].current.classList.add("bg-green-400");
            }
        }
    };

    const next = () => {
        if (lock === true) {
            if (index === data.length - 1) {
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setObject(data[index]);
            setLock(false);
            option_array.map((option) => {
                option.current.classList.remove("bg-red-300");
                option.current.classList.remove("bg-green-400");
                return null;
            });
        }
    };

    const reset = () => {
        setIndex(0);
        setObject(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    };

    return (
        <div className="flex flex-col w-full max-w-[540px] mx-auto mt-10 bg-white text-gray-500 gap-5 rounded-lg px-6 md:px-10 py-5">
            <h1 className="font-bold text-2xl text-center">Quiz App</h1>
            <hr className="h-[2px] border-none bg-[#707070]" />
            {result ? null : (
                <>
                    <h2 className="font-semibold text-lg md:text-xl pl-5">
                        {index + 1}. {object.question}
                    </h2>
                    <ul className="list-disc pl-5">
                        <li
                            ref={option1}
                            onClick={(e) => {
                                checkAns(e, 1);
                            }}
                            className="flex items-center h-[40px] border border-slate-500 mb-3 cursor-pointer pl-5 rounded-lg hover:bg-slate-100 transition"
                        >
                            {object.option1}
                        </li>
                        <li
                            ref={option2}
                            onClick={(e) => {
                                checkAns(e, 2);
                            }}
                            className="flex items-center h-[40px] border border-slate-500 mb-3 cursor-pointer pl-5 rounded-lg hover:bg-slate-100 transition"
                        >
                            {object.option2}
                        </li>
                        <li
                            ref={option3}
                            onClick={(e) => {
                                checkAns(e, 3);
                            }}
                            className="flex items-center h-[40px] border border-slate-500 mb-3 cursor-pointer pl-5 rounded-lg hover:bg-slate-100 transition"
                        >
                            {object.option3}
                        </li>
                        <li
                            ref={option4}
                            onClick={(e) => {
                                checkAns(e, 4);
                            }}
                            className="flex items-center h-[40px] border border-slate-500 mb-3 cursor-pointer pl-5 rounded-lg hover:bg-slate-100 transition"
                        >
                            {object.option4}
                        </li>
                    </ul>

                    <button
                        className="mx-auto w-full md:w-[150px] h-[40px] bg-[#553f9a] text-white font-medium md:font-semibold cursor-pointer rounded-lg hover:bg-[#6a4bbf] transition"
                        onClick={next}
                    >
                        Next
                    </button>

                    <div className="text-center font-semibold md:font-medium text-sm md:text-base">
                        {index + 1} of {data.length} question
                    </div>
                </>
            )}
            {result && (
                <>
                    <h2 className="text-center font-semibold text-lg">
                        You scored {score} out of {data.length}
                    </h2>
                    <button
                        className="mx-auto w-full md:w-[150px] h-[40px] bg-[#553f9a] text-white font-medium md:font-semibold cursor-pointer rounded-lg hover:bg-[#6a4bbf] transition"
                        onClick={reset}
                    >
                        Reset
                    </button>
                </>
            )}
        </div>
    );
};
