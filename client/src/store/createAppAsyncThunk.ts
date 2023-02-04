import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from ".";

type KnownError = {
    message: string;
}

export const createAppAsyncThunk = createAsyncThunk.withTypes<{ dispatch: AppDispatch, rejectValue: KnownError }>();