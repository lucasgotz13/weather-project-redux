import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Root } from "@/lib/types";

interface WeatherState {
    data: Root | null
    input: string
} 

const initialState: WeatherState = {
    data: null,
    input: ""
}

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setInput: (state, action: PayloadAction<string>) => {
            state.input = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setWeatherAsync.pending, (state) => {
            console.log("pending")
            state.data = null;
        }).addCase(setWeatherAsync.fulfilled, (state, action: PayloadAction<Root>) => {
            console.log(action.payload)
            state.data = action.payload;
        });
    },
})

export const setWeatherAsync = createAsyncThunk("weather/fetchWeather", async (city: string) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}`)
    return response.json()
})

export const { setInput } = weatherSlice.actions

export default weatherSlice.reducer