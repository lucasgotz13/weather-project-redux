"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { setWeatherAsync, setInput } from "@/state/weather/weatherSlice";
import { Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

export const Counter = () => {
  const input = useSelector((state: RootState) => state.weather.input);
  const data = useSelector((state: RootState) => state.weather.data);
  const dispatch = useDispatch<AppDispatch>();

  //@ts-expect-error using integers gives an error
  if (data?.cod === "404" || data?.cod === "400") return <p>City not found</p>
  return (
    <div className="grid gap-5">
      <div className="relative">
        <Input placeholder="Enter city..." onChange={(e) => dispatch(setInput(e.target.value))} />
        <Search
          size={20}
          className="absolute top-1/2 right-2 transform -translate-y-1/2"
        />
      </div>
      <Button onClick={() => dispatch(setWeatherAsync(input))}>
        Search
      </Button>
      {data && (
        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="text-center">{data.name}</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="mt-5 flex flex-col items-center gap-2">
            <p className="text-3xl"><b>{Math.trunc(data.main.temp - 273)}°C</b></p>
            <div className="flex gap-5">
              <p>Max: <b>{Math.trunc(data.main.temp_max - 273)}°C</b></p>
              <p>Min: <b>{Math.trunc(data.main.temp_min - 273)}°C</b></p>
            </div>
            <p>Sensación térmica: <b>{Math.trunc(data.main.feels_like - 273)}°C</b></p>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <p>Humedad: <b>{data.main.humidity}%</b></p>
            <p>Presión atmosférica: <b>{data.main.pressure} hPa</b></p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
