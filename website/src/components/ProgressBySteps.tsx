"use client";
import React from "react";
import clsx from "clsx";
import { Text } from '@/components/typography';

const ProgressBySteps = ({ steps, progress }) => {
  return (
    <div className="w-1/2 flex flex-col gap-3">
      <div className="w-full flex justify-between items-center">
        {steps.map((step) => (
          <Text size='normal' className='capitalize' key={step}>{step}</Text>
        ))}
      </div>
      <div className='mx-5 relative'>
        <div className="relative h-3 w-full rounded-4xl bg-background overflow-hidden">
          <div
            className="absolute top-0 left-0 bg-primary h-full w-full rounded-4xl duration-300"
            style={{
              maxWidth: `${((progress - 1) / (steps.length - 1)) * 100}%`,
            }}
          ></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center">
          <div className="bg-primary size-6 rounded-full"></div>
          {Array.from({ length: steps.length - 1 }, (_, i) => i + 1).map(
            (e, index) => (
              <div
                key={index}
                className="relative size-6 rounded-full delay-300 bg-background"
              >
                <div
                  className={clsx(
                    "absolute top-0 left-0 w-full h-full rounded-full bg-primary duration-150 delay-300 origin-center",
                    index + 2 > progress ? "scale-0" : "scale-100"
                  )}
                ></div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBySteps;
