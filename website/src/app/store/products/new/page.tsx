"use client";
import React from "react";
import { Title, Text } from '@/components/typography';
import Button from '@/components/Button';
import InputField from '../../../../components/InputField';

const page = () => {
  return (
    <>
      <header className="w-full pt-10 py-3 flex justify-between items-center">
        <Title size="big">Add new Products</Title>
        <div className="flex justify-center items-center gap-3">
            <Button title='Save Draft'/>
            <Button title='add Product'/>
        </div>
      </header>
      <div className='flex-1 w-full  grid grid-cols-4 grid-rows-3 gap-5 '>
        <div className='shadow-xl col-span-2 row-span-2 bg-surface rounded-2xl p-5'>
            <Text size="large">General information</Text>
            <form action="">
                <InputField label='title'/>
                <div>
                    <label htmlFor="">Descreption</label>
                    <textarea name="a" id="a"></textarea>
                </div>
                
            </form>
        </div>
        <div className='shadow-xl col-span-2 row-span-2 bg-surface rounded-2xl'></div>
      </div>
    </>
  );
};

export default page;
