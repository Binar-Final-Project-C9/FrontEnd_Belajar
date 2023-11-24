import React from "react";

import { HiX } from "react-icons/hi";

const Modal = ({ showModal, setShowModal }) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex fixed inset-0 z-50">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                <div className="flex items-start justify-between p-2">
                  <button
                    className="p-1 ml-auto  border-0 float-right text-3xl leading-none font-semibold"
                    onClick={() => setShowModal(false)}>
                    <HiX className="text-black" />
                  </button>
                </div>
                <h2 className="text-center">ININININININI</h2>
                <form className="w-full px-6 space-y-4">
                  <div>
                    <label
                      htmlFor="nama-kelas"
                      className="block text-sm font-medium text-gray-700">
                      Nama Kelas
                    </label>
                    <input
                      type="text"
                      id="nama-kelas"
                      className="mt-1 w-full p-2 border rounded-md lg:w-[500px]"
                      placeholder="Text"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="kategori"
                      className="block text-sm font-medium text-gray-700">
                      Kategori
                    </label>
                    <input
                      type="text"
                      id="kategori"
                      className="mt-1 w-full p-2 border rounded-md lg:w-[500px]"
                      placeholder="Text"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="kode-kelas"
                      className="block text-sm font-medium text-gray-700">
                      Kode Kelas
                    </label>
                    <input
                      type="text"
                      id="kode-kelas"
                      className="mt-1 w-full p-2 border rounded-md lg:w-[500px]"
                      placeholder="Text"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="tipe-kelas"
                      className="block text-sm font-medium text-gray-700">
                      Tipe Kelas
                    </label>
                    <input
                      type="text"
                      id="tipe-kelas"
                      className="mt-1 w-full p-2 border rounded-md lg:w-[500px]"
                      placeholder="Text"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="level"
                      className="block text-sm font-medium text-gray-700">
                      Level
                    </label>
                    <input
                      type="text"
                      id="level"
                      className="mt-1 w-full p-2 border rounded-md lg:w-[500px]"
                      placeholder="Text"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="harga"
                      className="block text-sm font-medium text-gray-700">
                      Harga
                    </label>
                    <input
                      type="text"
                      id="harga"
                      className="mt-1 w-full p-2 border rounded-md lg:w-[500px]"
                      placeholder="Text"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="materi"
                      className="block text-sm font-medium text-gray-700">
                      Materi
                    </label>
                    <input
                      type="text"
                      id="materi"
                      className="mt-1 w-full p-2 border rounded-md lg:w-[500px]"
                      placeholder="Text"
                    />
                  </div>
                </form>
                <div className="flex items-center justify-between p-5 gap-5 w-full">
                  <button
                    className="bg-red-500 text-white w-full font-bold text-sm h-[50px] px-2 rounded-3xl"
                    type="submit">
                    Upload Video
                  </button>
                  <button
                    className="bg-dark-blue text-white w-full font-bold text-sm h-[50px] rounded-3xl"
                    type="button">
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
