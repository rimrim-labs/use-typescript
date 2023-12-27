import React from 'react';

type InstructionProps = {
  title: string;
  steps: string[];
};

function Instruction({ title, steps }: InstructionProps) {
  return (
    <section className="instructions">
      <h2>{title}</h2>
      {steps.map((step, idx) => (
        <p key={idx}>{step}</p>
      ))}
    </section>
  );
}

export default Instruction;
