import { useState, useEffect, useContext } from "react";
import { signOut, getSession } from "next-auth/react";

import { cartContext } from "@/services/cart.service";
import { CentsToReais } from "@/helpers/format/moneyFormat";

import Link from "next/link";
import Image from "next/image";

import { CustomSwitch as Switch } from "@/modules/components/Switch";
import { rarityColors } from "@/helpers/colors";
import { AnimatePresence, motion } from "framer-motion";

import _ from "lodash";

import moment from "moment";
import "moment/locale/pt-br"; // without this line it didn't work
moment.locale("pt-br");

import {
  MagnifyingGlassIcon,
  ArrowUpIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const { items, setItems } = useContext(cartContext);

  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [orderList, setOrderList] = useState([
    {
      name: "Nome",
      active: true,
      direction: "asc",
    },
    {
      name: "Preço",
      active: false,
      direction: "asc",
    },
    {
      name: "Desconto",
      active: false,
      direction: "asc",
    },
    {
      name: "Raridade",
      active: false,
      direction: "asc",
    },
    {
      name: "Desgaste",
      active: false,
      direction: "asc",
    },
    {
      name: "Entrega",
      active: false,
      direction: "asc",
    },
  ]);

  const handleSetOrder = (key) => {
    const updatedOrder = [...orderList];

    for (let index = 0; index < updatedOrder.length; index++) {
      if (key !== index) updatedOrder[index]["active"] = false;
    }

    if (updatedOrder[key].active) {
      if (updatedOrder[key].direction == "asc") {
        updatedOrder[key].direction = "desc";
      } else {
        updatedOrder[key].direction = "asc";
      }
    } else {
      updatedOrder[key].active = true;
      updatedOrder[key].direction = "asc";
    }

    setOrderList(updatedOrder);
  };

  const handleAddToCart = (product) => {
    setItems([...items, product]);
  };

  const getWearName = (wear) => {
    let wearName = "Sem informações";

    if (wear >= 0 && wear <= 0.07) {
      wearName = "Nova de Fábrica";
    } else if (wear > 0.07 && wear <= 0.15) {
      wearName = "Pouco Usada";
    } else if (wear > 0.15 && wear <= 0.38) {
      wearName = "Testada em Campo";
    } else if (wear > 0.38 && wear <= 0.45) {
      wearName = "Bem desgastada";
    } else if (wear > 0.45 && wear <= 1) {
      wearName = "Veterana de Guerra";
    }

    return wearName;
  };

  const products = [
    {
      id: 1,
      img: "https://cs2.steamanalyst.com/images/csgo/115720698.png",
      name: "AK-47 | Aquamarine Revenge",
      price: {
        discount: true,
        oldValue: 14790,
        value: 12790,
        steam: 99999,
      },
      rarity: 4,
      type: "Rifle",
      wear: 0.07,
      badges: {
        stattrack: true,
        available: true,
      },
    },
    {
      id: 2,
      img: "https://cs2.steamanalyst.com/images/csgo/115720698.png",
      name: "AK-47 | Aquamarine Revenge",
      price: {
        discount: false,
        oldValue: 14790,
        value: 12790,
        steam: 99999,
      },
      rarity: 4,
      type: "Rifle",
      wear: 0.07,
      badges: {
        stattrack: true,
        available: true,
      },
    },
    {
      id: 3,
      img: "https://cs2.steamanalyst.com/images/csgo/115720698.png",
      name: "AK-47 | Aquamarine Revenge",
      price: {
        discount: true,
        oldValue: 14790,
        value: 12790,
        steam: 99999,
      },
      rarity: 4,
      type: "Rifle",
      wear: 0.07,
      badges: {
        stattrack: true,
        available: true,
      },
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-12 px-16">
        <div className="relative py-6 overflow-visible">
          <div className="relative overflow-hidden rounded-xl z-1">
            <img
              src="https://flashstoreskins.com/img/gif.gif"
              alt="Banner principal"
            />
          </div>
        </div>

        <div className="flex items-start justify-center w-full gap-12">
          <div className="flex flex-col items-start justify-start gap-8 filters  p-6 text-left transition-all transform z-[2] bg-gradient-to-b from-white/5 to-white/0 rounded-xl backdrop-blur-xl backdrop-saturate-150 border-white/5 border-2">
            <div className="flex flex-col items-start justify-start w-full gap-3">
              <div className="flex items-center justify-start gap-2">
                <FunnelIcon className="w-5 h-5 text-gray-300" />

                <h1 className="pl-1 text-2xl text-white sec-font">Filtros</h1>
              </div>

              <div className="flex flex-col w-full gap-3">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="w-full py-3 pl-10 pr-3 text-white transition-all bg-transparent border border-gray-800 rounded-lg active:outline-none focus:outline-none focus-within:outline-none active:border-sky-500 focus:border-sky-500 focus-within:border-sky-500 placeholder:text-sm placeholder:text-gray-500"
                    placeholder="Procurar skins..."
                  />

                  <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-300 -translate-y-1/2 left-3 top-1/2" />
                </div>

                <div class="flex items-center">
                  <Switch
                    state={[showOnlyAvailable, setShowOnlyAvailable]}
                    label={"Mostrar apenas skins disponíveis"}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start justify-start w-full gap-3">
              <div className="flex items-center justify-start gap-2">
                <ArrowsUpDownIcon className="w-5 h-5 text-gray-300" />

                <h1 className="pl-1 text-white sec-font">Ordernar por</h1>
              </div>

              <div className="flex flex-col items-start justify-start w-full gap-1 text-white">
                {orderList.map((item, index) => (
                  <button
                    onClick={() => handleSetOrder(index)}
                    key={`order__${item.name}`}
                    className={`flex items-center justify-start w-full gap-2 px-2 transition-all ${
                      item.active ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    {item.name}

                    {item.active && (
                      <>
                        <ArrowUpIcon
                          className={`w-3 h-3 text-gray-300 transition-all stroke-2 ${
                            item.direction == "asc" ? "rotate-0" : "rotate-180"
                          }`}
                        />
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap flex-1 w-full gap-5">
            <AnimatePresence mode="popLayout">
              {products.map((product, index) => {
                const alreadyOnCart =
                  _.findIndex(items, (o) => {
                    return _.isMatch(o, product);
                  }) > -1;

                return (
                  <motion.button
                    initial={{ opacity: 0, y: "50%" }}
                    animate={{ opacity: 1, y: "0%" }}
                    exit={{ opacity: 0, y: "50%" }}
                    key={`product__${product.id}`}
                    onClick={() => handleAddToCart(product)}
                    className={`relative card--skin--anim ${
                      alreadyOnCart ? "saturate-50 pointer-events-none" : ""
                    }`}
                    disabled={alreadyOnCart}
                  >
                    <AnimatePresence mode="popLayout">
                      {alreadyOnCart && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-[2] flex items-center bg-[#030712]/70 flex-col justify-center text-gray-300 text-sm gap-2"
                        >
                          <ShoppingCartIcon className="w-12 h-12 text-gray-300" />
                          Já adicionado no carrinho
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div
                      className={`flex flex-col gap-4 p-4 text-left transition-all card--skin--anim--wrapper z-[2] bg-gradient-to-b from-white/5 to-white/0 rounded-xl backdrop-blur-xl backdrop-saturate-150 border-white/5 border-2 duration-300`}
                    >
                      <div
                        className={`relative flex items-center justify-center p-5 overflow-hidden rounded-xl bg-gradient-radial from-gray-800 to-gray-900 aspect-square after:absolute after:left-0 after:right-0 after:h-px after:bottom-0  before:absolute before:left-0 before:right-0 before:h-px before:top-0  transition-all duration-300 card--skin rarity-${product.rarity}`}
                      >
                        <div className="absolute top-0 left-0 right-0 -bottom-[100%] scale-y-[30%] mix-blend-screen blur-2xl z-[2] card--skin--flare" />

                        <img
                          className="w-48 h-48 transition-all duration-300 z-1 card--skin--anim--wrapper--img"
                          src={`${product.img}`}
                          alt="AK-47"
                        />
                      </div>

                      <div className="flex flex-col gap-px leading-none">
                        <h1 className="text-lg text-white">{product.name}</h1>

                        <span className="text-gray-500">
                          {product.type} • {getWearName(product.wear)}
                        </span>
                      </div>

                      <div className="flex flex-col gap-px leading-none">
                        <span className="text-gray-500">
                          Preço na Steam: {CentsToReais(product.price.steam)}
                        </span>

                        {product.price.discount ? (
                          <div className="flex items-center gap-2">
                            <h2 className="text-lg text-green-500">
                              R$ 500,00
                            </h2>
                            <span className="text-sm text-gray-500 line-through">
                              R$ 600,00
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <h2 className="text-lg text-white">R$ 500,00</h2>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center justify-start gap-2 leading-[0]">
                        {product.badges.stattrack && (
                          <div className="px-2 py-1 text-xs text-white bg-orange-600 rounded-full">
                            StatTrak
                          </div>
                        )}

                        {product.badges.available && (
                          <div className="px-2 py-1 text-xs text-white bg-green-600 rounded-full">
                            Pronta entrega
                          </div>
                        )}
                      </div>
                    </div>

                    <img
                      className="absolute top-0 left-0 right-0 w-64 h-64 mx-auto transition-all duration-300 z-1 card--skin--anim--img"
                      src={`${product.img}`}
                      alt="AK-47"
                    />
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { req } = context;
//   const session = await getSession({ req });

//   if (!session)
//     return {
//       redirect: { destination: "/auth/signin" },
//     };

//   return {
//     props: {
//       session: session,
//     },
//   };
// }
