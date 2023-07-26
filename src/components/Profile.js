import { useSelector } from 'react-redux/es/hooks/useSelector';
import css from './Profile.module.css';

const Missions = () => {
  const rockets = useSelector((state) => state.rockets.allRockets);
  const reserved = rockets.filter((rocket) => rocket.reserved === true);
  return (
    <>
      <div className={css.container}>
        <div className={css.missions}>
          <p className={css.heading}>My Missions</p>
          <p className={css.elem}>Mission 1</p>
          <p className={css.elem}>Mission 1</p>
        </div>
        <div className={css.rocketsCont}>
          <p className={css.heading}>My Rockets</p>
          { reserved ? reserved.map((rocket) => (<p key={rocket.id} className={css.elem}>{rocket.rocket_name}</p>)) : ''}
        </div>
      </div>
    </>
  );
};

export default Missions;
