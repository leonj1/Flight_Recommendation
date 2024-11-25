"use client";

import { useChat } from "ai/react";

interface FlightObj {
  airline_logo: string;
  price: string | number;
  departure_airport_name: string;
  departure_airport_time: string;
  arrival_airport_name: string;
  arrival_airport_time: string;
}

export default function Home() {
  const { messages, handleSubmit, input, handleInputChange } = useChat({
    api: "/api/chat",
  });

  return (
    <div className="flex flex-col bg-white items-center w-screen min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="mt-12 flex w-full max-w-[300px] flex-col"
      >
        <input
          id="input"
          name="prompt"
          value={input}
          autoComplete="off"
          onChange={handleInputChange}
          placeholder="Ask about flights (e.g., 'Show flights from Paris to London')"
          className="mt-3 min-w-[300px] rounded border px-2 py-1 outline-none focus:border-black text-black"
        />
        <button
          type="submit"
          className="mt-3 max-w-max rounded border px-3 py-1 outline-none text-black hover:bg-black hover:text-white"
        >
          Ask &rarr;
        </button>
        {messages.map((message, i) =>
          message.role === "assistant" ? (
            <div key={`response_${i}`} className="mt-3 pt-3 flex flex-col">
              {JSON.parse(message.content)["flights"]
                ? JSON.parse(message.content).flights.map(
                    (flight: FlightObj, _: number) => (
                      <div
                        key={`flight_${_}_${i}`}
                        className="mt-3 flex flex-col"
                      >
                        <div className="flex flex-row items-center gap-x-3">
                          <img
                            loading="lazy"
                            className="size-10"
                            src={flight.airline_logo}
                            alt="Airline logo"
                          />
                          <span>USD {flight.price}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-3">
                          <span>{flight.departure_airport_name}</span>
                          <span>{flight.departure_airport_time}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-3">
                          <span>{flight.arrival_airport_name}</span>
                          <span>{flight.arrival_airport_time}</span>
                        </div>
                      </div>
                    )
                  )
                : null}
            </div>
          ) : (
            <div
              className="mt-3 border-t text-black pt-3"
              key={message.content + i}
            >
              {message.content}
            </div>
          )
        )}
      </form>
    </div>
  );
}
