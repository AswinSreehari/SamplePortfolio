"use client";
import React from "react";
import { MaskContainer } from "@/components/ui/svg-mask-effect";

const MaskContainer = () => {
  return (
    <div>
      <div className=" relative top-2.5  h-[40rem] w-full    overflow-hidden">
        <MaskContainer
          revealText={
            <p className="mx-auto max-w-4xl text-center text-4xl font-bold text-slate-800 dark:text-white">
              The first rule of MRR Club is you do not talk about MRR Club. The
              second rule of MRR Club is you DO NOT talk about MRR Club.The
              Amazon rainforest is often called the "lungs of the Earth" due to
              its crucial role in producing oxygen. It is home to an incredible
              diversity of plant and animal species, many of which cannot be
              found anywhere else. Rivers wind through dense, towering trees,
              providing water and life to countless communities. Yet, the
              rainforest faces severe threats from deforestation and climate
              change.
            </p>
          }
          className="h-[40rem] rounded-md border text-white dark:text-black"
        >
          Discover the power of{" "}
          <span className="text-blue-500">Tailwind CSS v4</span> with native CSS
          variables and container queries with The Amazon rainforest is often
          called the "lungs of the Earth" due to its crucial role in producing
          oxygen. It is home to an incredible diversity of plant and animal
          species, many of which cannot be found anywhere else. Rivers wind
          through dense, towering trees, providing water and life to countless
          communities. Yet, the rainforest faces severe threats from
          deforestation and climate change.
          <span className="text-blue-500">advanced animations</span>.
        </MaskContainer>
      </div>
    </div>
  );
};

export default MaskContainer;
