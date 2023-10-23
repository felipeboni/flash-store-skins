import { useState, useEffect, useContext } from "react";

import { UserIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";

import { cartContext } from "@/services/cart.service";

import Link from "next/link";
import Image from "next/image";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/outline";

import { CentsToReais } from "@/helpers/format/moneyFormat";

const Navbar = () => {
  const { items, setItems } = useContext(cartContext);

  const [cart, setCart] = useState(false);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  // 0 - white
  // 1 - lg blue
  // 2 - blue
  // 3 - purple
  // 4 - pink
  // 5 - red
  // 6 - orange
  // 7 - gold

  const handleRemoveThisProduct = (product) => {
    const __items = items;
    const updatedCartArray = _.reject(__items, { id: product.id });

    setItems([...updatedCartArray]);
  };

  const calculateCartTotalPrice = () => {
    let value = 0;

    console.log(items);

    for (let index = 0; index < items.length; index++) {
      const product = items[index];

      value += product.price.value;
    }

    setCartTotalPrice(value);
  };

  useEffect(() => {
    calculateCartTotalPrice();
  }, [items]);

  return (
    <>
      <Transition appear show={cart} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[99999]"
          onClose={() => setCart(false)}
        >
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative flex flex-col items-end justify-end w-full  gap-2 p-6 text-left transition-all transform z-[2] bg-gradient-to-b from-white/5 to-white/0 rounded-xl backdrop-blur-xl backdrop-saturate-150 border-white/5 border-2 max-w-xl bg-[#030712]/70">
                  <button onClick={() => setCart(false)}>
                    <XMarkIcon className="w-5 h-5 text-slate-300" />
                  </button>

                  <div className="flex flex-col items-center justify-center w-full gap-8">
                    <div className="flex items-center justify-center gap-5">
                      <div className="flex items-center justify-center gap-2">
                        <ShoppingCartIcon className="w-6 h-6 text-primary-500" />

                        <h1 className="text-lg text-white sec-font">
                          Seu carrinho
                        </h1>
                      </div>

                      <span className="text-gray-500">|</span>

                      <div className="flex items-center justify-center gap-2">
                        <span className="flex items-center justify-center aspect-square p-2 leading-[0] text-white bg-red-500 rounded text-sm">
                          {items.length}
                        </span>

                        <span className="text-sm text-white/50">
                          items adicionados
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col w-full gap-4 overflow-hidden">
                      <div className="flex flex-col items-center justify-center w-full">
                        <AnimatePresence mode="popLayout">
                          {items.length == 0 ? (
                            <div className="flex flex-col items-center justify-center py-6 text-gray-500">
                              <XMarkIcon className="w-16 h-16" />

                              <span>Seu carrinho está vazio!</span>
                              <span className="text-xs opacity-50">
                                As skins que você adicionar aparecerão aqui.
                              </span>
                            </div>
                          ) : (
                            <>
                              {items.map((item) => (
                                <motion.div
                                  key={`item__${item.id}_${item.name}`}
                                  initial={{ opacity: 0, scaleY: "0%" }}
                                  animate={{ opacity: 1, scaleY: "100%" }}
                                  exit={{ opacity: 0, scaleY: "0%" }}
                                  className="flex items-center justify-between flex-1 w-full p-4 border border-white/20 relative after:absolute after:left-0 after:right-0 after:h-px after:bottom-0 after:bg-[linear-gradient(90deg,rgba(233,14,14,0)0%,rgba(233,14,14,0.6)20%,rgba(233,14,14,0.6)80%,rgba(233,14,14,0)100%)] overflow-hidden first:rounded-t-lg last:rounded-b-lg"
                                >
                                  <div className="absolute top-0 left-0 right-0 -bottom-[110%] bg-[radial-gradient(circle,rgba(233,14,14,0.4)0%,rgba(233,14,14,0)95%)] scale-y-[30%] mix-blend-screen blur-3xl" />

                                  <div className="flex items-center justify-between gap-5">
                                    <div className="rounded bg-white/5">
                                      <img
                                        className="w-8 h-8 scale-150"
                                        src={`${item.img}`}
                                        alt="AK-47"
                                      />
                                    </div>

                                    <span className="text-white">
                                      {item.name}
                                    </span>
                                  </div>

                                  <div className="flex items-center justify-between gap-3">
                                    {item.price.discount ? (
                                      <div className="flex items-center justify-center gap-1">
                                        <span className="px-1 text-white bg-green-500 rounded">
                                          {CentsToReais(item.price.value)}
                                        </span>
                                        <span className="text-gray-500 line-through">
                                          {CentsToReais(item.price.oldValue)}
                                        </span>
                                      </div>
                                    ) : (
                                      <span className="text-white">
                                        {CentsToReais(item.price.value)}
                                      </span>
                                    )}

                                    <button
                                      onClick={() =>
                                        handleRemoveThisProduct(item)
                                      }
                                      className="p-1 transition-all bg-gray-800 rounded group hover:bg-red-500"
                                    >
                                      <TrashIcon className="w-5 h-5 text-gray-600 transition-all group-hover:text-white" />
                                    </button>
                                  </div>
                                </motion.div>
                              ))}
                            </>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="flex ml-auto text-lg font-semibold text-white">
                        Total: {CentsToReais(cartTotalPrice)}
                      </div>
                    </div>

                    <button
                      disabled={items.length == 0}
                      className="w-full p-3 text-white transition-all border rounded-lg shadow-xl disabled:cursor-not-allowed disabled:opacity-50 border-sky-500 bg-gradient-to-b from-sky-500 to-sky-700 shadow-sky-500/20"
                    >
                      Finalizar compra
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className="relative invisible h-[100px]"></div>

      <nav className="fixed z-[9999] top-0 left-0 right-0 bg-[#030712]/50 overflow-hidden flex items-center justify-center px-8 backdrop-blur-xl after:absolute after:left-0 after:right-0 after:h-px after:bottom-0 after:bg-[linear-gradient(90deg,rgba(255,255,255,0)0%,rgba(255,255,255,0.2)20%,rgba(255,255,255,0.2)80%,rgba(255,255,255,0)100%)]">
        <div className="flex items-center justify-between w-full px-4 h-[100px]">
          <div className="flex items-center justify-start w-full h-full gap-12 px-4">
            <Image
              src={
                "/logos/123217573_1206099856430854_4895311846399459036_n.jpg"
              }
              width={50}
              height={50}
            />

            <div className="flex items-center justify-center h-full">
              <Link
                className="relative flex items-center justify-center h-full px-8 uppercase after:absolute after:left-0 after:right-0 after:h-px after:bottom-0 after:bg-[linear-gradient(90deg,rgba(14,165,233,0)0%,rgba(14,165,233,0.4)20%,rgba(14,165,233,0.4)80%,rgba(14,165,233,0)100%)] text-primary-500"
                href="#"
              >
                <div className="absolute top-0 left-0 right-0 -bottom-[110%] bg-[radial-gradient(circle,rgba(14,165,233,0.8)0%,rgba(3,7,18,0)45%)] scale-y-[30%] mix-blend-screen blur-lg" />
                Loja
              </Link>

              <Link
                className="flex items-center justify-center h-full px-8 uppercase border-b-2 border-transparent text-white/50"
                href="#"
              >
                Informações
              </Link>

              <Link
                className="flex items-center justify-center h-full px-8 uppercase border-b-2 border-transparent text-white/50"
                href="#"
              >
                Dúvidas
              </Link>

              <Link
                className="flex items-center justify-center h-full px-8 uppercase border-b-2 border-transparent text-white/50"
                href="#"
              >
                Contato
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCart(true)}
              className="flex items-center justify-center"
            >
              <div className="py-px pl-4 pr-3 -mr-1 border rounded-l-full text-white/50 border-white/10">
                {items.length}
              </div>

              <div className="p-3 border rounded-full border-sky-500 bg-[linear-gradient(145deg,rgba(14,165,233,1)0%,rgba(4,113,171,1)100%)] shadow-[0_3px_20px_-3px_rgb(0_0_0_/_0.1),_0_4px_6px_-4px_rgb(0_0_0_/_0.1)] shadow-sky-500/50">
                <ShoppingCartIcon className="w-5 h-5 text-white" />
              </div>
            </button>

            <div className="p-1 border rounded-full aspect-square border-sky-700">
              <div
                style={{
                  backgroundImage:
                    "url(https://i.pinimg.com/originals/38/b6/60/38b66019c8a277684db08af1a1294382.jpg)",
                }}
                className="w-10 h-10 bg-center bg-cover rounded-full"
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export { Navbar };
