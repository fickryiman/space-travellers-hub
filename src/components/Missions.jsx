import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './Missions.module.css';
import { fetchMissions, joinMission } from '../redux/missions/missionSlice';
import LoadingSpinner from './Loading';

const Missions = () => {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions.allMissions);
  const { loading } = useSelector((state) => state.missions);
  const [fetchedMissions, setHasFetchedDataOnce] = useState(false);

  useEffect(() => {
    if (!fetchedMissions) {
      dispatch(fetchMissions());
      setHasFetchedDataOnce((bool) => !bool);
    }
  }, [fetchedMissions, dispatch]);

  if (loading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }
  return (
    <div className={css.missionsDiv}>
      <table>
        <thead className={css.tableHead}>
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
              <td className={css.missionName}>{mission.mission_name}</td>
              <td className={css.missionDescription}>{mission.description}</td>
              <td className={css.memberButton}><button type="button">NOT A MEMBER</button></td>
              <td className={css.joinButton}><button type="button" onClick={() => dispatch(joinMission(mission.id))}>JOIN MISSION</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Missions;
