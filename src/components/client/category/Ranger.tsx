import React, { useEffect } from "react";

type Props = {
    min: number;
    minValue: number;
    setMinValue: any;
    max: number;
    maxValue: number;
    setMaxValue: any;
    step: any;
    priceCap: any
}
export const RangeSlider = (props: Props) => {

    const { min, minValue, setMinValue, max, maxValue, setMaxValue, step, priceCap } = props

    const progressRef = React.useRef<any>(null);

    function handleMin(e:any) {
        setMinValue(e.target.value);

        if (maxValue - minValue >= priceCap && maxValue <= max) {
            if ((e.target.value) > maxValue) {
            } else {
                setMinValue(e.target.value);
            }
        } else {
            if ((e.target.value) < minValue) {
                setMinValue(e.target.value);
            }
        }
    };

    function handleMax(e:any) {
        setMaxValue(e.target.value);

        if (maxValue - minValue >= priceCap && maxValue <= max) {
            if ((e.target.value) < minValue) {
            } else {
                setMaxValue(e.target.value);
            }
        } else {
            if ((e.target.value) > maxValue) {
                setMaxValue(e.target.value);
            }
        }
    };

    useEffect(() => {
        progressRef.current.style.left = (minValue / max) * step + "%";
        progressRef.current.style.right = step - (maxValue / max) * step + "%";
    }, [minValue, maxValue, max, step]);

    return (
        <div className="grid place-items-center">
            <div className="grid bg-transparent rounded-lg py-4">
                <h1 className="text-md font-bold text-black"> Price Range</h1>

                <div className="flex gap-2 justify-between items-center my-3">
                    <div>
                        <label htmlFor='left' className="text-sm text-black font-semibold">Min</label>
                        <input
                            id='left'
                            onChange={(e) => setMinValue(e.target.value)}
                            type="number"
                            value={minValue}
                            className="w-full py-1 px-4 bg-gray-200 text-black rounded-md border-0 appearance-none focus:outline-none"
                        />
                    </div>
                    {/* <div className="font-semibold text-lg"> - </div> */}
                    <div>
                        <label htmlFor='right' className="text-sm text-black font-semibold">Max</label>
                        <input
                            id='right'
                            onChange={(e) => setMaxValue(e.target.value)}
                            type="number"
                            value={maxValue}
                            className="w-full py-1 px-4 bg-gray-200 rounded-md border-0 text-black appearance-none focus:outline-none"
                        />
                    </div>
                </div>

                <div className="my-2">
                    <div className="slider relative h-1 rounded-md bg-red-100">
                        <div
                            className="progress rounded-full absolute h-1 bg-black"
                            ref={progressRef}
                        ></div>
                    </div>

                    <div className="range-input relative">
                        <input
                            // onChange={(e) => setMinValue(e.target.value)}
                            onChange={(e) => handleMin(e)}
                            type="range"
                            min={min}
                            step={step}
                            max={max}
                            value={minValue}
                            className="range-min absolute w-full  -top-1  h-1   bg-transparent  appearance-none pointer-events-none"
                        />

                        <input
                            // onChange={(e) => setMaxValue(e.target.value)}
                            onChange={(e) => handleMax(e)}
                            type="range"
                            min={min}
                            step={step}
                            max={max}
                            value={maxValue || ''}
                            className="range-max absolute w-full  -top-1 h-1  bg-transparent appearance-none  pointer-events-none"
                        />

                        {/* <input
                            className="w-full h-0 -top-0 absolute bg-transparent appearance-none"
                            id="typeinp" type="range" min="0" max="5000" defaultValue="3" step="1"
                        />
                        <input
                            className="w-full h-0 -top-0 absolute bg-transparent appearance-none"
                            id="typeinp" type="range" min="0" max="5000" defaultValue="3" step="1"
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};