import React from 'react';
import Link from 'next/link'
function About() {
  return (
    <div className="flex justify-center min-h-screen p-1 pb-20 gap-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link href="/" className="items-center text-4xl">Home</Link>
      <Link href={"./about"} className='text-4xl'>About</Link>
      <h1 className="text-4xl items-center">About</h1>
    </div>
  );
}

export default About;
