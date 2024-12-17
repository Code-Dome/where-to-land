"use client";

import React, {useEffect, useRef, useState} from "react";
import {Locations} from "@/constants/locations";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import posthog from 'posthog-js'

export default function Home() {

    posthog.init(process.env.POSTHOG_API_KEY as string,
        {
            api_host: 'https://us.i.posthog.com',
            person_profiles: 'always'
        }
    )

    const [crownWins, setCrownWins] = useState<Record<string, number>>({});
    const [locationToLand, setLocationToLand] = useState<string>("");
    const [locations, setLocations] = useState<string[]>([]);
    const mapImageRef = useRef<HTMLImageElement>(null);

    const randomizeLocation = () => {
        const index = Math.floor(Math.random() * Locations.length);
        const location = Locations[index] as string;

        if (locations.some(item => item == location)) {
            randomizeLocation()
            return
        }

        setLocationToLand(location);

        setLocations((prevState) => {
            if (prevState.length >= 5) {
                // Remove the oldest item (last in the list) and add the new one at the beginning
                return [Locations[index], ...prevState.slice(0, -1)];
            }
            // Add the new item at the beginning
            return [Locations[index], ...prevState];
        });

        setTimeout(() => {
            mapImageRef.current?.focus();
        }, 100); // Allow time for the new map to generate
    };

    const addCrownWins = () => {
        if (!locationToLand) return;

        setCrownWins((prevCrownWins) => ({
            ...prevCrownWins,
            [locationToLand]: (prevCrownWins[locationToLand] ?? 0) + 1,
        }));
    };

    const removeCrownWins = () => {
        if (!locationToLand) return;
        if (!crownWins[locationToLand] || crownWins[locationToLand] === 0) return;

        setCrownWins((prevCrownWins) => ({
            ...prevCrownWins,
            [locationToLand]: (prevCrownWins[locationToLand] ?? 0) - 1,
        }));
    };

    useEffect(() => {
        const crownWinsStorageItem = localStorage.getItem("crownWins")

        if (crownWinsStorageItem)
        {
            setCrownWins(JSON.parse(crownWinsStorageItem))
        }

    }, []);

    useEffect(() => {
        localStorage.setItem("crownWins", JSON.stringify(crownWins));
    }, [crownWins])

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="text-center w-[100%] flex justify-center">
                <Image src={"/logo.png"} alt={"Where_to_land_logo"} height={250} width={250}/>
            </header>


            <main className="flex-grow flex flex-col items-center gap-8 px-8 sm:px-20 main-content">

                <div className="locations-container">
                    <h1 className="pb-2 text-center">Last Locations:</h1>
                    <ul className="locations-list">
                        <AnimatePresence>
                            {locations.map((location, index) => {
                                const opacity = 1 - index * 0.15;

                                const pastelColors = [
                                    `rgba(173, 216, 230, ${opacity})`,
                                    `rgba(186, 255, 201, ${opacity})`,
                                    `rgba(255, 253, 150, ${opacity})`,
                                    `rgba(255, 223, 186, ${opacity})`,
                                    `rgba(255, 182, 193, ${opacity})`,
                                ];

                                const color =
                                    index >= 0 && index <= 4
                                        ? pastelColors[index % pastelColors.length]
                                        : `rgba(253, 253, 150, ${opacity})`; // Default for indices > 4

                                return (
                                    <motion.li
                                        key={index} // Ensure each location has a unique key
                                        initial={{opacity: 0, y: -20}}
                                        animate={{opacity: 1, y: 0}}
                                        exit={{opacity: 0, y: 20}}
                                        transition={{duration: 0.3}}
                                        whileHover={{background: color, color: "rgba(0,0,0,1)"}}
                                        className="locations-item"
                                        style={{
                                            color
                                        }}
                                    >
                                        <span className={"flex flex-row justify-between"}>
                                        {location}
                                              <span className={"flex flex-row justify-between"}>
                                                  <Image src={"/crown.webp"} alt={"vic_crown"} width={25} height={25} />
                                                  &nbsp;&nbsp;<p className={"text-white"}>{crownWins[location] ?? 0}</p>
                                              </span>
                                        </span>

                                    </motion.li>
                                );
                            })}
                        </AnimatePresence>
                    </ul>
                </div>

                <ul className="text-center text-sm sm:text-base font-mono">
                    <li className="mb-4">
                        Don&#39;t know where to land? Use our location generator to decide for YOU!
                    </li>
                </ul>

                <div className="flex gap-4 items-center flex-col sm:flex-row w-[100%] justify-center">
                    <button
                        onClick={randomizeLocation}
                        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-black gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                        RANDOMIZE
                    </button>

                </div>

                <div className="mt-10 flex flex-col items-center sm:flex-row gap-4">
                    <h2 className="text-lg sm:text-xl font-semibold">Where To Land:</h2>
                    <code
                        className="text-amber-400 text-center sm:text-left px-4 py-2 border border-gray-300 rounded w-[300px] flex items-center justify-center"
                    >
                        {locationToLand || "Press RANDOMIZE to find out!"}
                    </code>
                    {locationToLand && (
                        <div className={"flex flex-row justify-between "}>
                            <button onClick={addCrownWins}
                                    className={"mr-2 rounded bg-green-500 w-[75] p-2 flex justify-center hover:bg-green-300 hover:text-black"}>
                                <Image src={"/crown.webp"} alt={"vic_crown"} width={30} height={30}/> &nbsp; <span
                                className={"text-2xl"}>+</span>
                            </button>
                            <button onClick={removeCrownWins}
                                    className={"ml-2 rounded bg-red-500 w-[75] p-2 flex justify-center hover:bg-red-300 hover:text-black"}>
                                <Image src={"/crown.webp"} alt={"vic_crown"} width={30} height={30}/> &nbsp; <span
                                className={"text-2xl"}>-</span>
                            </button>
                        </div>
                    )}
                </div>
                <div className=" bg-gray-300 rounded p-1 mb-5">
                    <Image src={"./fortnite_map.png"} alt={"fortnite_map"} width={1024} height={576} ref={mapImageRef} tabIndex={-1}/>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-4">
                <div className="text-center">
                    <small>
                        Copyright &copy; 2024 WhereToLand.com | All Rights Reserved.
                    </small>
                </div>
            </footer>
        </div>
    );
}
