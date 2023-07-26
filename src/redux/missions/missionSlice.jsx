import { createSlice, createAsyncThunk, original } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMissions = createAsyncThunk('missions/fetch', async () => {
  const missions = await axios.get('https://api.spacexdata.com/v3/missions');
  const selectData = missions.data.map((item) => ({
    id: item.mission_id,
    mission_name: item.mission_name,
    description: item.description,
    reserved: false,
  }));
  return selectData;
});

const missionsSlice = createSlice({
  name: 'missions',
  initialState: {
    loading: false,
    allMissions: [],
    error: null,
  },
  reducers: {
    joinMission: (state, action) => {
      const newState = original(state.missions).map((mission) => {
        if (mission.missionId !== action.payload) {
          return mission;
        }
        return { ...mission, reserved: true };
      });
      console.log(newState, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.loading = false;
        state.allMissions = action.payload;
      })

      .addCase(fetchMissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { joinMission } = missionsSlice.actions;
export default missionsSlice.reducer;
