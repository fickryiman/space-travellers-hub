import { createSlice, createAsyncThunk, original } from '@reduxjs/toolkit';
import axios from 'axios';
import './missionSlice.css';

const url = 'https://api.spacexdata.com/v3/missions';

export const fetchMissions = createAsyncThunk('missions/fetch', async () => {
  const response = await axios.get(url);
  return response.data;
});

const missionsSlice = createSlice({
  name: 'missions',
  initialState: {
    isLoading: false,
    missions: [],
    error: null,
  },
  reducers: {
    joinMission: (state, action) => {
      const btn = document.getElementById(action.payload);

      if (btn.classList.contains('border-red')) {
        btn.classList.remove('border-red');
        btn.innerText = 'Join Mission';

        const newState = original(state.missions).map((mission) => {
          if (mission.id !== action.payload) {
            return mission;
          }
          return { ...mission, reserved: false };
        });
        state.newState = newState;
      } else {
        btn.classList.add('border-red');
        btn.innerText = 'Leave Mission';

        let newState;

        if (state.newState) {
          newState = state.newState.map((mission) => {
            if (mission.id !== action.payload) {
              return mission;
            }
            return { ...mission, reserved: true };
          });
          state.newState = newState;
        } else {
          newState = state.missions.map((mission) => {
            if (mission.id !== action.payload) {
              return mission;
            }
            return { ...mission, reserved: true };
          });
          state.newState = newState;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.isLoading = false;
        const missionsArr = action.payload.map((item) => {
          const { mission_id: id, mission_name: name, description } = item;
          return {
            id,
            name,
            description,
          };
        });
        state.missions = missionsArr;
      })

      .addCase(fetchMissions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { joinMission } = missionsSlice.actions;
export default missionsSlice.reducer;
