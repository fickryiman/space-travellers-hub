import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMissions, joinMission } from '../redux/missions/missionSlice';
import LoadingSpinner from './Loading';
import './Missions.css';

const Missions = () => {
  const dispatch = useDispatch();
  const { missions, isLoading } = useSelector((state) => state.missions);
  const [fetchedMissions, setHasFetchedDataOnce] = useState(false);

  useEffect(() => {
    if (!fetchedMissions) {
      dispatch(fetchMissions());
      setHasFetchedDataOnce((bool) => !bool);
    }
  }, [fetchedMissions, dispatch]);

  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }
  return (
    <div className="missions-div">
      <table>
        <thead>
          <tr>
            <td>Mission</td>
            <td>Description</td>
            <td>Status</td>
            <td> </td>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <tr key={mission.id}>
              <td className="mission-name">{mission.name}</td>
              <td className="mission-description">{mission.description}</td>
              <td className="member-button"><button type="button">NOT A MEMBER</button></td>
              <td className="join-button"><button type="button" id={mission.id} onClick={() => dispatch(joinMission(mission.id))}>JOIN MISSION</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Missions;
